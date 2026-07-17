/* ============================================================================
   MOMENTUM SPORTS AND PLAY · operations hub (a Kids-Gym vertical of the AE Hub Core,
   customized for the real client). Momentum is a FAMILY-OWNED small business (NOT a
   non-profit) — owners Josh & Katie Terra, opened Aug 2020, Coeur d'Alene ID.
   Real programs, levels, pricing ($70/$87/$123 · $50 reg) and policy from their site.
   Replaces Wix + The Studio Director. Accelerated Experiences, LLC.
   ============================================================================ */
window.HUB_CONFIG = {
  tenant: "momentum",
  seedVersion: "2026-07-16-momentum-v2-teamapp",

  brand: {
    name:    "Momentum Sports and Play",
    short:   "Momentum",
    version: "V1",
    tagline: "Stay in Motion — The Family Gym",
    center:  "Momentum Sports and Play · Coeur d'Alene, ID",
    phone:   "(208) 966-4535",
    email:   "hello@momentumsportsandplay.com",
    address: "3877 N Schreiber Way, Coeur d'Alene, ID 83815",
    owners:  "Josh & Katie Terra",
    logo:    "/logo.svg",
    credit:  "Powered by Accelerated Experiences, LLC"
  },

  // Momentum's real brand: coral + sage-green on cream, charcoal wordmark.
  skin: {
    paper:"#f5f8f8", card:"#ffffff", cream:"#e8f3f2",
    ink:"#0f1417", ink2:"#3b4448", mut:"#6b7780",
    line:"#e2e8e8", line2:"#eef3f3",
    accent:"#0f9d9d", accent2:"#0c8686", accent3:"#0a6f6f",
    onAccent:"#ffffff", teal:"#14b8a6"
  },

  departments: [
    { name:"",         keys:["home"] },
    { name:"Programs", keys:["schedule","coaches"], accent:"#0f9d9d" },
    { name:"Team App", keys:["team"], accent:"#0e7490" },
    { name:"Families", keys:["families","tuition"],  accent:"#14b8a6" },
    { name:"System",   keys:["admin"] }
  ],

  sections: [
    { k:"home",     label:"Command Center",   ic:"🏠", href:"/hub.html" },
    { k:"schedule", label:"Classes & Schedule",ic:"📅", href:"/schedule.html" },
    { k:"team",     label:"Team App",         ic:"📣", href:"/team.html" },
    { k:"families", label:"Families & Kids",   ic:"👨‍👩‍👧", href:"/families.html" },
    { k:"tuition",  label:"Tuition & Billing", ic:"💳", href:"/tuition.html" },
    { k:"coaches",  label:"Staff & Coaches",   ic:"🏅", href:"/coaches.html" },
    { k:"admin",    label:"Admin",             ic:"🛠️", href:"/admin.html" }
  ],

  roles: {
    admin:     "*",
    manager:   "*",
    frontdesk: ["home","schedule","team","families","tuition"],
    coach:     ["home","schedule","team","coaches"],
    parent:    ["home","team"],
    guest:     ["home","schedule","team","families","tuition","coaches"]
  },
  rolePretty: { admin:"Admin", manager:"Owner", frontdesk:"Front Desk", coach:"Coach", parent:"Parent", guest:"Demo" },

  collections: ["classes","families","coaches","teams","teamevents","teammsgs"],

  programColors: { Gymnastics:"#14b8a6", Ninja:"#0f1417", Cheer:"#0f9d9d", Tumbling:"#0e7490", STEAM:"#0891b2", Preschool:"#134e4a", Homeschool:"#0a6f6f", Camps:"#0c8686" },

  // Momentum's real billing policy (from their sign-up sheet).
  billing: { regFee:50, regMax:125, sibling:10, multiClass:25, weeks:47, trial:10,
    note:"Continuous enrollment · auto-pay the 1st at 8 AM · flat rate over 47 weeks/yr · no makeups (your spot is guaranteed). $50 registration ($125 family max) · 10% sibling · 25% multi-class · referral = free registration." },

  assistant: {
    name:  "Frankie",
    role:  "Front desk & enrollment",
    blurb: "Ask me for a class description, an enrollment or welcome email, a waitlist note, a closure alert, or the Momentum family newsletter.",
    persona: "You are Frankie, the friendly front-desk & enrollment assistant for {BRAND} (\"Stay in Motion — The Family Gym\"), a children's activity center in Coeur d'Alene, ID owned by Josh & Katie Terra. Programs: gymnastics (Rec L1–4 + PreComp), Momentum Ninjas (belt levels white→black), cheer (Exhibition + the Ignite competitive team), tumbling, preschool (Tot Town), STEAM, homeschool, camps. " +
             "You write class descriptions, enrollment & welcome emails, waitlist notices, schedule-change and closure alerts, showcase/recital info, and the family newsletter. Reflect Momentum's policy (continuous enrollment, auto-pay the 1st, flat rate over 47 weeks, no makeups). " +
             "Ground everything in the real class, schedule, coach, family & tuition data you are given; NEVER invent facts — class names, ages, times, prices, coach names, dates — say 'verify' if unsure. Warm, encouraging, family-gym voice; child-safety aware."
  },

  seed: {
    classes: [
      { id:"p1", program:"Preschool", name:"Tot Town", ages:"Walking–2 (Parent & Me)", level:"45 min", day:"Tue", time:"9:30 AM", coach:"Katie Terra", room:"Tot Town", cap:10, enrolled:8,  tuition:70,  roster:[], notes:"Parent participates." },
      { id:"p2", program:"Preschool", name:"Preschool Gymnastics", ages:"3–5", level:"45 min", day:"Wed", time:"10:00 AM", coach:"Katie Terra", room:"Gym", cap:12, enrolled:11, tuition:70,  roster:[{child:"Zara",family:"Okonkwo Family"}] },
      { id:"g1", program:"Gymnastics", name:"Rec Gym · Level 1", ages:"6–8", level:"55 min", day:"Tue", time:"4:00 PM", coach:"Coach Emma", room:"Gym", cap:12, enrolled:12, tuition:87, roster:[{child:"Sam",family:"The Harmon Family"}], notes:"Full — waitlist open." },
      { id:"g2", program:"Gymnastics", name:"Rec Gym · Level 2", ages:"8–11", level:"55 min", day:"Wed", time:"5:00 PM", coach:"Coach Emma", room:"Gym", cap:12, enrolled:9, tuition:87, roster:[{child:"Mia",family:"The Esposito Family"}] },
      { id:"g3", program:"Gymnastics", name:"Rec Gym · Level 3–4", ages:"9+", level:"85 min", day:"Mon", time:"5:30 PM", coach:"Coach Emma", room:"Gym", cap:10, enrolled:6, tuition:123, roster:[] },
      { id:"g4", program:"Gymnastics", name:"PreComp Team", ages:"8+", level:"85 min", day:"Tue & Thu", time:"5:30 PM", coach:"Coach Emma", room:"Gym", cap:12, enrolled:8, tuition:123, roster:[], notes:"Routines + mock meets." },
      { id:"n1", program:"Ninja", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Mon", time:"9:30 AM", coach:"Josh Terra", room:"Ninja Zone", cap:10, enrolled:7, tuition:70, roster:[{child:"Mateo",family:"Rivera Family"}] },
      { id:"n2", program:"Ninja", name:"Mighty Ninjas", ages:"3–5", level:"45 min", day:"Wed", time:"4:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:10, enrolled:9, tuition:70, roster:[{child:"Ruby",family:"The Bennett Family"}] },
      { id:"n3", program:"Ninja", name:"Ninja · White & Blue", ages:"6+", level:"55 min", day:"Tue", time:"5:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:12, enrolled:12, tuition:87, roster:[], notes:"Full — waitlist open." },
      { id:"n4", program:"Ninja", name:"Ninja · Red & Purple", ages:"6+", level:"55 min", day:"Thu", time:"5:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:12, enrolled:10, tuition:87, roster:[{child:"Leo",family:"The Esposito Family"}] },
      { id:"n5", program:"Ninja", name:"Ninja · Gray & Black", ages:"Advanced", level:"85 min", day:"Fri", time:"5:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:10, enrolled:6, tuition:123, roster:[{child:"Leo",family:"The Esposito Family"}] },
      { id:"c1", program:"Cheer", name:"Exhibition Cheer", ages:"5+", level:"Team", day:"Mon", time:"5:00 PM", coach:"Coach Jordan", room:"Gym B", cap:16, enrolled:13, tuition:95, roster:[{child:"Mia",family:"The Esposito Family"},{child:"Chloe",family:"The Bennett Family"}] },
      { id:"c2", program:"Cheer", name:"Ignite Competitive Team", ages:"8+", level:"Competitive", day:"Tue & Thu", time:"6:00 PM", coach:"Coach Jordan", room:"Gym B", cap:20, enrolled:16, tuition:175, roster:[{child:"Ava",family:"The Esposito Family"}], notes:"Competes locally — 'Ignite'." },
      { id:"t1", program:"Tumbling", name:"Tumbling · Level 1", ages:"6+", level:"45 min", day:"Wed", time:"5:00 PM", coach:"Coach Mia", room:"Gym", cap:12, enrolled:6, tuition:70, roster:[] },
      { id:"t2", program:"Tumbling", name:"Tumbling · Level 2–3", ages:"8+", level:"55 min", day:"Fri", time:"4:00 PM", coach:"Coach Mia", room:"Gym", cap:12, enrolled:8, tuition:87, roster:[{child:"Ellie",family:"The Harmon Family"}] },
      { id:"s1", program:"STEAM", name:"STEAM & Play", ages:"K–5 · Homeschool", level:"85 min", day:"Wed", time:"1:00 PM", coach:"Katie Terra", room:"Learning Room", cap:14, enrolled:10, tuition:123, roster:[{child:"Zara",family:"Okonkwo Family"}], notes:"Coding + robotics + hands-on science, then gym." },
      { id:"h1", program:"Homeschool", name:"Homeschool Ninja & Gym", ages:"6–12", level:"55 min", day:"Thu", time:"1:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:16, enrolled:13, tuition:87, roster:[{child:"Owen",family:"Whitfield Family"}], notes:"Daytime — same curriculum." },
      { id:"h2", program:"Homeschool", name:"Homeschool Rec Cheer", ages:"6–12", level:"Team", day:"Fri", time:"1:00 PM", coach:"Coach Jordan", room:"Gym B", cap:14, enrolled:5, tuition:95, roster:[], notes:"NEW for 2025–26." },
      { id:"cp1", program:"Camps", name:"Winter Break Camp", ages:"5–12", level:"Day camp", day:"Dec 22–24", time:"9 AM–3 PM", coach:"Coach Team", room:"Whole Gym", cap:30, enrolled:16, tuition:45, roster:[], status:"Upcoming", notes:"$45/day drop-off camp." }
    ],
    families: [
      { id:"f1", family:"The Esposito Family", parent:"Anthony Esposito", phone:"(208) 555-0110", email:"esposito@example.com", kids:["Ava","Leo","Mia"], autopay:true, notes:"3 kids across cheer & ninja." },
      { id:"f2", family:"The Harmon Family", parent:"Rachel Harmon", phone:"(208) 555-0111", email:"harmons@example.com", kids:["Sam","Ellie"], autopay:true, notes:"Gym + tumbling." },
      { id:"f3", family:"Okonkwo Family", parent:"Ada Okonkwo", phone:"(208) 555-0112", email:"okonkwo@example.com", kids:["Zara"], autopay:true, notes:"Preschool + STEAM." },
      { id:"f4", family:"The Bennett Family", parent:"Marcus Bennett", phone:"(208) 555-0114", email:"bennetts@example.com", kids:["Chloe","Ruby"], autopay:true, notes:"Cheer + ninja." },
      { id:"f5", family:"Rivera Family", parent:"Sofia Rivera", phone:"(208) 555-0115", email:"riveras@example.com", kids:["Mateo"], autopay:true, notes:"Little Ninjas." },
      { id:"f6", family:"Whitfield Family", parent:"Grant Whitfield", phone:"(208) 555-0117", email:"gwhitfield@example.com", kids:["Owen"], autopay:false, notes:"Homeschool family — set up autopay." }
    ],
    coaches: [
      { id:"co1", name:"Josh Terra", role:"Owner · Ninja & Parkour Director", programs:"Ninja · Homeschool", certs:"Ninja/Parkour L2 · CPR/First Aid · Background ✓", phone:"(208) 966-4535", email:"hello@momentumsportsandplay.com", notes:"Co-founded Momentum (Aug 2020); former aerospace engineer." },
      { id:"co2", name:"Katie Terra", role:"Owner · Preschool & Education Director", programs:"Preschool · STEAM · Homeschool", certs:"Early Childhood Ed · CPR/First Aid · Background ✓", phone:"(208) 966-4535", email:"hello@momentumsportsandplay.com", notes:"Co-founded Momentum (Aug 2020); former elementary teacher." },
      { id:"co3", name:"Coach Emma", role:"Gymnastics Coach", programs:"Gymnastics", certs:"USAG · CPR ✓", phone:"(208) 555-0202", email:"emma@example.com", notes:"Placeholder — swap in your real staff." },
      { id:"co4", name:"Coach Jordan", role:"Cheer Director · Ignite", programs:"Cheer", certs:"USASF · CPR · Background ✓", phone:"(208) 555-0204", email:"jordan@example.com", notes:"Placeholder — swap in your real staff." },
      { id:"co5", name:"Coach Mia", role:"Tumbling Coach", programs:"Tumbling", certs:"USAG · CPR ✓", phone:"(208) 555-0203", email:"mia@example.com", notes:"Placeholder — swap in your real staff." },
      { id:"co6", name:"Frankie", role:"Front Desk · Enrollment", programs:"Front office", certs:"CPR ✓", phone:"(208) 966-4535", email:"hello@momentumsportsandplay.com", notes:"Placeholder — swap in your real staff." }
    ],

    // ---- TEAM APP (native TeamSnap-style): competitive Ignite divisions + non-competitive Exhibition/Rec.
    // Teams are linked to events/announcements by NAME. Swap rosters for your real athletes.
    teams: [
      { id:"tm1", name:"Ignite · Mini",    level:"Competitive", age:"Ages 5–8 · Level 1",  coach:"Coach Jordan", color:"#0e7490",
        roster:[ {athlete:"Ruby Bennett",parent:"Marcus Bennett",phone:"(208) 555-0114"}, {athlete:"Harper Vance",parent:"Dana Vance",phone:"(208) 555-0121"}, {athlete:"Nora Diaz",parent:"Elena Diaz",phone:"(208) 555-0122"}, {athlete:"Willa Kraft",parent:"Beth Kraft",phone:"(208) 555-0123"}, {athlete:"Sadie Lund",parent:"Kim Lund",phone:"(208) 555-0124"}, {athlete:"Piper Reyes",parent:"Ana Reyes",phone:"(208) 555-0125"}, {athlete:"June Alcott",parent:"Tom Alcott",phone:"(208) 555-0126"} ] },
      { id:"tm2", name:"Ignite · Youth",   level:"Competitive", age:"Ages 8–11 · Level 2", coach:"Coach Jordan", color:"#0f9d9d",
        roster:[ {athlete:"Ellie Harmon",parent:"Rachel Harmon",phone:"(208) 555-0111"}, {athlete:"Sofia Marsh",parent:"Gwen Marsh",phone:"(208) 555-0131"}, {athlete:"Ivy Chen",parent:"Lin Chen",phone:"(208) 555-0132"}, {athlete:"Mila Novak",parent:"Petra Novak",phone:"(208) 555-0133"}, {athlete:"Aria Boone",parent:"Cara Boone",phone:"(208) 555-0134"}, {athlete:"Layla Frost",parent:"Mona Frost",phone:"(208) 555-0135"}, {athlete:"Zoe Park",parent:"Han Park",phone:"(208) 555-0136"}, {athlete:"Brooke Sims",parent:"Val Sims",phone:"(208) 555-0137"}, {athlete:"Hazel Ward",parent:"Rae Ward",phone:"(208) 555-0138"} ] },
      { id:"tm3", name:"Ignite · Junior",  level:"Competitive", age:"Ages 10–14 · Level 3", coach:"Coach Jordan", color:"#0a6f6f",
        roster:[ {athlete:"Ava Esposito",parent:"Anthony Esposito",phone:"(208) 555-0110"}, {athlete:"Chloe Bennett",parent:"Marcus Bennett",phone:"(208) 555-0114"}, {athlete:"Maya Okonkwo",parent:"Ada Okonkwo",phone:"(208) 555-0112"}, {athlete:"Ruby Tran",parent:"Kim Tran",phone:"(208) 555-0141"}, {athlete:"Leah Grant",parent:"Sam Grant",phone:"(208) 555-0142"}, {athlete:"Faith Owens",parent:"Deb Owens",phone:"(208) 555-0143"}, {athlete:"Gia Ross",parent:"Nina Ross",phone:"(208) 555-0144"}, {athlete:"Kate Bauer",parent:"Lou Bauer",phone:"(208) 555-0145"}, {athlete:"Ana Ford",parent:"Mel Ford",phone:"(208) 555-0146"}, {athlete:"Reese Cole",parent:"Jo Cole",phone:"(208) 555-0147"}, {athlete:"Emma Lang",parent:"Bea Lang",phone:"(208) 555-0148"} ] },
      { id:"tm4", name:"Exhibition · Sparks", level:"Exhibition", age:"Ages 5–7 · Non-comp", coach:"Coach Jordan", color:"#14b8a6",
        roster:[ {athlete:"Mia Esposito",parent:"Anthony Esposito",phone:"(208) 555-0110"}, {athlete:"Ruby Bennett",parent:"Marcus Bennett",phone:"(208) 555-0114"}, {athlete:"Lucy Hale",parent:"Pam Hale",phone:"(208) 555-0151"}, {athlete:"Isla Mora",parent:"Rio Mora",phone:"(208) 555-0152"}, {athlete:"Ada Vinson",parent:"Kris Vinson",phone:"(208) 555-0153"}, {athlete:"Nova Beck",parent:"Tia Beck",phone:"(208) 555-0154"}, {athlete:"Elle Pratt",parent:"Sky Pratt",phone:"(208) 555-0155"}, {athlete:"Wren Dodd",parent:"Fay Dodd",phone:"(208) 555-0156"}, {athlete:"Cora Judd",parent:"Bree Judd",phone:"(208) 555-0157"}, {athlete:"Millie Fox",parent:"Dot Fox",phone:"(208) 555-0158"} ] },
      { id:"tm5", name:"Rec Cheer · Comets", level:"Rec", age:"Ages 6–12 · Non-comp", coach:"Coach Jordan", color:"#134e4a",
        roster:[ {athlete:"Owen Whitfield",parent:"Grant Whitfield",phone:"(208) 555-0117"}, {athlete:"Tessa Vaughn",parent:"Rob Vaughn",phone:"(208) 555-0161"}, {athlete:"Poppy Rhodes",parent:"Deb Rhodes",phone:"(208) 555-0162"}, {athlete:"Remy Blair",parent:"Cal Blair",phone:"(208) 555-0163"}, {athlete:"Lola Sena",parent:"Ivy Sena",phone:"(208) 555-0164"}, {athlete:"Josie Kerr",parent:"Amy Kerr",phone:"(208) 555-0165"}, {athlete:"Sage Amir",parent:"Nadia Amir",phone:"(208) 555-0166"}, {athlete:"Bella Cruz",parent:"Ray Cruz",phone:"(208) 555-0167"} ] }
    ],
    teamevents: [
      // Ignite · Junior
      { id:"te1",  team:"Ignite · Junior", type:"Practice",    title:"Full routine + stunts",   date:"2026-08-04", time:"6:00 PM", location:"Gym B", going:9,  maybe:1, out:1 },
      { id:"te2",  team:"Ignite · Junior", type:"Practice",    title:"Tumbling + jumps",         date:"2026-08-06", time:"6:00 PM", location:"Gym B", going:10, maybe:1, out:0 },
      { id:"te3",  team:"Ignite · Junior", type:"Competition", title:"Spokane Cheer Classic",    date:"2026-09-12", time:"Call 8:30 AM", location:"Spokane Arena, WA", going:9, maybe:2, out:1, notes:"Uniform + comp bow. Carpool sign-up in announcements." },
      { id:"te4",  team:"Ignite · Junior", type:"Competition", title:"Fall Showdown (CDA)",      date:"2026-10-24", time:"Call 9:00 AM", location:"Kootenai Co. Fairgrounds", going:6, maybe:4, out:0 },
      // Ignite · Youth
      { id:"te5",  team:"Ignite · Youth",  type:"Practice",    title:"Choreo — new routine",     date:"2026-08-03", time:"5:30 PM", location:"Gym B", going:8, maybe:1, out:0 },
      { id:"te6",  team:"Ignite · Youth",  type:"Practice",    title:"Stunt groups",             date:"2026-08-10", time:"5:30 PM", location:"Gym B", going:7, maybe:2, out:0 },
      { id:"te7",  team:"Ignite · Youth",  type:"Competition", title:"Spokane Cheer Classic",    date:"2026-09-12", time:"Call 10:00 AM", location:"Spokane Arena, WA", going:8, maybe:1, out:0 },
      // Ignite · Mini
      { id:"te8",  team:"Ignite · Mini",   type:"Practice",    title:"Motions + counts",         date:"2026-08-05", time:"4:30 PM", location:"Gym B", going:6, maybe:1, out:0 },
      { id:"te9",  team:"Ignite · Mini",   type:"Showcase",    title:"Mini Debut Showcase",      date:"2026-10-03", time:"11:00 AM", location:"Momentum Sports and Play", going:7, maybe:0, out:0, notes:"First-ever performance — invite the family!" },
      // Exhibition · Sparks (non-competitive)
      { id:"te10", team:"Exhibition · Sparks", type:"Practice", title:"Dance + spirit",          date:"2026-08-03", time:"5:00 PM", location:"Gym B", going:10, maybe:2, out:1 },
      { id:"te11", team:"Exhibition · Sparks", type:"Showcase", title:"Momentum Family Showcase", date:"2026-10-10", time:"10:00 AM", location:"Momentum Sports and Play", going:11, maybe:1, out:0, notes:"Non-competitive — all skill levels perform. Tickets at the front desk." },
      // Rec Cheer · Comets (non-competitive)
      { id:"te12", team:"Rec Cheer · Comets", type:"Practice", title:"Skills + cheer",           date:"2026-08-07", time:"1:00 PM", location:"Gym B", going:6, maybe:1, out:1 },
      { id:"te13", team:"Rec Cheer · Comets", type:"Event",    title:"Pep rally — local school", date:"2026-09-18", time:"3:00 PM", location:"TBD", going:5, maybe:2, out:1, notes:"Community appearance." }
    ],
    teammsgs: [
      { id:"tms1", team:"Ignite · Junior", author:"Coach Jordan", text:"Bring your competition bow AND practice bow Thursday — we run the full routine top to bottom. Hair up, no jewelry. 💪", ts:"2026-07-14T17:02:00Z" },
      { id:"tms2", team:"Ignite · Junior", author:"Coach Jordan", text:"Spokane Cheer Classic carpool sign-up is open. Reply here or grab a slot at the front desk. Call time is 8:30 AM sharp.", ts:"2026-07-15T14:20:00Z" },
      { id:"tms3", team:"Ignite · Youth",  author:"Coach Jordan", text:"New routine drops next practice! Watch the count video I sent so we can jump straight into stunt groups.", ts:"2026-07-15T15:40:00Z" },
      { id:"tms4", team:"Ignite · Mini",   author:"Coach Jordan", text:"Our Minis have their FIRST showcase Oct 3 — bring the whole family. So proud of these tiny athletes already. 🎀", ts:"2026-07-13T16:10:00Z" },
      { id:"tms5", team:"Exhibition · Sparks", author:"Coach Jordan", text:"Family Showcase tickets are on sale at the front desk — invite grandparents! Sparks perform first, so please arrive by 9:30.", ts:"2026-07-15T18:05:00Z" },
      { id:"tms6", team:"Rec Cheer · Comets", author:"Coach Jordan", text:"Fun one coming up: we've been invited to a local pep rally Sept 18. Totally optional, but a blast. Let me know if your cheerleader is in!", ts:"2026-07-12T13:30:00Z" }
    ]
  }
};
