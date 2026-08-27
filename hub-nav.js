/* HUB CORE — shared, config-driven side navigation + skin + header. Role-aware.
   Drop on any page:  <script src="/config.js"></script><script src="/hub-nav.js" defer></script>
   Reads window.HUB_CONFIG. Nothing here is tenant-specific. Accelerated Experiences, LLC. */
(function () {
  var C = window.HUB_CONFIG || {};
  var SECTIONS = C.sections || [];
  var DEPTS = C.departments || [{ name: "", keys: SECTIONS.map(function (s) { return s.k; }) }];
  var ROLES = C.roles || { guest: ["home"] };
  var PRETTY = C.rolePretty || {};
  var SK = C.skin || {};
  var BR = C.brand || { name: "Hub", short: "Hub", version: "" };
  var ALLKEYS = SECTIONS.map(function (s) { return s.k; });

  var TOKEN = (new URLSearchParams(location.search).get("sess")) || (function () { try { return localStorage.getItem("hub_sess") || ""; } catch (e) { return ""; } })();
  if (TOKEN) { try { localStorage.setItem("hub_sess", TOKEN); } catch (e) {} }
  var S = TOKEN ? ("?sess=" + encodeURIComponent(TOKEN)) : "";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // shared whoami promise (deduped across every include on the page)
  window.hubWho = window.hubWho || fetch("/api/auth?do=whoami&t=" + encodeURIComponent(TOKEN)).then(function (r) { return r.json(); }).catch(function () { return null; });

  function allowed(roles) {
    if (!roles || !roles.length) roles = ["guest"];
    var set = {};
    roles.forEach(function (r) { var v = ROLES[r]; if (v === "*") ALLKEYS.forEach(function (k) { set[k] = 1; }); else (v || []).forEach(function (k) { set[k] = 1; }); });
    var keys = ALLKEYS.filter(function (k) { return set[k]; });
    if (keys.length) return keys;
    var g = ROLES.guest; if (g === "*") return ALLKEYS.slice();
    return (g && g.length ? g : ["home"]);
  }
  function curKey() { var here = (location.pathname || "/hub.html").replace(/\/index\.html$/, "/"); if (here === "/hub.html" || here === "/") return "home"; for (var i = 0; i < SECTIONS.length; i++) { var s = SECTIONS[i]; if (s.href !== "/hub.html" && here.indexOf(s.href) === 0) return s.k; } return "home"; }
  function curDept() { var k = curKey(); for (var d = 0; d < DEPTS.length; d++) { if ((DEPTS[d].keys || []).indexOf(k) >= 0) return DEPTS[d]; } return null; }
  function curSec() { var k = curKey(); for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].k === k) return SECTIONS[i]; return null; }

  // ---- skin: brand base + this page's department accent ----
  var dep = curDept();
  var A = (dep && dep.accent) || SK.accent || "#2f6f8f";
  function shade(hex, f) { try { var n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; r = Math.round(r * f); g = Math.round(g * f); b = Math.round(b * f); return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); } catch (e) { return hex; } }
  var A2 = SK.accent2 || shade(A, 0.82), A3 = SK.accent3 || shade(A, 0.66);
  if (dep && dep.accent) { A2 = shade(A, 0.82); A3 = shade(A, 0.66); }
  var root = ":root{--paper:" + (SK.paper || "#f7f4ee") + ";--card:" + (SK.card || "#fff") + ";--cream:" + (SK.cream || "#f1ece1") +
    ";--ink:" + (SK.ink || "#26211a") + ";--ink2:" + (SK.ink2 || "#4f4638") + ";--mut:" + (SK.mut || "#847a68") +
    ";--line:" + (SK.line || "#e6ddcb") + ";--line2:" + (SK.line2 || "#f0e9da") +
    ";--accent:" + A + ";--accent2:" + A2 + ";--accent3:" + A3 + ";--onAccent:" + (SK.onAccent || "#f6fbfd") + "}";

  var css = root +
    ".hn{position:fixed;top:0;left:0;bottom:0;width:248px;background:var(--cream);border-right:1px solid var(--line);z-index:1200;display:flex;flex-direction:column;padding:18px 14px;transform:translateX(-100%);transition:transform .26s ease;overflow-y:auto;font-family:'Inter',system-ui,sans-serif}" +
    "body.hn-open .hn{transform:none}body{transition:padding-left .26s ease}body.hn-open{padding-left:248px}" +
    "@media(max-width:900px){body.hn-open{padding-left:0}.hn{box-shadow:0 0 44px rgba(0,0,0,.25)}}" +
    ".hn-top{display:flex;align-items:center;gap:9px;margin-bottom:6px}" +
    ".hn-logo{flex:1;display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--ink)}.hn-mark{width:34px;height:34px;flex:none;border-radius:8px;object-fit:contain;background:var(--accent);display:grid;place-items:center;color:var(--onAccent);font-weight:800;font-family:Georgia,serif}" +
    ".hn-word{font-family:Georgia,serif;font-weight:800;font-size:19px;letter-spacing:-.01em;line-height:1}.hn-ver{display:block;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-top:3px}" +
    ".hn-collapse{background:rgba(0,0,0,.05);border:1px solid var(--line);color:var(--mut);width:30px;height:30px;border-radius:8px;font-size:17px;cursor:pointer;flex:none}" +
    ".hn-tag{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);margin:2px 2px 10px}" +
    ".hn-links{display:flex;flex-direction:column;gap:2px}" +
    ".hn-dept{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);margin:12px 2px 4px;padding-top:10px;border-top:1px solid var(--line)}.hn-dept.first{margin-top:2px;padding-top:0;border-top:none}" +
    ".hn-link{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:9px;color:var(--ink2);text-decoration:none;font-size:14px;transition:background .14s,color .14s}" +
    ".hn-link:hover{background:rgba(0,0,0,.05);color:var(--ink)}" +
    ".hn-link.active{background:rgba(0,0,0,.05);color:var(--accent);box-shadow:inset 3px 0 0 var(--accent);font-weight:600}" +
    ".hn-ic{width:30px;height:30px;border-radius:8px;flex:none;display:block}" +
    ".hn-site{display:flex;align-items:center;gap:10px;text-decoration:none;margin-top:14px;padding:11px 12px;border:1px solid var(--line);border-radius:11px;background:rgba(255,255,255,.04);color:var(--ink);transition:background .15s,border-color .15s}" +
    ".hn-site:hover{background:var(--accent);border-color:var(--accent);color:var(--onAccent)}" +
    ".hn-site svg{width:20px;height:20px;flex:none;stroke:currentColor;fill:none;stroke-width:1.7}" +
    ".hn-site .t{flex:1;min-width:0}" +
    ".hn-site .l{display:block;font-size:13px;font-weight:700;line-height:1.2}" +
    ".hn-site .n{display:block;font-size:11px;opacity:.72;margin-top:2px}" +
    ".hn-site .x{font-size:13px;opacity:.6}" +
    ".hn-foot{margin-top:auto;padding-top:14px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:9px}" +
    ".hn-who{font-size:12px;color:var(--mut);line-height:1.5}.hn-who b{color:var(--accent)}" +
    ".hn-acts{display:flex;gap:8px}.hn-acts a{flex:1;text-align:center;font-size:12px;padding:8px;border-radius:8px;text-decoration:none;border:1px solid var(--line);color:var(--ink2);cursor:pointer}.hn-acts a:hover{background:rgba(0,0,0,.04)}" +
    ".hn-openbtn{position:fixed;top:13px;left:13px;z-index:1201;width:44px;height:44px;border-radius:11px;background:var(--card);border:1px solid var(--line);color:var(--ink);font-size:19px;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,.14)}" +
    "body:not(.hn-open) .hn-openbtn{display:flex}" +
    ".hn-hdr{background:linear-gradient(180deg,var(--accent),var(--accent2));color:var(--onAccent);padding:12px 0;position:sticky;top:0;z-index:30;box-shadow:0 3px 14px rgba(0,0,0,.12)}" +
    ".hn-hb{max-width:1180px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:12px}" +
    ".hn-hic{width:40px;height:40px;border-radius:10px;flex:none;display:block;box-shadow:0 3px 9px rgba(0,0,0,.22)}" +
    ".hn-htitle{font-family:Georgia,serif;font-weight:700;font-size:19px;line-height:1.1}.hn-hsub{font-size:11px;opacity:.85;margin-top:2px}.hn-hsp{flex:1}" +
    ".hn-hrole{font-size:11px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.28);padding:5px 10px;border-radius:99px}.hn-hrole:empty{display:none}" +
    "@media(max-width:900px){.hn-hb{padding-left:60px}}" +
    ".hn-tabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:1202;background:color-mix(in srgb, var(--cream) 88%, transparent);-webkit-backdrop-filter:saturate(180%) blur(14px);backdrop-filter:saturate(180%) blur(14px);border-top:1px solid var(--line);padding-bottom:env(safe-area-inset-bottom)}" +".hn-tabs .row{display:flex;align-items:stretch}" +".hn-tab{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px 4px 7px;text-decoration:none;color:var(--mut);background:none;border:0;font:inherit;cursor:pointer;min-height:56px;-webkit-tap-highlight-color:transparent}" +".hn-tab img,.hn-tab .gl{width:26px;height:26px;border-radius:7px;display:block;opacity:.62;transition:opacity .15s,transform .15s}" +".hn-tab .gl{display:flex;align-items:center;justify-content:center;font-size:19px;line-height:1;color:var(--ink2)}" +".hn-tab .lb{font-size:10.5px;font-weight:600;letter-spacing:.01em;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +".hn-tab.on{color:var(--accent)}" +".hn-tab.on img,.hn-tab.on .gl{opacity:1;transform:translateY(-1px)}" +".hn-tab.on .lb{font-weight:800}" +".hn-tab .bar{position:absolute;top:0;height:3px;border-radius:0 0 3px 3px;background:var(--accent)}" +"@media(max-width:900px){"+  ".hn-tabs{display:block}"+  "body{padding-bottom:calc(64px + env(safe-area-inset-bottom))}"+  ".hn-openbtn{display:none !important}"+  ".hn-hb{padding-left:16px}"+  ".hn{width:min(300px,86vw)}"+"}" +
    ".hn-scrim{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1199;opacity:0;pointer-events:none;transition:opacity .26s ease;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}" +"@media(max-width:900px){body.hn-open .hn-scrim{opacity:1;pointer-events:auto}}" +".hn-close{display:none;position:absolute;top:12px;right:12px;width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:18px;line-height:1;cursor:pointer;align-items:center;justify-content:center}" +"@media(max-width:900px){.hn-close{display:flex}}" +".hn{padding-top:calc(18px + env(safe-area-inset-top));padding-bottom:calc(18px + env(safe-area-inset-bottom));padding-left:calc(14px + env(safe-area-inset-left))}" +".hn-openbtn{top:calc(13px + env(safe-area-inset-top));left:calc(13px + env(safe-area-inset-left))}" +".hn-hdr{padding-top:calc(12px + env(safe-area-inset-top))}" +"html,body{max-width:100%;overflow-x:hidden;-webkit-text-size-adjust:100%;text-size-adjust:100%}" +"img,svg,video,canvas{max-width:100%;height:auto}" +"*{-webkit-tap-highlight-color:rgba(0,0,0,.06)}" +"@media(max-width:900px){"+  ".hn-link{min-height:46px;font-size:15px}"+  ".hn-acts a{padding:12px 10px;font-size:13px}"+  ".hn-site{padding:13px 12px}"+  "input,select,textarea{font-size:16px}"+  "button,.btn,.lnk,a.btn{min-height:44px}"+  "table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}"+  ".hn-hb{padding-left:60px}"+"}" +"body.hn-lock{overflow:hidden;position:relative}";
  css += "html{scrollbar-gutter:stable}*{scrollbar-width:auto;scrollbar-color:rgba(136,136,136,.62) rgba(136,136,136,.14)}::-webkit-scrollbar{width:15px;height:15px}::-webkit-scrollbar-track{background:rgba(136,136,136,.14);border-radius:10px}::-webkit-scrollbar-thumb{background:rgba(136,136,136,.62);border-radius:10px;border:3px solid transparent;background-clip:padding-box}::-webkit-scrollbar-thumb:hover{background:rgba(136,136,136,.82);border:3px solid transparent;background-clip:padding-box}::-webkit-scrollbar-thumb:active{background:rgba(136,136,136,.95);border:3px solid transparent;background-clip:padding-box}::-webkit-scrollbar-corner{background:transparent}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var logoImg = BR.logo ? ('<img class="hn-mark" src="' + esc(BR.logo) + '" alt="" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'hn-mark\',textContent:\'' + esc((BR.short || "H")[0]) + '\'}))">') : ('<span class="hn-mark">' + esc((BR.short || "H")[0]) + '</span>');
  var aside = document.createElement("aside");
  aside.className = "hn"; aside.setAttribute("aria-label", "Navigation");
  aside.innerHTML =
    '<div class="hn-top"><a class="hn-logo" href="/hub.html' + S + '">' + logoImg + '<span class="hn-word">' + esc(BR.short || BR.name) + (BR.version ? '<small class="hn-ver">' + esc(BR.version) + '</small>' : '') + '</span></a>' +
    '<button class="hn-collapse" onclick="hubToggle()" title="Collapse">&lsaquo;</button></div>' +
    '<div class="hn-tag">' + esc(BR.tagline || "") + '</div>' +
    '<nav class="hn-links" id="hnLinks"></nav>' +
    '<div class="hn-foot"><div class="hn-who" id="hnWho">Loading…</div>' +
    (BR.website
      ? '<a class="hn-site" href="' + esc(BR.website) + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3C9.4 5.6 9.4 18.4 12 21"/></svg>' +
        '<span class="t"><span class="l">' + esc(BR.websiteLabel || 'Your website') + '</span>' +
        (BR.websiteNote ? '<span class="n">' + esc(BR.websiteNote) + '</span>' : '') + '</span>' +
        '<span class="x">&#8599;</span></a>'
      : '') +
    '<div class="hn-acts"><a href="/signin.html">Switch role</a><a id="hnOut">Sign out</a></div></div>';
  var openBtn = document.createElement("button");
  openBtn.className = "hn-openbtn"; openBtn.setAttribute("aria-label", "Open menu"); openBtn.innerHTML = "&#9776;"; openBtn.onclick = function () { window.hubToggle(); };

  var tabsEl = document.createElement("nav");
  tabsEl.className = "hn-tabs"; tabsEl.setAttribute("aria-label", "Sections");

  var scrim = document.createElement("div");
  scrim.className = "hn-scrim"; scrim.onclick = function () { window.hubToggle(false); };
  var closeBtn = document.createElement("button");
  closeBtn.className = "hn-close"; closeBtn.setAttribute("aria-label", "Close menu");
  closeBtn.innerHTML = "&#10005;"; closeBtn.onclick = function () { window.hubToggle(false); };
  aside.appendChild(closeBtn);

  function mount() { document.body.appendChild(scrim); document.body.appendChild(aside); document.body.appendChild(openBtn); document.body.appendChild(tabsEl); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  // On a phone the drawer covers the page, so it needs a way out: the scrim,
  // the X, Escape, or picking a link. Before this, opening it on a phone left
  // you stuck -- the hamburger hides itself while the drawer is open.
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest(".hn-link");
    if (a && window.innerWidth <= 900) window.hubToggle(false);
  });

  window.hubToggle = function (want) {
    var open = (typeof want === "boolean") ? want : !document.body.classList.contains("hn-open");
    document.body.classList.toggle("hn-open", open);
    var phone = window.innerWidth <= 900;
    document.body.classList.toggle("hn-lock", open && phone);
  };
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("hn-open") && window.innerWidth <= 900) window.hubToggle(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) document.body.classList.remove("hn-lock");
  });
  // open by default on wide screens
  if (window.innerWidth > 900) document.body.classList.add("hn-open");

  function renderTabs(keys) {
    var here = curKey();
    var items = keys.map(function (k) { return SECTIONS.filter(function (x) { return x.k === k; })[0]; }).filter(Boolean);
    if (!items.length) { tabsEl.innerHTML = ""; return; }
    var MAXTABS = 5;
    var show = items.length > MAXTABS ? items.slice(0, MAXTABS - 1) : items;
    var more = items.length > MAXTABS;
    var html = show.map(function (sec) {
      var ic = sec.ic ? '<img alt="" src="' + esc(sec.ic) + '">' : '<span class="gl">&#9679;</span>';
      return '<a class="hn-tab' + (sec.k === here ? " on" : "") + '" href="' + sec.href + S + '">' + ic +
             '<span class="lb">' + esc(sec.label) + "</span></a>";
    }).join("");
    if (more) {
      var hereHidden = items.slice(MAXTABS - 1).some(function (x) { return x.k === here; });
      html += '<button type="button" class="hn-tab' + (hereHidden ? " on" : "") + '" onclick="hubToggle(true)">' +
              '<span class="gl">&#9776;</span><span class="lb">More</span></button>';
    }
    tabsEl.innerHTML = '<div class="row">' + html + "</div>";
  }

  function renderLinks(keys) {
    var here = curKey(), html = "", first = true;
    DEPTS.forEach(function (d) {
      var items = (d.keys || []).filter(function (k) { return keys.indexOf(k) >= 0; }).map(function (k) { return SECTIONS.filter(function (s) { return s.k === k; })[0]; }).filter(Boolean);
      if (!items.length) return;
      if (d.name) { html += '<div class="hn-dept' + (first ? " first" : "") + '">' + esc(d.name) + "</div>"; }
      items.forEach(function (s) { html += '<a class="hn-link' + (s.k === here ? " active" : "") + '" href="' + s.href + S + '"><img class="hn-ic" alt="" src="' + (s.ic || "") + '">' + esc(s.label) + "</a>"; });
      first = false;
    });
    document.getElementById("hnLinks").innerHTML = html;
    renderTabs(keys);
  }

  window.hubWho.then(function (w) {
    var roles = (w && (w.roles || (w.role ? [w.role] : []))) || [];
    var name = (w && w.name) || "";
    renderLinks(allowed(roles));
    var pr = roles.map(function (r) { return PRETTY[r] || r; }).join(" · ") || "Guest";
    var wl = document.getElementById("hnWho"); if (wl) wl.innerHTML = (name ? "<b>" + esc(name) + "</b><br>" : "") + esc(pr);
    var role = roles[0] || "guest";
    var hr = document.getElementById("hnHdrRole"); if (hr) hr.textContent = PRETTY[role] || role;
    var out = document.getElementById("hnOut"); if (out) out.onclick = function () { try { localStorage.removeItem("hub_sess"); } catch (e) {} location.href = "/signin.html"; };
  });

  // ---- inject the header on any page without its own <header> ----
  (function () {
    function buildHdr() {
      if (document.querySelector("header")) return;
      var sec = curSec();
      var ebEl = document.querySelector(".eyebrow"), h1El = document.querySelector("h1");
      var title = sec ? sec.label : ((h1El && h1El.textContent.trim()) || BR.name);
      var sub = (ebEl && ebEl.textContent.trim()) || BR.name;
      var hdr = document.createElement("header"); hdr.className = "hn-hdr";
      var hic = (sec && sec.ic) ? '<img class="hn-hic" src="' + esc(sec.ic) + '" alt="">' : '';
      hdr.innerHTML = '<div class="hn-hb">' + hic + '<div><div class="hn-htitle">' + esc(title) + '</div><div class="hn-hsub">' + esc(sub) + '</div></div><div class="hn-hsp"></div><span class="hn-hrole" id="hnHdrRole"></span></div>';
      document.body.insertBefore(hdr, document.body.firstChild);
      if (ebEl) ebEl.style.display = "none";
      if (h1El && sec && h1El.textContent.trim().toLowerCase() === sec.label.toLowerCase()) h1El.style.display = "none";
    }
    if (document.body) buildHdr(); else document.addEventListener("DOMContentLoaded", buildHdr);
  })();
})();

/* ── Connect — the hub-wide incoming-call watcher ───────────────────────────
   Rides on hub-nav.js, so it runs on EVERY room. Every 6s it asks the Connect
   backend whether anyone is ringing the signed-in seat, and pops a Join card
   wherever that person happens to be — the check-in kiosk, the schedule, payroll.
   It also badges the unread count on the Connect link in the sidebar.

   APPENDED, never spliced. The engine above is not to be patched by regex:
   a greedy match once swallowed a hub's helper functions and blanked every page.
   Identity is not asserted here — the server reads it off the session token.
   Accelerated Experiences, LLC. */
(function () {
  if (typeof document === "undefined") return;
  var TOKEN = (new URLSearchParams(location.search).get("sess")) || (function () { try { return localStorage.getItem("hub_sess") || ""; } catch (e) { return ""; } })();
  if (!TOKEN) return;                       // no seat, nothing to ring
  if (/\/meet\.html$/.test(location.pathname)) return;   // the guest door has its own engine

  function post(p) {
    return fetch("/api/connect", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.assign({ sess: TOKEN }, p)) })
      .then(function (r) { return r.json(); }).catch(function () { return { ok: false }; });
  }
  var showing = false, myName = "";
  function card(r) {
    if (showing) return; showing = true;
    var d = document.createElement("div");
    d.style.cssText = "position:fixed;right:18px;top:74px;z-index:9600;background:#2a201a;color:#fbf7f2;border-radius:14px;" +
      "padding:16px 18px;box-shadow:0 20px 60px rgba(40,25,10,.45);max-width:300px;font-family:Inter,system-ui,sans-serif;border-left:4px solid #0f9d9d";
    d.innerHTML = '<div style="font-family:Georgia,serif;font-weight:800;font-size:15.5px">' + (r.name || "Someone") + " is calling</div>" +
      '<div style="font-size:12px;color:#c3b7a7;margin:3px 0 12px">' + (r.subject || "Incoming video call") + "</div>" +
      '<button id="cnJoin" style="font:inherit;font-weight:700;background:#0f9d9d;color:#fff;border:none;border-radius:9px;padding:10px 16px;cursor:pointer">Join</button> ' +
      '<button id="cnDis" style="font:inherit;background:none;border:1px solid #6d5c4a;color:#c3b7a7;border-radius:9px;padding:10px 14px;cursor:pointer">Not now</button>';
    document.body.appendChild(d);
    function done() { try { document.body.removeChild(d); } catch (e) {} showing = false; }
    d.querySelector("#cnDis").onclick = done;
    d.querySelector("#cnJoin").onclick = function () {
      done();
      function go() { window.MomentumMeet.open({ room: r.room, displayName: myName || "Momentum", subject: r.subject || ("Call with " + (r.name || "")) }); }
      if (window.MomentumMeet) go();
      else { var sc = document.createElement("script"); sc.src = "/momentum-rtc.js"; sc.onload = go; document.head.appendChild(sc); }
    };
  }
  function badge(n) {
    var a = document.querySelector('.hn-link[href^="/connect.html"]');
    if (!a) return;
    var b = a.querySelector(".hn-ub");
    if (n > 0) {
      if (!b) { b = document.createElement("span"); b.className = "hn-ub";
        b.style.cssText = "display:inline-block;min-width:17px;text-align:center;background:#b4552e;color:#fff;border-radius:999px;font-size:10.5px;font-weight:700;padding:1px 5px;margin-left:7px";
        a.appendChild(b); }
      b.textContent = n;
    } else if (b) { b.remove(); }
  }
  function tick() {
    post({ do: "poll" }).then(function (r) {
      if (!r || !r.ok) return;                       // no KV, no seat, offline — stay quiet
      if (r.name) myName = r.name;
      if (r.ring && r.ring.room) card(r.ring);
      if (typeof r.unread === "number") badge(r.unread);
    });
  }
  setInterval(tick, 6000); setTimeout(tick, 1500);
})();

/* ============================================================================
   THE VISIT BEACON (appended Aug 26 2026 — appended, never spliced).
   One small POST per pageload so the owner's visit log in System Health can
   answer "has anyone opened this, and when?". The server records what the edge
   already knows (IP, time, rough location); the browser sends only the path,
   the referrer, and the session token so a signed-in seat gets its name on the
   row instead of "Visitor". Fire-and-forget: if it fails, the page never knows.
   ========================================================================= */
(function () {
  try {
    var t = "";
    try { t = new URLSearchParams(location.search).get("sess") || localStorage.getItem("hub_sess") || ""; } catch (e) {}
    var body = JSON.stringify({ action: "hit", path: location.pathname, ref: document.referrer || "", sess: t });
    fetch("/api/visit", { method: "POST", headers: { "content-type": "application/json" }, body: body, keepalive: true }).catch(function () {});
  } catch (e) {}
})();

/* ============================================================================
   THE OWNER'S MANUAL LOADER (appended Aug 27 2026 — appended, never spliced).
   Loads /manual.js — the ae-help-manual machine: a slide-in Guide + Ask panel
   behind a small ? button in this nav's header, on every page that has the nav.
   The manual is one self-contained file; removing this block removes it whole.
   ========================================================================= */
(function () {
  try {
    if (document.getElementById("momManual")) return;
    var s = document.createElement("script");
    s.src = "/manual.js"; s.defer = true;
    document.head.appendChild(s);
  } catch (e) {}
})();
