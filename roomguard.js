/* ROOM GUARD — Momentum OS. Accelerated Experiences, LLC.
   The nav decides which rooms a seat is OFFERED. This decides which rooms a seat
   may actually OPEN. Without it, typing a URL walks straight past the sidebar —
   which is exactly how a parent once got served the owner's cockpit.

   FAILS CLOSED, deliberately, twice over:
     - it assumes the most restricted role until /api/auth says otherwise, and
     - if the who-am-I call errors, it stays restricted rather than opening up.
   A page that shows children's names must call this before it renders anything. */
(function (global) {
  "use strict";
  var C = global.HUB_CONFIG || {};
  var ROLES = C.roles || {};
  var PRIV = C.privacy || {};
  var MOST_RESTRICTED = "parent";

  function allowed(role, key) {
    var list = ROLES[role];
    if (list === "*") return true;
    return Array.isArray(list) && list.indexOf(key) >= 0;
  }

  function blockPage(role, key) {
    var pretty = (C.rolePretty || {})[role] || role;
    var css = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;" +
      "background:var(--paper,#fbf7f2);color:var(--ink,#2a201a);font-family:Inter,system-ui,sans-serif";
    var box = "max-width:430px;text-align:center;background:var(--card,#fff);border:1px solid var(--line,#e6ded3);" +
      "border-radius:16px;padding:30px 28px;box-shadow:0 10px 30px rgba(80,50,20,.10)";
    var d = document.createElement("div");
    d.setAttribute("style", css);
    d.innerHTML = '<div style="' + box + '">' +
      '<div style="font-family:Georgia,serif;font-weight:800;font-size:21px;margin-bottom:8px">This room isn\'t yours</div>' +
      '<div style="font-size:14.5px;line-height:1.6;color:var(--mut,#8a7a68)">You\'re signed in as <b>' + pretty + '</b>, and this page holds other families\' information. ' +
      'That\'s on purpose — nobody sees another family\'s children here.</div>' +
      '<div style="margin-top:18px"><a href="/hub.html" style="display:inline-block;background:var(--accent,#0f9d9d);color:var(--onAccent,#fff);' +
      'text-decoration:none;border-radius:10px;padding:11px 20px;font-weight:700;font-family:Georgia,serif">Back to your home page</a></div></div>';
    // hide the real page rather than merely covering it
    var w = document.querySelector(".wrap"); if (w) w.style.display = "none";
    document.body.appendChild(d);
  }

  /* key: the section key from HUB_CONFIG.sections. cb runs only if the seat may be here. */
  global.RoomGuard = function (key, cb) {
    var go = function (role) {
      global.MY_ROLE = role;
      global.MY_ROLES = [role];
      if (!allowed(role, key)) { blockPage(role, key); return; }
      if (typeof cb === "function") cb(role, {
        readOnly: (PRIV.readOnlyFor || []).indexOf(role) >= 0,
        hideNames: (PRIV.hideChildNamesFrom || []).indexOf(role) >= 0
      });
    };
    var p = global.hubWho;
    if (!p || typeof p.then !== "function") { go(MOST_RESTRICTED); return; }
    p.then(function (w) {
      var r = (w && (w.role || (w.roles && w.roles[0]))) || MOST_RESTRICTED;
      go(r);
    }).catch(function () { go(MOST_RESTRICTED); });
  };
})(window);
