// HUB CORE — the token exchange behind client uploads for the Hall of Records.
// The file goes straight from the browser to Blob storage and never passes through
// this function, so nothing is bound by the ~4.5MB function body limit. What this
// route does is decide WHETHER to hand out a short-lived upload token, and for what
// exact path. Accelerated Experiences, LLC.
import { handleUpload } from "@vercel/blob/client";

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const NS = (process.env.HUB_NS || "momentum") + ":";
const ROOT = (process.env.HUB_NS || "momentum") + "/records/";
const kvReady = !!(KV_URL && KV_TOK);

const CATEGORIES = ["Flyers", "Printouts", "Forms", "Schedules", "Photos", "Other"];
const MAX_BYTES = 1024 * 1024 * 1024; // 1 GB — a guard against a runaway upload, not a real limit for a gym

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

export default async function handler(req, res) {
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = {}; } }

    const out = await handleUpload({
      body: body || {},
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // 1. WHO. No seat, no token. This is the only thing standing between the
        //    store and the open internet, so it runs before anything else.
        let sess = "";
        try { sess = (JSON.parse(clientPayload || "{}") || {}).sess || ""; } catch (_) {}
        const role = await roleOf(sess);
        if (role === "guest") throw new Error("Sign in to add a file.");

        // 2. WHERE. The browser proposes the path, so the server must not trust it.
        //    Everything is pinned under this hub's own folder and a known shelf.
        if (typeof pathname !== "string" || !pathname.startsWith(ROOT) || pathname.includes("..")) {
          throw new Error("That is not a place this hub can write to.");
        }
        const rest = pathname.slice(ROOT.length);
        const cut = rest.indexOf("/");
        const category = cut > 0 ? rest.slice(0, cut) : "";
        const name = cut > 0 ? rest.slice(cut + 1) : "";
        if (CATEGORIES.indexOf(category) < 0) throw new Error("Unknown shelf.");
        if (!name || name.indexOf("/") >= 0) throw new Error("Bad file name.");

        return {
          addRandomSuffix: true,        // two "Fall Schedule.pdf" must not overwrite each other
          maximumSizeInBytes: MAX_BYTES,
          tokenPayload: JSON.stringify({ role })
        };
      },
      // Vercel calls this server-to-server once the browser finishes. The room reads
      // its state from the store itself, so there is nothing to write down here —
      // and this must not throw, or Vercel retries it five times.
      onUploadCompleted: async () => {}
    });

    res.status(200).json(out);
  } catch (e) {
    res.status(400).json({ error: String((e && e.message) || e) });
  }
}
