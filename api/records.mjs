// HUB CORE — the Hall of Records. Files (flyers, printouts, forms) in Vercel Blob,
// on a PRIVATE store of this hub's own. Nothing here is world-readable: every byte
// is served back through this function, and only to a signed-in seat.
// Accelerated Experiences, LLC.
import { put, list, del, get } from "@vercel/blob";
import { Readable } from "node:stream";

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const NS = (process.env.HUB_NS || "momentum") + ":";
const ROOT = (process.env.HUB_NS || "momentum") + "/records/";
const kvReady = !!(KV_URL && KV_TOK);
const blobReady = !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

// Everything this hub can ever touch lives under ROOT. Nothing else is reachable
// from here even if a pathname arrives from outside.
const inRoot = (p) => typeof p === "string" && p.startsWith(ROOT) && !p.includes("..");

async function kvGet(k) {
  const r = await fetch(`${KV_URL}/get/${encodeURIComponent(k)}`, { headers: { Authorization: `Bearer ${KV_TOK}` } });
  return (await r.json()).result;
}
async function roleOf(t) {
  if (!t || !kvReady) return "guest";
  let raw = null; try { raw = await kvGet(NS + "sess:" + t); } catch (_) {}
  if (!raw) return "guest";
  const s = String(raw), i = s.indexOf("|");
  return i >= 0 ? s.slice(0, i) : "guest";
}

const CATEGORIES = ["Flyers", "Printouts", "Forms", "Schedules", "Photos", "Other"];
// Keep a filename recognisable but harmless: no slashes, no leading dots, capped.
const safeName = (s) => String(s || "file")
  .replace(/[\\/]/g, "-").replace(/[^\w.\- ()&]/g, "").replace(/^\.+/, "").trim().slice(0, 90) || "file";

const MAX_BYTES = 3 * 1024 * 1024; // Vercel caps a function request body at ~4.5MB and base64 adds a third

export default async function handler(req, res) {
  const q = req.query || {};
  const isGet = req.method === "GET";
  let body = {};
  if (req.method === "POST") {
    body = req.body; if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = {}; } }
    body = body || {};
  }
  const doo = body.action || q.do || (isGet ? "list" : "");
  const role = await roleOf(body.sess || q.sess || "");

  if (!blobReady) { res.status(200).json({ ok: false, error: "NOBLOB", message: "Connect a Blob store to this project." }); return; }
  if (role === "guest") {
    if (doo === "download") { res.status(401).send("Sign in to open this file."); return; }
    res.status(401).json({ ok: false, error: "AUTH", message: "Sign in to use the Hall of Records." }); return;
  }

  try {
    // ---- DOWNLOAD ------------------------------------------------------
    // The whole reason the store is private: the bytes never leave through a
    // public URL, only through here, and only after the seat is checked above.
    if (doo === "download") {
      const pathname = String(q.pathname || body.pathname || "");
      if (!inRoot(pathname)) { res.status(400).send("Bad path"); return; }
      const r = await get(pathname, { access: "private" });
      if (!r || r.statusCode !== 200) { res.status(404).send("Not found"); return; }
      const nm = pathname.slice(pathname.lastIndexOf("/") + 1);
      res.setHeader("Content-Type", (r.blob && r.blob.contentType) || "application/octet-stream");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cache-Control", "private, no-cache");
      if (q.dl) res.setHeader("Content-Disposition", 'attachment; filename="' + nm.replace(/"/g, "") + '"');
      Readable.fromWeb(r.stream).pipe(res);
      return;
    }

    // ---- LIST ----------------------------------------------------------
    if (doo === "list") {
      const { blobs } = await list({ prefix: ROOT, limit: 1000 });
      const files = blobs.map((b) => {
        const rest = b.pathname.slice(ROOT.length);
        const cut = rest.indexOf("/");
        return {
          pathname: b.pathname,
          category: cut > 0 ? rest.slice(0, cut) : "Other",
          name: cut > 0 ? rest.slice(cut + 1) : rest,
          size: b.size,
          uploadedAt: b.uploadedAt
        };
      }).sort((a, b) => String(b.uploadedAt).localeCompare(String(a.uploadedAt)));
      res.status(200).json({ ok: true, files, count: files.length, categories: CATEGORIES });
      return;
    }

    // ---- UPLOAD --------------------------------------------------------
    if (doo === "upload") {
      const name = safeName(body.name);
      const category = CATEGORIES.indexOf(body.category) >= 0 ? body.category : "Other";
      const b64 = String(body.dataB64 || "");
      if (!b64) { res.status(400).json({ ok: false, error: "NO_FILE" }); return; }
      const buf = Buffer.from(b64, "base64");
      if (!buf.length) { res.status(400).json({ ok: false, error: "EMPTY" }); return; }
      if (buf.length > MAX_BYTES) {
        res.status(413).json({ ok: false, error: "TOO_BIG",
          message: "That file is " + (buf.length / 1048576).toFixed(1) + " MB. The limit here is 3 MB." });
        return;
      }
      const out = await put(ROOT + category + "/" + name, buf, {
        access: "private",
        addRandomSuffix: true,      // two flyers called "Fall Schedule.pdf" must not overwrite each other
        contentType: String(body.contentType || "application/octet-stream").slice(0, 120)
      });
      res.status(200).json({ ok: true, pathname: out.pathname, size: buf.length });
      return;
    }

    // ---- DELETE --------------------------------------------------------
    // Deleting is a fence: owner and admin only, never a coach or the front desk.
    if (doo === "delete") {
      if (role !== "manager" && role !== "admin") {
        res.status(403).json({ ok: false, error: "FORBIDDEN", message: "Only an owner can remove a file." }); return;
      }
      const pathname = String(body.pathname || "");
      if (!inRoot(pathname)) { res.status(400).json({ ok: false, error: "BAD_PATH" }); return; }
      await del(pathname);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(400).json({ ok: false, error: "UNKNOWN_ACTION" });
  } catch (e) {
    res.status(500).json({ ok: false, error: "SERVER", message: String((e && e.message) || e) });
  }
}
