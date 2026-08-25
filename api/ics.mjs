// HUB CORE — the subscribe feed. Google Calendar and Apple Calendar fetch this
// server-to-server with no session and no cookie, so it cannot be behind the
// hub's sign-in. It is protected by an unguessable key instead: the owner mints
// one from the Calendar room, and can roll it if a link ever gets shared too far.
// Accelerated Experiences, LLC.

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const NS = (process.env.HUB_NS || "momentum") + ":";
const configured = !!(KV_URL && KV_TOK);
const TZ = "America/Los_Angeles";           // Coeur d'Alene is Pacific, not Mountain

async function kvGet(k) { const r = await fetch(`${KV_URL}/get/${encodeURIComponent(k)}`, { headers: { Authorization: `Bearer ${KV_TOK}` } }); return (await r.json()).result; }
async function kvSet(k, v) { await fetch(`${KV_URL}/set/${encodeURIComponent(k)}`, { method: "POST", headers: { Authorization: `Bearer ${KV_TOK}`, "Content-Type": "text/plain" }, body: v }); }
async function roleOf(t) {
  if (!t || !configured) return "guest";
  let raw = null; try { raw = await kvGet(NS + "sess:" + t); } catch (_) {}
  if (!raw) return "guest";
  const s = String(raw), i = s.indexOf("|"); return i >= 0 ? s.slice(0, i) : "guest";
}
async function loadCol(name) {
  let a = null; try { const raw = await kvGet(NS + "col:" + name); if (raw) a = JSON.parse(raw); } catch (_) {}
  return Array.isArray(a) ? a : [];
}
const newKey = () => (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Date.now().toString(36)).replace(/[^a-z0-9]/g, "").slice(0, 32);

// ---- iCalendar plumbing ---------------------------------------------------
// Long lines MUST be folded at 75 octets or Apple silently drops the event.
function fold(line) {
  const out = []; let s = line;
  while (s.length > 73) { out.push(s.slice(0, 73)); s = " " + s.slice(73); }
  out.push(s); return out.join("\r\n");
}
const esc = (s) => String(s == null ? "" : s)
  .replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const localDT = (ymd, hh, mm) => ymd.replace(/-/g, "") + "T" + String(hh).padStart(2, "0") + String(mm).padStart(2, "0") + "00";

function parseTime(t) {                       // "4:30 PM" -> {h,m}; null when they publish none
  const m = String(t || "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return null;
  let h = +m[1] % 12; const ap = (m[3] || "").toUpperCase();
  if (ap === "PM") h += 12;
  if (!ap && +m[1] < 8) h = +m[1] + 12;       // an unmarked evening class
  return { h, m: +m[2] };
}
const minsOf = (s) => { const m = String(s || "").match(/(\d{2,3})\s*min/i); return m ? +m[1] : 45; };
const addMins = (t, n) => { const tot = t.h * 60 + t.m + n; return { h: Math.floor(tot / 60) % 24, m: tot % 60 }; };
const BYDAY = { Sun: "SU", Mon: "MO", Tue: "TU", Wed: "WE", Thu: "TH", Fri: "FR", Sat: "SA" };
const DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function nextDow(dow) {                        // the next date on that weekday, from today
  const d = new Date(); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + ((dow - d.getDay() + 7) % 7));
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function vevent({ uid, start, end, allDay, summary, desc, loc, cat, rrule }) {
  const L = ["BEGIN:VEVENT", "UID:" + uid + "@momentum-hub", "DTSTAMP:" + stamp(new Date())];
  if (allDay) {
    L.push("DTSTART;VALUE=DATE:" + start.replace(/-/g, ""));
    L.push("DTEND;VALUE=DATE:" + end.replace(/-/g, ""));
  } else {
    L.push("DTSTART;TZID=" + TZ + ":" + start);
    L.push("DTEND;TZID=" + TZ + ":" + end);
  }
  if (rrule) L.push("RRULE:" + rrule);
  L.push("SUMMARY:" + esc(summary));
  if (desc) L.push("DESCRIPTION:" + esc(desc));
  if (loc) L.push("LOCATION:" + esc(loc));
  if (cat) L.push("CATEGORIES:" + esc(cat));
  L.push("END:VEVENT");
  return L.map(fold).join("\r\n");
}

export default async function handler(req, res) {
  if (!configured) { res.status(200).setHeader("content-type", "text/plain"); res.end("Calendar storage is not connected yet."); return; }
  const q = req.query || {};
  let body = {};
  if (req.method === "POST") { body = req.body; if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = {}; } } body = body || {}; }

  // ---- owner mints or rolls the feed key (this half DOES need a seat) ----
  if (req.method === "POST") {
    const role = await roleOf(body.sess || "");
    if (role !== "manager" && role !== "admin") { res.status(403).json({ ok: false, error: "FORBIDDEN", message: "Only an owner can manage the subscribe link." }); return; }
    let key = await kvGet(NS + "cal:feedkey");
    if (body.action === "roll" || !key) { key = newKey(); await kvSet(NS + "cal:feedkey", key); }
    res.status(200).json({ ok: true, key, rolled: body.action === "roll" });
    return;
  }

  // ---- the feed itself: no session, correct key, or nothing --------------
  const key = String(q.key || "");
  const want = await kvGet(NS + "cal:feedkey");
  if (!want || !key || key !== String(want)) { res.status(404).setHeader("content-type", "text/plain"); res.end("Not found"); return; }

  const [events, teamevents, bookings, classes] = await Promise.all([
    loadCol("events"), loadCol("teamevents"), loadCol("bookings"), loadCol("classes")
  ]);

  const out = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Accelerated Experiences LLC//Momentum Hub//EN",
    "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "X-WR-CALNAME:Momentum Sports and Play",
    "X-WR-TIMEZONE:" + TZ,
    "X-WR-CALDESC:Classes, teams, parties and closures — from the Momentum hub.",
    "X-APPLE-CALENDAR-COLOR:#0f9d9d",
    "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
    "X-PUBLISHED-TTL:PT1H",
    // A VTIMEZONE block is what makes 4:30 PM show as 4:30 PM in both apps.
    "BEGIN:VTIMEZONE", "TZID:" + TZ,
    "BEGIN:DAYLIGHT", "TZOFFSETFROM:-0800", "TZOFFSETTO:-0700", "TZNAME:PDT",
    "DTSTART:19700308T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
    "BEGIN:STANDARD", "TZOFFSETFROM:-0700", "TZOFFSETTO:-0800", "TZNAME:PST",
    "DTSTART:19701101T020000", "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD",
    "END:VTIMEZONE"
  ];

  // Classes ride as WEEKLY recurrences — one entry each, not 47 copies.
  for (const c of classes) {
    const t = parseTime(c.time); const day = BYDAY[c.day];
    if (!t || !day) continue;                       // no published time means no invented one
    const e = addMins(t, minsOf(c.level));
    const first = nextDow(DOW[c.day]);
    out.push(vevent({
      uid: "class-" + c.id, start: localDT(first, t.h, t.m), end: localDT(first, e.h, e.m),
      summary: c.name + (c.ages ? " (" + c.ages + ")" : ""),
      desc: [c.program, c.level, c.coach ? "Coach " + c.coach : ""].filter(Boolean).join(" · "),
      loc: c.room || "", cat: c.program || "Class", rrule: "FREQ=WEEKLY;BYDAY=" + day
    }));
  }
  for (const t of teamevents) {
    const tm = parseTime(t.time);
    if (!t.date) continue;
    out.push(tm
      ? vevent({ uid: "team-" + t.id, start: localDT(t.date, tm.h, tm.m), end: localDT(t.date, ...Object.values(addMins(tm, 90))),
                 summary: t.team + " — " + (t.title || t.type), desc: [t.type, t.depart, t.notes].filter(Boolean).join("\n"),
                 loc: t.location || "", cat: "Teams" })
      : vevent({ uid: "team-" + t.id, start: t.date, end: t.date, allDay: true,
                 summary: t.team + " — " + (t.title || t.type), desc: [t.type, t.depart, t.notes].filter(Boolean).join("\n"),
                 loc: t.location || "", cat: "Teams" }));
  }
  for (const b of bookings) {
    const tm = parseTime(b.time);
    if (!b.date || !tm) continue;
    const e = addMins(tm, +b.minutes || 120);
    out.push(vevent({ uid: "party-" + b.id, start: localDT(b.date, tm.h, tm.m), end: localDT(b.date, e.h, e.m),
      summary: b.title || (b.name ? b.name + "'s party" : "Party"), desc: b.note || "", loc: b.room || "", cat: "Parties" }));
  }
  for (const e of events) {
    if (!e.date) continue;
    const tm = parseTime(e.time);
    if (e.allDay || !tm) {
      out.push(vevent({ uid: "ev-" + e.id, start: e.date, end: e.end || e.date, allDay: true,
        summary: e.title || "Event", desc: e.note || "", loc: e.location || "", cat: e.kind || "Gym" }));
    } else {
      const en = addMins(tm, +e.minutes || 60);
      out.push(vevent({ uid: "ev-" + e.id, start: localDT(e.date, tm.h, tm.m), end: localDT(e.date, en.h, en.m),
        summary: e.title || "Event", desc: e.note || "", loc: e.location || "", cat: e.kind || "Gym" }));
    }
  }

  out.push("END:VCALENDAR");
  res.status(200);
  res.setHeader("content-type", "text/calendar; charset=utf-8");
  res.setHeader("content-disposition", 'inline; filename="momentum.ics"');
  res.setHeader("cache-control", "public, max-age=900");
  res.end(out.join("\r\n") + "\r\n");
}
