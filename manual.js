/* OWNER'S MANUAL + HELP ASSISTANT — Momentum OS. Accelerated Experiences, LLC.
   Built with the ae-help-manual machine: a slide-in Guide (search / filter / sort)
   plus an "Ask a question" assistant that answers from the manual itself — a
   knowledge-base matcher, not a live AI, so it can never make something up.

   SELF-CONTAINED ON PURPOSE (his order: don't wipe anything, don't collide):
   one file, one IIFE, zero globals, no inline onclick handlers, own esc().
   hub-nav.js APPENDS a loader; nothing existing is edited. The reference's
   name-collision warning was honored: the repo was grepped for MANCATS,
   openManual, man-*, helpbtn — clean — and everything here is fenced anyway.
   Frankie owns the bottom-right corner; our fallback button sits bottom-LEFT. */
(function () {
  "use strict";
  if (document.getElementById("momManual")) return;

  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------------- the manual itself: every room, operator-voiced ---------------- */
  var MANCATS = [
    { k: "start",   label: "Getting started" },
    { k: "desk",    label: "Front desk" },
    { k: "prog",    label: "Programs & classes" },
    { k: "family",  label: "Families & parents" },
    { k: "money",   label: "Money" },
    { k: "people",  label: "Staff & safety" },
    { k: "office",  label: "The office" },
    { k: "system",  label: "System & phone" }
  ];

  var MANUAL = [
    { c: "start", t: "What Momentum OS is", g: "overview what is system hub everything about", b: "Your whole gym in one place: check-in, enrollment, classes, the cheer squads, tuition, staff, waivers, messaging and your books — twenty-nine connected rooms behind one sign-in. The sidebar is the map; the Command Center is home." },
    { c: "start", t: "Signing in, and what each seat sees", g: "sign in login seat role switch owner admin coach parent front desk demo password", b: "Tap the gear on your website (or open the hub link) and pick your seat. Each seat sees only its own rooms — a coach sees coaching rooms, a parent sees the Team App and nothing else. Owner and Admin see everything. Use Switch role at the bottom of the sidebar to change seats, and put your name in when you sign in so messages are signed properly." },
    { c: "start", t: "The Command Center", g: "home dashboard cockpit stats enrollment fill rate overview", b: "The owner's first screen: kids enrolled, classes running, the fill donut, tuition, and a door to every room. The class list is your real Fall schedule; seat counts are sample until your roster is connected — the page says so right on it." },
    { c: "start", t: "Is this my real data?", g: "real data sample demo numbers fake seed roster", b: "Your class schedule, cheer squads, tuition rates and policies are yours, transcribed from your own published material. Enrollment counts and money totals are sample until your roster connects. Anything the gym never published was left blank on purpose rather than invented." },

    { c: "desk", t: "The Desk Today", g: "desk today front counter morning open who is in", b: "The front counter's one screen for the day: today's classes in order, who's due in, birthdays, and what needs a decision. Open it when the doors open and leave it up." },
    { c: "desk", t: "Check-in & attendance", g: "check in checkin attendance roll present absent tap", b: "One tap per child as they walk in. The floor log fills itself, and attendance lands on the class record — no clipboard, no re-typing." },
    { c: "desk", t: "Enrollment & waitlists", g: "enroll enrollment waitlist promote full class spot open", b: "Every class roster and its waitlist in one place. When a spot opens, promote from the waitlist with one click — the family moves onto the roster and the waitlist shortens. Website waitlist requests land here by themselves." },
    { c: "desk", t: "The Growth Funnel", g: "funnel leads lead enquiry trial website new family pipeline", b: "Every new-family enquiry from first click to enrolled. The $10 first-class bookings and party enquiries from your public pages land in the New column automatically, with a phone number you can tap." },
    { c: "desk", t: "The $10 first class", g: "trial free first class ten dollars book", b: "Momentum has never offered a free trial — the first class in any program is $10, and every page says exactly that. The public booking page (/trial.html) needs no login and lands straight in your Growth Funnel." },

    { c: "prog", t: "Classes & Schedule", g: "classes schedule timetable day filter join waitlist", b: "Your real Fall schedule — over a hundred classes — grouped by day the way a parent reads it, filterable by program and day. A full class offers 'Join the waitlist' instead of a dead end." },
    { c: "prog", t: "Floor Studio", g: "studio floor rooms rotations levels ladders", b: "The gym floor on a screen: rooms, rotations and the level ladders, so everyone knows what runs where." },
    { c: "prog", t: "Skill Pathways", g: "pathway skills levels progression belt gym kids hot shots ninja", b: "The ladders a child climbs: Gym Kids to Hot Shots to Firecrackers to PreComp, the ninja belts from white to black, tumbling levels 1–4. Where each child sits and what comes next." },
    { c: "prog", t: "The cheer squads", g: "cheer squad flare ignite novas flash embers sparkles starlights pathway division", b: "All seven squads with their real practice slots. Which pathway each squad sits in (Recreational, Exhibition, Prep, Elite) and its age division are still blank on purpose — that's a question only the gym can answer, and the hub won't guess." },
    { c: "prog", t: "Staff & Coaches", g: "coaches staff roster team who programs", b: "Every coach, what they run, and their programs. This roster also powers Connect's people list — one list, everywhere." },

    { c: "family", t: "The Team App", g: "team app parent view kids athletes messages events", b: "What a parent sees: their own kids, their teams, team events and posts from the gym. Parents see counts, never other families' children." },
    { c: "family", t: "Why parents can't see other kids", g: "privacy children names hidden roster custody parent see", b: "On purpose, and it fails closed: a parent seat is never handed a list of other people's children — custody arrangements, safety plans, and families who never agreed to a directory are all real reasons. Team pages show '10 athletes on this team', names hidden. Coaches and the front desk see full rosters. Please don't ask for initials to be added back — that's still a roster." },
    { c: "family", t: "Parties & rooms", g: "party parties birthday booking room enquiry", b: "Birthday party bookings and the party rooms. The public party page quotes no price — that's yours to set — and every enquiry lands in the Growth Funnel with the family's contact." },

    { c: "money", t: "Tuition & Billing", g: "tuition billing rates price cost discount sibling multi class registration", b: "Your real rates — $70, $87 and $123 a month by class length across 47 weeks, registration $50 a child ($125 family max) — and a table that does the stacked-discount math for you: sibling 10%, multi-class 25%. Two kids in two classes each is $289, not $348." },
    { c: "money", t: "Books & Margins", g: "books expenses revenue margin profit accounting", b: "Revenue, expenses and true margins. Approved payroll weeks land here as a Payroll expense so labour cost is in the month's books." },
    { c: "money", t: "Timesheets & Payroll", g: "payroll timesheets hours gross pay rate overtime approve week", b: "Owner-only. Hours come off the Time Clock; a punch with no matching out is flagged, never guessed. A rate nobody set stays blank. Overtime is off until you switch it on. It stops at gross pay — it is not a payroll provider and does no tax." },

    { c: "people", t: "The Time Clock", g: "time clock punch in out pin kiosk tablet staff", b: "A shared tablet at the desk. Staff tap their name and PIN to punch in and out. It says on its own face: it's a time clock, not a lock. Unmatched punches show up flagged in Payroll for a human to fix." },
    { c: "people", t: "HR & Certifications", g: "hr certifications cpr expiring background staff records reminders", b: "Certs, expirations and staff records, with a 'Show me today's reminder' button. Automatic reminder emails are built and dormant — they start the day a mail key is added, not before." },
    { c: "people", t: "Waivers & Safety", g: "waivers safety incident missing expiring law legal", b: "The waiver docket: who's signed, who's missing, what's expiring, and the incident log. The System Health board flags waiver gaps so they can't hide." },
    { c: "people", t: "The Approval Desk", g: "approvals approve deny requests decisions", b: "Anything that needs an owner's yes — one queue, plain Approve and Deny buttons, a record of who decided what." },

    { c: "office", t: "The Calendar", g: "calendar month week day events subscribe google apple ics color", b: "Month, week, day and list views, colour-coded by program. Subscribe puts the gym's calendar inside Google or Apple Calendar on your own phone — mint the link once from the subscribe button and it stays current by itself." },
    { c: "office", t: "Connect — the staff line", g: "connect messages chat channels video call meet guest staff", b: "Staff messaging, channels, and face-to-face video in the browser — no app, no Zoom. Make an outreach link and a parent or vendor can join the meeting from a plain browser with no account. Staff only; the roster comes from Staff & Coaches." },
    { c: "office", t: "The Master List", g: "master list todo tasks priority drag notes owners thread", b: "The owners' private running list. Write things down in any order — new items land on top — then drag what matters most to the top: where a card sits is its priority. Notes stay open under every task. Finished work turns gold and stays until Start fresh clears it. Owner and Admin seats only." },
    { c: "office", t: "Documents — write it, save it to Word", g: "documents letters flyers notices word docx editor write export", b: "A word processor in the hub: headings, bold, lists, on a clean page. It saves by itself as you type, and one button saves a real Word (.docx) file to your computer. Owner, Admin and Front Desk seats." },
    { c: "office", t: "The Hall of Records", g: "records files upload flyer pdf print save storage download", b: "The gym's filing cabinet: upload flyers, printouts and any file, organized on shelves, downloadable by any signed-in seat. Files upload straight to storage, so size doesn't matter." },

    { c: "system", t: "Put it on your phone", g: "phone install home screen app mobile tab bar add ios android", b: "On a phone the sidebar becomes a real tab bar, and Add to Home Screen installs the hub like an app with the Momentum mark as its icon. Share > Add to Home Screen on iPhone; the browser menu on Android." },
    { c: "system", t: "Choose Your Look — skins", g: "skins look theme dark light colors midnight repaint", b: "Six looks made for Momentum. Tap one and the whole hub repaints — every room, every page. Midnight Gym, the dark one, is the house default; your choice sticks on your own device." },
    { c: "system", t: "System Health", g: "system health board tools status green amber it", b: "Every tool the gym runs on, one glance, plain English. Green means leave it alone; amber says exactly what to look at and why. Statuses are set by a human on purpose." },
    { c: "system", t: "Who's been in — the visit log", g: "visits visitors ip address log who opened when analytics", b: "Owner eyes only, at the bottom of System Health: every open of the hub and its public pages — date, time, page, who (when signed in), rough location, IP and device. It keeps the most recent 2,000 visits." },
    { c: "system", t: "Frankie, the in-hub assistant", g: "frankie assistant ai robot ask bubble bottom corner", b: "The round face in the bottom-right corner of most rooms. Frankie can see the room you're in and answers questions about what's on screen. This manual is the deeper reference; Frankie is the quick word in your ear." },
    { c: "system", t: "Bring Your Data", g: "import bring data studio director csv migrate", b: "The door for moving your existing records in — families and classes from the old system. Export from Studio Director before cancelling it; the System Health board tracks that switch." },
    { c: "system", t: "Comply — the Trust Center", g: "comply trust center security https email evidence readiness", b: "Live checks on the boring-but-vital things: your domain's email security, HTTPS, and the evidence trail. It monitors readiness — it deliberately certifies nothing." },
    { c: "system", t: "Getting more help", g: "support contact help question phone email anthony accelerated", b: "Ask here first — the Ask tab searches this whole manual. For anything bigger, Accelerated Experiences supports this system directly: anthonye@aexperiences.studio." }
  ];

  var SYN = {
    pay: ["payment", "tuition", "cost", "price", "fee", "paid", "bill", "billing", "charge", "money"],
    register: ["signup", "enroll", "enrollment", "join", "registration", "sign"],
    signin: ["login", "log", "password", "access", "account", "logout", "signout", "seat"],
    kid: ["child", "children", "kids", "athlete", "student", "son", "daughter"],
    class: ["classes", "lesson", "session", "schedule"],
    checkin: ["attendance", "roll", "present", "arrive"],
    video: ["call", "meet", "meeting", "zoom", "facetime", "camera"],
    task: ["todo", "list", "tasks", "priority"],
    word: ["docx", "document", "letter", "flyer", "notice"],
    phone: ["mobile", "iphone", "android", "app", "install", "tablet"],
    visit: ["visitor", "visits", "ip", "opened", "analytics", "traffic"],
    staff: ["coach", "coaches", "team", "employee", "teacher"],
    dark: ["skin", "theme", "look", "midnight", "color", "colours"],
    discount: ["discounts", "sibling", "multi", "percent", "off", "deal", "cheaper"]
  };
  var STOP = {}; "the a an to how do i can is of and for my in on it this that with you your we me get use using what where when why which are be or if from at as does".split(" ").forEach(function (w) { STOP[w] = 1; });

  function score(q) {
    var toks = q.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(function (w) { return w && !STOP[w]; });
    var seen = {}; toks.forEach(function (t) { seen[t] = 1;
      for (var k in SYN) { if (k === t || SYN[k].indexOf(t) >= 0) { seen[k] = 1; SYN[k].forEach(function (x) { seen[x] = 1; }); } } });
    var words = Object.keys(seen);
    return MANUAL.map(function (a) {
      var T = a.t.toLowerCase(), G = (a.g || "").toLowerCase(), B = a.b.toLowerCase(), s = 0;
      words.forEach(function (w) {
        var forms = [w]; if (w.length > 3 && w.slice(-1) === "s") forms.push(w.slice(0, -1));
        var hit = 0;
        forms.forEach(function (f) { if (!hit) { if (T.indexOf(f) >= 0) hit = 4; else if (G.indexOf(f) >= 0) hit = 2; else if (B.indexOf(f) >= 0) hit = 1; } });
        s += hit; });
      return { a: a, s: s };
    }).sort(function (x, y) { return y.s - x.s; });
  }

  /* ---------------- panel: skin-aware, structure from the reference ---------------- */
  var css = "" +
    ".momhelp-btn{width:30px;height:30px;border-radius:50%;border:1px solid var(--line,#e6ddcb);background:var(--card,#fff);color:var(--ink2,#4f4638);font-weight:900;font-size:15px;cursor:pointer;flex:none;line-height:1}" +
    ".momhelp-btn:hover{border-color:var(--accent,#0f9d9d);color:var(--accent,#0f9d9d)}" +
    ".momhelp-float{position:fixed;left:16px;bottom:16px;z-index:1190;width:44px;height:44px;border-radius:50%;border:1px solid var(--line,#e6ddcb);background:var(--card,#fff);color:var(--ink,#2a201a);font-weight:900;font-size:19px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.18)}" +
    "#momManual{position:fixed;inset:0;z-index:1400;display:none;font-family:Inter,system-ui,sans-serif}" +
    "#momManual.on{display:block}" +
    ".man-scrim{position:absolute;inset:0;background:rgba(10,14,16,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}" +
    ".man-panel{position:absolute;top:0;right:0;height:100%;width:min(468px,100%);background:var(--paper,#fbf7f2);color:var(--ink,#2a201a);display:flex;flex-direction:column;box-shadow:-24px 0 70px rgba(0,0,0,.4)}" +
    ".man-top{display:flex;align-items:center;gap:12px;padding:18px 18px;background:linear-gradient(135deg,var(--accent3,#0a4f4f),var(--accent2,#0c6b6b));color:#fff}" +
    ".man-badge{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:22px;font-family:Georgia,serif}" +
    ".man-ttl b{font-family:Georgia,serif;font-size:19px;display:block;line-height:1.1}.man-ttl small{opacity:.75;font-size:11.5px}" +
    ".man-x{margin-left:auto;background:rgba(255,255,255,.12);border:0;color:#fff;font-size:20px;cursor:pointer;width:34px;height:34px;border-radius:9px}" +
    ".man-tabs{display:flex;gap:6px;padding:10px 14px 0;background:var(--cream,#f1ece1);border-bottom:1px solid var(--line,#e6ddcb)}" +
    ".man-tabs button{flex:1;padding:11px;border:0;border-radius:11px 11px 0 0;background:transparent;color:var(--mut,#847a68);font:inherit;font-weight:800;font-size:13.5px;cursor:pointer}" +
    ".man-tabs button.on{background:var(--paper,#fbf7f2);color:var(--ink,#2a201a);box-shadow:inset 0 3px 0 var(--accent,#0f9d9d)}" +
    ".man-body{flex:1;overflow:auto;padding:15px}" +
    ".man-search input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1px solid var(--line,#e6ddcb);background:var(--card,#fff);color:var(--ink,#2a201a);font:inherit;font-size:15px;margin-bottom:12px}" +
    ".man-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}" +
    ".man-chip{padding:6px 11px;border-radius:99px;border:1px solid var(--line,#e6ddcb);background:var(--card,#fff);color:var(--ink2,#4f4638);font:inherit;font-size:12px;font-weight:700;cursor:pointer}" +
    ".man-chip.on{background:var(--accent,#0f9d9d);color:var(--onAccent,#fff);border-color:transparent}" +
    ".man-sortrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px;color:var(--mut,#847a68);font-size:12px}" +
    ".man-sortrow select{font:inherit;font-size:12px;padding:5px 8px;border-radius:9px;border:1px solid var(--line,#e6ddcb);background:var(--card,#fff);color:var(--ink,#2a201a);margin-left:6px}" +
    ".man-art{background:var(--card,#fff);border:1px solid var(--line,#e6ddcb);border-radius:13px;margin-bottom:9px;overflow:hidden}" +
    ".man-art[open]{border-color:var(--accent,#0f9d9d)}" +
    ".man-art summary{list-style:none;cursor:pointer;padding:13px 15px;display:flex;align-items:center;gap:11px}" +
    ".man-art summary::-webkit-details-marker{display:none}" +
    ".man-meta{flex:1;min-width:0}.man-cat{font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent,#0f9d9d);font-weight:900;display:block;margin-bottom:2px}" +
    ".man-t{font-weight:700;font-size:14px;line-height:1.3;color:var(--ink,#2a201a)}" +
    ".man-chev{color:var(--mut,#847a68);transition:.2s}.man-art[open] .man-chev{transform:rotate(90deg)}" +
    ".man-b{padding:0 15px 14px 15px;color:var(--ink2,#4f4638);font-size:13.5px;line-height:1.6}" +
    ".man-empty{color:var(--mut,#847a68);text-align:center;padding:36px 20px;font-size:13.5px}" +
    ".man-foot{display:flex;align-items:center;gap:9px;padding:12px 15px;border-top:1px solid var(--line,#e6ddcb);color:var(--mut,#847a68);font-size:11.5px;background:var(--cream,#f1ece1)}" +
    ".man-foot img{width:20px;height:20px;object-fit:contain}.man-foot b{color:var(--ink2,#4f4638)}" +
    ".man-ask{display:flex;flex-direction:column;height:100%}" +
    ".man-chat{flex:1;overflow:auto;display:flex;flex-direction:column;gap:10px;padding-bottom:12px}" +
    ".mc{max-width:88%;padding:11px 14px;border-radius:15px;font-size:13.5px;line-height:1.55}" +
    ".mc.u{align-self:flex-end;background:var(--accent,#0f9d9d);color:var(--onAccent,#fff);border-bottom-right-radius:5px}" +
    ".mc.b{align-self:flex-start;background:var(--card,#fff);border:1px solid var(--line,#e6ddcb);color:var(--ink,#2a201a);border-bottom-left-radius:5px}" +
    ".mc.b p{margin:5px 0 0}" +
    ".man-relwrap{margin-top:9px;font-size:11px;color:var(--mut,#847a68);display:flex;flex-wrap:wrap;gap:5px;align-items:center}" +
    ".man-rel,.man-sugg button{background:var(--cream,#f1ece1);border:1px solid var(--line,#e6ddcb);border-radius:99px;padding:5px 10px;font:inherit;font-size:11.5px;color:var(--ink2,#4f4638);cursor:pointer;font-weight:600}" +
    ".man-sugg{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}" +
    ".man-inputrow{display:flex;gap:8px;padding-top:10px;border-top:1px solid var(--line,#e6ddcb)}" +
    ".man-inputrow input{flex:1;padding:11px 13px;border-radius:11px;border:1px solid var(--line,#e6ddcb);background:var(--card,#fff);color:var(--ink,#2a201a);font:inherit;font-size:15px}" +
    ".man-inputrow button{border:0;background:var(--accent,#0f9d9d);color:var(--onAccent,#fff);border-radius:11px;padding:0 16px;font:inherit;font-weight:800;cursor:pointer}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var state = { mode: "guide", q: "", cat: "", sort: "relevance", chat: [] };

  var wrap = document.createElement("div"); wrap.id = "momManual"; wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = '<div class="man-scrim"></div>' +
    '<aside class="man-panel" role="dialog" aria-label="Owner&#8217;s Manual">' +
    '<header class="man-top"><div class="man-badge">?</div>' +
    '<div class="man-ttl"><b>Owner&#8217;s Manual</b><small>Momentum Sports and Play &middot; every room, explained</small></div>' +
    '<button class="man-x" aria-label="Close">&times;</button></header>' +
    '<div class="man-tabs"><button data-m="guide" class="on">Guide</button><button data-m="ask">Ask a question</button></div>' +
    '<div class="man-body"></div>' +
    '<footer class="man-foot"><img src="/ae-mark.png" alt=""> Support &amp; documentation by <b>Accelerated Experiences, LLC</b></footer>' +
    '</aside>';
  document.body.appendChild(wrap);
  var body = wrap.querySelector(".man-body");

  function openManual() { wrap.classList.add("on"); wrap.setAttribute("aria-hidden", "false"); render(); }
  function closeManual() { wrap.classList.remove("on"); wrap.setAttribute("aria-hidden", "true"); }
  wrap.querySelector(".man-scrim").addEventListener("click", closeManual);
  wrap.querySelector(".man-x").addEventListener("click", closeManual);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && wrap.classList.contains("on")) closeManual(); });
  wrap.querySelector(".man-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-m]"); if (!b) return;
    state.mode = b.getAttribute("data-m");
    wrap.querySelectorAll(".man-tabs button").forEach(function (x) { x.classList.toggle("on", x === b); });
    render();
  });

  function catLabel(k) { for (var i = 0; i < MANCATS.length; i++) if (MANCATS[i].k === k) return MANCATS[i].label; return k; }

  function render() { if (state.mode === "guide") renderGuide(); else renderAsk(); }

  function renderGuide() {
    var chips = [{ k: "", label: "All" }].concat(MANCATS).map(function (c) {
      return '<button class="man-chip' + (state.cat === c.k ? " on" : "") + '" data-cat="' + c.k + '">' + esc(c.label) + "</button>";
    }).join("");
    body.innerHTML = '<div class="man-search"><input placeholder="Search the manual&hellip;" value="' + esc(state.q) + '"></div>' +
      '<div class="man-chips">' + chips + "</div>" +
      '<div class="man-sortrow"><span class="man-count"></span><label>Sort<select>' +
      '<option value="relevance"' + (state.sort === "relevance" ? " selected" : "") + ">Relevance</option>" +
      '<option value="az"' + (state.sort === "az" ? " selected" : "") + ">A&ndash;Z</option>" +
      '<option value="cat"' + (state.sort === "cat" ? " selected" : "") + ">Category</option></select></label></div>" +
      '<div class="man-list"></div>';
    var inp = body.querySelector(".man-search input");
    inp.addEventListener("input", function () { state.q = inp.value; list(); });
    body.querySelector("select").addEventListener("change", function (e) { state.sort = e.target.value; list(); });
    body.querySelector(".man-chips").addEventListener("click", function (e) {
      var b = e.target.closest(".man-chip"); if (!b) return;
      state.cat = b.getAttribute("data-cat");
      body.querySelectorAll(".man-chip").forEach(function (x) { x.classList.toggle("on", x === b); });
      list();
    });
    list();
  }
  function list() {
    var arr = MANUAL.slice();
    if (state.cat) arr = arr.filter(function (a) { return a.c === state.cat; });
    var q = (state.q || "").trim();
    if (q) { var ranked = score(q), rank = new Map(); ranked.forEach(function (r) { rank.set(r.a, r.s); });
      arr = arr.filter(function (a) { return (rank.get(a) || 0) > 0; });
      if (state.sort === "relevance") arr.sort(function (x, y) { return (rank.get(y) || 0) - (rank.get(x) || 0); }); }
    if (state.sort === "az") arr.sort(function (x, y) { return x.t.localeCompare(y.t); });
    if (state.sort === "cat") arr.sort(function (x, y) { return catLabel(x.c).localeCompare(catLabel(y.c)) || x.t.localeCompare(y.t); });
    var box = body.querySelector(".man-list"); if (!box) return;
    box.innerHTML = arr.length ? arr.map(function (a) {
      return '<details class="man-art"><summary><span class="man-meta"><span class="man-cat">' + esc(catLabel(a.c)) + '</span><span class="man-t">' + esc(a.t) + '</span></span><span class="man-chev">&#9656;</span></summary><div class="man-b">' + esc(a.b) + "</div></details>";
    }).join("") : '<div class="man-empty">No matches. Try the <b>Ask</b> tab, or different words.</div>';
    var cnt = body.querySelector(".man-count"); if (cnt) cnt.textContent = arr.length + " article" + (arr.length === 1 ? "" : "s");
  }

  function renderAsk() {
    body.innerHTML = '<div class="man-ask"><div class="man-chat"></div>' +
      '<div class="man-inputrow"><input placeholder="Ask anything&hellip;"><button type="button">Ask</button></div></div>';
    if (!state.chat.length) state.chat.push({ r: "b", html: "I&#8217;m the help assistant &mdash; I answer from this manual, so I never guess. Ask anything, or tap one:" +
      '<div class="man-sugg"><button data-q="How does a parent sign in?">How does a parent sign in?</button>' +
      '<button data-q="How do tuition discounts work?">How do discounts work?</button>' +
      '<button data-q="How do I see who visited the hub?">Who visited the hub?</button>' +
      '<button data-q="How do I save a document to Word?">Save a letter to Word?</button></div>' });
    var inp = body.querySelector(".man-inputrow input");
    body.querySelector(".man-inputrow button").addEventListener("click", function () { ask(inp.value); inp.value = ""; });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { ask(inp.value); inp.value = ""; } });
    body.querySelector(".man-chat").addEventListener("click", function (e) {
      var b = e.target.closest("[data-q]"); if (b) { ask(b.getAttribute("data-q")); return; }
      var r = e.target.closest("[data-art]"); if (r) { var a = MANUAL[+r.getAttribute("data-art")];
        if (a) { state.chat.push({ r: "b", html: "<b>" + esc(a.t) + "</b><p>" + esc(a.b) + "</p>" }); chat(); } }
    });
    chat(); setTimeout(function () { inp.focus(); }, 40);
  }
  function chat() { var box = body.querySelector(".man-chat"); if (!box) return;
    box.innerHTML = state.chat.map(function (m) { return m.r === "u" ? '<div class="mc u">' + esc(m.t) + "</div>" : '<div class="mc b">' + m.html + "</div>"; }).join("");
    box.scrollTop = box.scrollHeight; }
  function ask(qRaw) {
    var q = String(qRaw || "").trim(); if (!q) return;
    state.chat.push({ r: "u", t: q });
    var res = score(q).filter(function (x) { return x.s > 0; }).slice(0, 3);
    if (!res.length) state.chat.push({ r: "b", html: "I couldn&#8217;t find that one in the manual yet. Try different words, browse the <b>Guide</b> tab, or write to <b>anthonye@aexperiences.studio</b>." });
    else { var top = res[0].a, html = "<b>" + esc(top.t) + "</b><p>" + esc(top.b) + "</p>";
      var rel = res.slice(1).filter(function (r) { return r.s > 1; });
      if (rel.length) html += '<div class="man-relwrap"><span>Related:</span>' + rel.map(function (r) {
        return '<button class="man-rel" data-art="' + MANUAL.indexOf(r.a) + '">' + esc(r.a.t) + "</button>"; }).join("") + "</div>";
      state.chat.push({ r: "b", html: html }); }
    chat();
  }

  /* ---------------- the ? button: in the nav header on every page; float if no nav ---------------- */
  function mount() {
    var top = document.querySelector(".hn-top");
    if (top && !top.querySelector(".momhelp-btn")) {
      var b = document.createElement("button");
      b.className = "momhelp-btn"; b.type = "button"; b.title = "Owner's Manual & Help"; b.setAttribute("aria-label", "Help");
      b.textContent = "?"; b.addEventListener("click", openManual);
      top.appendChild(b);
      return true;
    }
    return false;
  }
  if (!mount()) {
    var tries = 0;
    var iv = setInterval(function () { if (mount() || ++tries > 20) { clearInterval(iv);
      if (tries > 20 && !document.querySelector(".momhelp-btn")) {
        var f = document.createElement("button");
        f.className = "momhelp-float momhelp-btn"; f.type = "button"; f.title = "Owner's Manual & Help"; f.setAttribute("aria-label", "Help");
        f.textContent = "?"; f.addEventListener("click", openManual);
        document.body.appendChild(f);
      } } }, 250);
  }
})();
