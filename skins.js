/* ============================================================================
   MOMENTUM SKIN MACHINE — the AE Skin Machine (aehub/skin-machine.js) adapted
   to the Hub Core var set. A "skin" is just data: pick one, the whole hub
   repaints — every room, every department accent. The choice persists on this
   device (localStorage) until the owners crown a house default.
   Load order matters: /config.js → /skins.js → /hub-nav.js.
   Accelerated Experiences, LLC.
   ============================================================================ */
(function (global) {
  "use strict";
  /* ---- color helpers (from the Skin Machine) ---- */
  function clamp(n){ return Math.max(0, Math.min(255, Math.round(n))); }
  function hx(h){ h=String(h).replace('#',''); if(h.length===3) h=h.split('').map(function(c){return c+c;}).join(''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
  function hex(r,g,b){ return '#'+[r,g,b].map(function(x){return clamp(x).toString(16).padStart(2,'0');}).join(''); }
  function mix(a,b,t){ var A=hx(a),B=hx(b); return hex(A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t); }
  function darken(c,t){ return mix(c,'#000000',t); }
  function lighten(c,t){ return mix(c,'#ffffff',t); }
  function lum(c){ var r=hx(c).map(function(v){ v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }); return 0.2126*r[0]+0.7152*r[1]+0.0722*r[2]; }
  function contrast(a,b){ var L1=lum(a),L2=lum(b),hi=Math.max(L1,L2),lo=Math.min(L1,L2); return (hi+0.05)/(lo+0.05); }
  function onColor(bg){ return contrast(bg,'#ffffff') >= contrast(bg,'#12161c') ? '#ffffff' : '#12161c'; }

  /* ---- the wardrobe: each skin carries a small core; shades are derived ----
     core = { paper, card, cream, ink, ink2, mut, line, accent, teal, deptAccents[4] } */
  var SKINS = [
    { id:"momentum-teal", name:"Momentum Teal", note:"The look you saw first — sage-teal on cool cream, straight from the Momentum brand.",
      core:{ paper:"#f5f8f8", card:"#ffffff", cream:"#e8f3f2", ink:"#0f1417", ink2:"#3b4448", mut:"#6b7780", line:"#e2e8e8",
             accent:"#0f9d9d", teal:"#14b8a6", da:["#14b8a6","#0f9d9d","#0e7490","#0891b2"] } },
    { id:"coral-pop", name:"Coral Pop", note:"Warm coral and sunshine on soft cream — playful, energetic, very Momentum.",
      core:{ paper:"#fdf7f2", card:"#ffffff", cream:"#fbeee4", ink:"#2a1a14", ink2:"#54413a", mut:"#8f7a70", line:"#efdfd3",
             accent:"#d95d43", teal:"#e8935a", da:["#d95d43","#c24a32","#b8762a","#8f5a3c"] } },
    { id:"sage-sun", name:"Sage & Sun", note:"Calm sage green with a golden accent — the garden-preschool feel.",
      core:{ paper:"#f6f8f2", card:"#ffffff", cream:"#ecf2e2", ink:"#1c2416", ink2:"#42503a", mut:"#75816a", line:"#e2ead4",
             accent:"#5c7f3f", teal:"#c99a2e", da:["#5c7f3f","#4a6b31","#7a8a2e","#c99a2e"] } },
    { id:"berry-bounce", name:"Berry Bounce", note:"Berry purple and pink — bold, cheerful, cheer-team energy.",
      core:{ paper:"#faf6fb", card:"#ffffff", cream:"#f3e9f5", ink:"#241326", ink2:"#4d3a50", mut:"#87738a", line:"#e9dcec",
             accent:"#8e4a9e", teal:"#c2558b", da:["#8e4a9e","#7a3d88","#c2558b","#5d4a9e"] } },
    { id:"sunset-tumble", name:"Sunset Tumble", note:"Clay, amber and dusk — warm and grounded, great in the evening.",
      core:{ paper:"#faf5ef", card:"#fffdf9", cream:"#f4e8da", ink:"#241a12", ink2:"#4f4234", mut:"#8a7a66", line:"#eadfcd",
             accent:"#a35c22", teal:"#c78f2e", da:["#a35c22","#8f4e1c","#a3782a","#7a5a3c"] } },
    { id:"midnight-gym", name:"Midnight Gym", note:"Dark mode — matte charcoal, glowing teal. Easy on the eyes after close.",
      dark:true,
      core:{ paper:"#15191c", card:"#1f2529", cream:"#232b30", ink:"#eef4f4", ink2:"#c4d0d2", mut:"#8da0a4", line:"#313b41", line2:"#2a3338",
             accent:"#2fc4b2", teal:"#2fc4b2", da:["#2fc4b2","#27a396","#3aa0c9","#6f8fd9"] } }
  ];

  function resolve(id){ for(var i=0;i<SKINS.length;i++) if(SKINS[i].id===id) return SKINS[i]; return SKINS[0]; }
  function toHubSkin(s){
    var c=s.core, dark=!!s.dark;
    return {
      paper:c.paper, card:c.card, cream:c.cream, ink:c.ink, ink2:c.ink2, mut:c.mut,
      line:c.line, line2:c.line2 || (dark? lighten(c.paper,0.06) : mix(c.line,'#ffffff',0.45)),
      accent:c.accent, accent2:darken(c.accent,0.16), accent3:darken(c.accent,0.32),
      onAccent:onColor(c.accent), teal:c.teal||c.accent, dark:dark
    };
  }
  var KEY="momentum:skin";
  function currentId(){ try{ return localStorage.getItem(KEY)||SKINS[0].id; }catch(e){ return SKINS[0].id; } }
  function setCurrent(id){ try{ localStorage.setItem(KEY,id); }catch(e){} }

  /* ---- apply the chosen skin into HUB_CONFIG before hub-nav.js reads it ---- */
  function applyToConfig(){
    var C=global.HUB_CONFIG; if(!C) return;
    var s=resolve(currentId());
    C.skin=toHubSkin(s);
    var da=s.core.da||[];
    (C.departments||[]).forEach(function(d,i){ if(d.accent) d.accent = da[i % Math.max(1,da.length)] || s.core.accent; });
    C.activeSkin={ id:s.id, name:s.name, dark:!!s.dark };
  }

  /* ---- live repaint (used by the picker; also fixes the sticky header) ---- */
  function applyLive(id){
    setCurrent(id); applyToConfig();
    var C=global.HUB_CONFIG, SK=C.skin;
    var r=document.documentElement.style;
    r.setProperty('--paper',SK.paper); r.setProperty('--card',SK.card); r.setProperty('--cream',SK.cream);
    r.setProperty('--ink',SK.ink); r.setProperty('--ink2',SK.ink2); r.setProperty('--mut',SK.mut);
    r.setProperty('--line',SK.line); r.setProperty('--line2',SK.line2);
    r.setProperty('--accent',SK.accent); r.setProperty('--accent2',SK.accent2); r.setProperty('--accent3',SK.accent3);
    r.setProperty('--onAccent',SK.onAccent);
  }

  global.HubSkins={ SKINS:SKINS, resolve:resolve, toHubSkin:toHubSkin, currentId:currentId, applyLive:applyLive, contrast:contrast, onColor:onColor };
  applyToConfig();
})(window);
