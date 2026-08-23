// HUB CORE — the nudges. Two things a gym cannot afford to only see on a
// dashboard nobody opens: a coaching certificate about to lapse, and a
// waitlist family sitting unanswered while a seat is free.
//
// Deploys DORMANT on purpose. With no mail key set it still computes the
// digest and returns it as JSON, so the hub can show exactly what WOULD be
// sent. The day a key is added it starts sending, and nothing else changes.
// Accelerated Experiences, LLC.

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const NS = (process.env.HUB_NS || "momentum") + ":";
const RESEND = process.env.RESEND_API_KEY || "";
const MAIL_TO = process.env.NOTIFY_TO || "";
const MAIL_FROM = process.env.NOTIFY_FROM || "";
const configured = !!(KV_URL && KV_TOK);
const canSend = !!(RESEND && MAIL_TO && MAIL_FROM);

async function kvGet(k) {
  const r = await fetch(`${KV_URL}/get/${encodeURIComponent(k)}`, { headers: { Authorization: `Bearer ${KV_TOK}` } });
  return (await r.json()).result;
}
async function col(name) {
  let a = null;
  try { const raw = await kvGet(NS + "col:" + name); if (raw) a = JSON.parse(raw); } catch (_) {}
  return Array.isArray(a) ? a : [];
}
async function roleOf(t) {
  if (!t || !configured) return "guest";
  let raw = null; try { raw = await kvGet(NS + "sess:" + t); } catch (_) {}
  if (!raw) return "guest";
  const s = String(raw), i = s.indexOf("|");
  return i >= 0 ? s.slice(0, i) : "guest";
}

const days = (iso) => {
  const d = Date.parse(iso);
  if (!d) return null;
  return Math.round((d - Date.now()) / 86400000);
};
const esc = (s) => String(s == null ? "" : s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

// A certificate is worth an email at 60, 30 and 7 days out, and every day once
// it has actually lapsed. Anything further away is noise.
function certWindow(n) {
  if (n == null) return null;
  if (n < 0) return "EXPIRED";
  if (n <= 7) return "7 days";
  if (n <= 30) return "30 days";
  if (n <= 60) return "60 days";
  return null;
}

async function buildDigest() {
  const [hr, wait, cls] = await Promise.all([col("hrrecords"), col("waitlist"), col("classes")]);

  const certs = [];
  hr.forEach((p) => {
    (p.certs || []).forEach((c) => {
      const n = days(c.expires);
      const w = certWindow(n);
      if (w) certs.push({ person: p.name || p.staff || "—", cert: c.name || c.type || "Certificate", expires: c.expires, inDays: n, window: w });
    });
  });
  certs.sort((a, b) => (a.inDays ?? 9e9) - (b.inDays ?? 9e9));

  // A family on a waitlist for a class that now has room is money sitting still.
  const byId = {};
  cls.forEach((c) => { byId[c.id] = c; });
  const ready = wait.filter((w) => {
    if (String(w.status || "").toLowerCase() !== "waiting") return false;
    const c = byId[w.classId];
    return c && (+c.enrolled || 0) < (+c.cap || 0);
  }).map((w) => ({ child: w.child, className: w.className, contact: w.contact, added: w.added,
                   open: (+((byId[w.classId] || {}).cap) || 0) - (+((byId[w.classId] || {}).enrolled) || 0) }));

  const stale = wait.filter((w) => String(w.status || "").toLowerCase() === "waiting" && days(w.added) != null && days(w.added) < -14).length;
  return { certs, ready, stale, generated: new Date().toISOString() };
}

function digestHtml(d, brand) {
  const row = (a, b, c) => `<tr><td style="padding:7px 10px;border-bottom:1px solid #e6ecec">${a}</td>
    <td style="padding:7px 10px;border-bottom:1px solid #e6ecec">${b}</td>
    <td style="padding:7px 10px;border-bottom:1px solid #e6ecec;color:#6b7780">${c}</td></tr>`;
  let h = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto;color:#0f1417">
    <h2 style="font-family:Georgia,serif">${esc(brand)} — what needs a look</h2>`;
  if (d.certs.length) {
    h += `<h3 style="font-family:Georgia,serif;font-size:16px;margin:20px 0 6px">Certifications</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">` +
      d.certs.map((c) => row(esc(c.person), esc(c.cert),
        c.window === "EXPIRED" ? `<b style="color:#a3261f">expired ${Math.abs(c.inDays)}d ago</b>` : `${c.inDays} days`)).join("") +
      `</table>`;
  }
  if (d.ready.length) {
    h += `<h3 style="font-family:Georgia,serif;font-size:16px;margin:20px 0 6px">Waitlist families who could be called today</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">` +
      d.ready.map((w) => row(esc(w.child), esc(w.className), `${w.open} seat${w.open === 1 ? "" : "s"} open · ${esc(w.contact || "")}`)).join("") +
      `</table>`;
  }
  if (!d.certs.length && !d.ready.length) h += `<p style="color:#3b4448">Nothing needs attention today. Everything current, no waitlist family waiting on an open seat.</p>`;
  h += `<p style="color:#6b7780;font-size:12px;margin-top:24px">Momentum OS · powered by Accelerated Experiences, LLC</p></div>`;
  return h;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (!configured) { res.status(200).json({ ok: false, error: "NOKV", message: "Add KV_REST_API_URL + KV_REST_API_TOKEN." }); return; }

  const q = req.query || {};
  let body = {};
  if (req.method === "POST") { body = req.body; if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = {}; } } body = body || {}; }
  const doo = body.action || q.do || "preview";
  const token = body.sess || q.sess || "";
  const role = await roleOf(token);
  const owner = role === "manager" || role === "admin";
  const cronKey = (req.headers["x-cron-key"] || q.key || "");
  const viaCron = !!(process.env.CRON_KEY && cronKey === process.env.CRON_KEY);

  if (!owner && !viaCron) { res.status(401).json({ ok: false, error: "AUTH", message: "Owner seat required." }); return; }

  const d = await buildDigest();

  if (doo === "preview") {
    res.status(200).json({ ok: true, ready: canSend, digest: d, html: digestHtml(d, body.brand || q.brand || "Momentum Sports and Play") });
    return;
  }

  if (doo === "send") {
    if (!canSend) {
      // Dormant, and honest about it -- the digest is real, only delivery is off.
      res.status(200).json({ ok: false, error: "NO_MAIL", dormant: true, digest: d,
        message: "Set RESEND_API_KEY, NOTIFY_FROM and NOTIFY_TO in Vercel and this starts sending. Nothing else changes." });
      return;
    }
    const html = digestHtml(d, body.brand || "Momentum Sports and Play");
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: MAIL_FROM, to: MAIL_TO.split(",").map((x) => x.trim()),
        subject: `Momentum — ${d.certs.length} cert${d.certs.length === 1 ? "" : "s"} and ${d.ready.length} waitlist famil${d.ready.length === 1 ? "y" : "ies"} to look at`,
        html }),
    });
    const j = await r.json().catch(() => ({}));
    res.status(200).json({ ok: r.ok, sent: j, digest: d });
    return;
  }

  res.status(400).json({ ok: false, error: "UNKNOWN_ACTION" });
}
