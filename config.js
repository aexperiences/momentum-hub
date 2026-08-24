/* ============================================================================
   MOMENTUM SPORTS AND PLAY · operations hub (a Kids-Gym vertical of the AE Hub Core,
   customized for the real client). Momentum is a FAMILY-OWNED small business (NOT a
   non-profit) — owners Josh & Katie Terra, opened Aug 2020, Coeur d'Alene ID.
   Real programs, levels, pricing ($70/$87/$123 · $50 reg) and policy from their site.
   Replaces Wix + The Studio Director. Accelerated Experiences, LLC.
   ============================================================================ */
window.HUB_CONFIG = {
  tenant: "momentum",
  seedVersion: "2026-08-24-momentum-v12-hall-of-records",

  brand: {
    name:    "Momentum Sports and Play",
    product: "Momentum OS Grand Suite V2.1",
    short:   "Momentum",
    version: "Grand Suite V2.1",
    tagline: "Stay in Motion — The Family Gym",
    center:  "Momentum Sports and Play · Coeur d'Alene, ID",
    phone:   "(208) 966-4535",
    email:   "hello@momentumsportsandplay.com",
    address: "3877 N Schreiber Way, Coeur d'Alene, ID 83815",
    owners:  "Josh & Katie Terra",
    website:      "https://momentum-site-accelerated-experiences.vercel.app",
    websiteLabel: "Your website",
    websiteNote:  "What families see",
    logo:    "/icons/momentum-mark.svg",
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
    { name:"",           keys:["home"] },
    { name:"Front Desk", keys:["desk","checkin","enroll","funnel"], accent:"#14b8a6" },
    { name:"Programs",   keys:["schedule","studio","pathway","coaches"], accent:"#0f9d9d" },
    { name:"Team App",   keys:["team"], accent:"#0e7490" },
    { name:"Families",   keys:["families","parties"],  accent:"#14b8a6" },
    { name:"Money",      keys:["tuition","books","payroll"], accent:"#0f9d9d" },
    { name:"People & Safety", keys:["timeclock","hr","law","approvals"], accent:"#0a6f6f" },
    { name:"System",     keys:["comply","it","org","bring","records"], accent:"#0891b2" },
    { name:"Your Gym, Your Look", keys:["skins"], accent:"#0f9d9d" }
  ],

  sections: [
    { k:"home",     label:"Command Center",    ic:"/icons/command-center.svg", href:"/hub.html",      ds:"Everything you run, in one place" },
    { k:"checkin",  label:"Check-in & Attendance", ic:"/icons/checkin.svg", href:"/checkin.html", ds:"One-tap front-desk check-in and the floor log" },
    { k:"enroll",   label:"Enrollment & Waitlists", ic:"/icons/enroll.svg", href:"/enroll.html", ds:"Waitlist queues and one-click promotion" },
    { k:"funnel",   label:"Growth Funnel",     ic:"/icons/funnel.svg", href:"/funnel.html",   ds:"Every lead from first click to enrolled" },
    { k:"schedule", label:"Classes & Schedule", ic:"/icons/schedule.svg", href:"/schedule.html", ds:"Every class, roster and fill rate" },
    { k:"studio",   label:"Floor Studio",      ic:"/icons/studio.svg", href:"/studio.html",   ds:"Rooms, rotations and the level ladders" },
    { k:"team",     label:"Team App",          ic:"/icons/team.svg", href:"/team.html",     ds:"Rosters, travel and team messages" },
    { k:"families", label:"Families & Kids",   ic:"/icons/families.svg", href:"/families.html", ds:"Every family, every kid, autopay status" },
    { k:"tuition",  label:"Tuition & Billing", ic:"/icons/tuition.svg", href:"/tuition.html",  ds:"Continuous enrollment, autopay the 1st" },
    { k:"books",    label:"Books & Margins",   ic:"/icons/books.svg", href:"/books.html",    ds:"Revenue, expenses and true margins" },
    { k:"payroll",  label:"Timesheets & Payroll", ic:"/icons/payroll.svg", href:"/payroll.html", ds:"Clocked hours \u2192 approved week \u2192 gross pay" },
    { k:"coaches",  label:"Staff & Coaches",   ic:"/icons/coaches.svg", href:"/coaches.html",  ds:"Your team and their programs" },
    { k:"timeclock",label:"Time Clock",          ic:"/icons/timeclock.svg", href:"/timeclock.html", ds:"Tap in, tap out \u2014 the front-desk clock" },
    { k:"hr",       label:"HR & Certifications", ic:"/icons/hr.svg", href:"/hr.html",     ds:"Certs, expirations, payroll and onboarding" },
    { k:"law",      label:"Waivers & Safety",  ic:"/icons/law.svg", href:"/law.html",      ds:"The waiver docket and the incident log" },
    { k:"approvals",label:"Approval Desk",     ic:"/icons/approvals.svg", href:"/approvals.html", ds:"Refunds, discounts and changes — owner signs" },
    { k:"comply",   label:"Comply · Trust Center", ic:"/icons/comply.svg", href:"/comply.html", ds:"Live domain checks + sealed evidence chain" },
    { k:"it",       label:"System Health",     ic:"/icons/it.svg", href:"/it.html",       ds:"Every system Momentum runs on, one board" },
    { k:"org",      label:"AI Staff",          ic:"/icons/org.svg", href:"/org.html",      ds:"Frankie on duty — and the org that scales" },
    { k:"desk",     label:"The Desk Today",    ic:"/icons/desk.svg", href:"/desk.html",     ds:"Who is here, who is late, who is waiting \u2014 right now" },
    { k:"pathway",  label:"Skill Pathways",    ic:"/icons/pathway.svg", href:"/pathway.html",  ds:"Every level, and what each kid is working toward" },
    { k:"parties",  label:"Parties & Rooms",   ic:"/icons/parties.svg", href:"/parties.html", ds:"Every booking against a room \u2014 no double-bookings" },
    { k:"bring",    label:"Bring Your Data",   ic:"/icons/bring.svg", href:"/import.html",   ds:"Your roster, imported in about a minute" },
    { k:"records",  label:"Hall of Records",   ic:"/icons/records.svg", href:"/records.html", ds:"Flyers, printouts and forms \u2014 kept, and private" },
    { k:"skins",    label:"Choose Your Look",  ic:"/icons/skins.svg", href:"/skins.html",    ds:"Six looks, made for Momentum — tap one, the whole hub repaints" }
  ],

  roles: {
    admin:     "*",
    manager:   "*",
    frontdesk: ["home","desk","checkin","enroll","funnel","schedule","pathway","team","families","parties","tuition","timeclock","records","skins"],
    coach:     ["home","desk","checkin","schedule","studio","pathway","team","coaches","hr","timeclock","records"],
    trainee:   ["home","checkin","schedule","studio","pathway","timeclock"],
    teacher:   ["home","checkin","schedule","studio","pathway","team","timeclock","records"],
    parent:    ["home","team"],
    guest:     "*"
  },
  rolePretty: { admin:"Admin (AE · IT)", manager:"Owner", frontdesk:"Front Desk", coach:"Coach", trainee:"Coach-in-Training", teacher:"Teacher", parent:"Parent", guest:"Demo" },

  // ---- CHILD PRIVACY -------------------------------------------------
  // A parent must never be handed a list of other people's children. Momentum's
  // existing system does not do it, and there are real reasons for that:
  // custody arrangements, safety plans, and families who simply did not consent
  // to being in a directory. Any role listed here sees counts, never names, and
  // never another family's contact details. Staff roles are unaffected.
  privacy: {
    hideChildNamesFrom: ["parent"],
    hideContactsFrom:   ["parent"],
    readOnlyFor:        ["parent"],
    note: "Names are hidden here on purpose. Coaches and the front desk see the full roster."
  },

  collections: ["classes","families","coaches","teams","teamevents","teammsgs","expenses","attendance","waitlist","leads","hrrecords","waivers","incidents","approvals","systems","evidence","kids","visits","offers","rooms","bookings","ladders","punches","payperiods"],

  programColors: { Gymnastics:"#12968f", Ninja:"#b8461f", Cheer:"#dda12e", Tumbling:"#9b4fd0", STEAM:"#1f6fa8", Preschool:"#d4608c", Homeschool:"#6f9a30", Camps:"#2f8fbf", "Open Gym":"#7a8a94" },

  // Momentum's real billing policy (from their sign-up sheet).
  billing: { regFee:50, regMax:125, sibling:10, multiClass:25, weeks:47, trial:10,
    rates: { "45 min":70, "55 min":87, "85 min":123 },
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
      // Momentum's real Fall 2026 schedule -- every class name, day, time and age
      // is theirs, transcribed from the grid on their own enrolment page. Duration
      // and tuition are filled only where their published tiers cover it. Enrolment
      // counts are sample data: they do not publish them, and the hub says so.
      { id:"c001", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Mon", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c002", program:"Preschool", name:"Preschool Learn & Play", ages:"3–5 · potty trained · drop-off", level:"", day:"Mon", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:0, roster:[] },
      { id:"c003", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Mon", time:"11:00 AM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c004", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Mon", time:"3:00 PM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c005", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Mon", time:"3:00 PM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c006", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Mon", time:"4:00 PM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c007", program:"Gymnastics", name:"Super Kids L1", ages:"5+", level:"55 min", day:"Mon", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:7, tuition:87, roster:[] },
      { id:"c008", program:"Ninja", name:"Ninja White (6-8)", ages:"6-8", level:"55 min", day:"Mon", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c009", program:"Ninja", name:"Ninja White (8+)", ages:"8+", level:"55 min", day:"Mon", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c010", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Mon", time:"5:05 PM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c011", program:"Gymnastics", name:"Hot Shots L2 (6-8)", ages:"6-8", level:"55 min", day:"Mon", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c012", program:"Ninja", name:"Ninja White (6-8)", ages:"6-8", level:"55 min", day:"Mon", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c013", program:"Tumbling", name:"Tumbling 4", ages:"6+", level:"55 min", day:"Mon", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c014", program:"Cheer", name:"Embers Cheer", ages:"", level:"", day:"Mon", time:"6:00 PM", coach:"", room:"", cap:16, enrolled:8, tuition:0, roster:[] },
      { id:"c015", program:"Ninja", name:"Tricking", ages:"Back tuck required", level:"55 min", day:"Mon", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c016", program:"Gymnastics", name:"Gym Kids L1", ages:"5+", level:"55 min", day:"Mon", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c017", program:"Gymnastics", name:"Super Kids L1", ages:"5+", level:"55 min", day:"Mon", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c018", program:"Cheer", name:"Flare", ages:"", level:"", day:"Mon", time:"4:00–5:30 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:10, tuition:0, roster:[] },
      { id:"c019", program:"Cheer", name:"Ignite", ages:"", level:"", day:"Mon", time:"5:30–7:00 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:8, tuition:0, roster:[] },
      { id:"c020", program:"Preschool", name:"Minis", ages:"Walking–3 (parent & me)", level:"45 min", day:"Tue", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c021", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Tue", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:8, tuition:70, roster:[], notes:"Full \u2014 waitlist open." },
      { id:"c022", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Tue", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:3, tuition:70, roster:[] },
      { id:"c023", program:"Homeschool", name:"HS Ninja White (6+)", ages:"5+ (homeschool)", level:"55 min", day:"Tue", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:6, tuition:87, roster:[] },
      { id:"c024", program:"Homeschool", name:"HS Gymnastics L1", ages:"5+ (homeschool)", level:"55 min", day:"Tue", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:3, tuition:87, roster:[] },
      { id:"c025", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Tue", time:"11:05 AM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c026", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Tue", time:"11:05 AM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c027", program:"Homeschool", name:"HS Ninja White/Blue L1-2", ages:"5+ (homeschool)", level:"55 min", day:"Tue", time:"11:05 AM", coach:"", room:"", cap:8, enrolled:5, tuition:87, roster:[] },
      { id:"c028", program:"Homeschool", name:"HS Tumbling", ages:"5+ (homeschool)", level:"55 min", day:"Tue", time:"11:05 AM", coach:"", room:"", cap:8, enrolled:5, tuition:87, roster:[] },
      { id:"c029", program:"STEAM", name:"STEAM", ages:"", level:"", day:"Tue", time:"12:30 PM", coach:"", room:"", cap:12, enrolled:8, tuition:0, roster:[] },
      { id:"c030", program:"STEAM", name:"STEAM", ages:"", level:"", day:"Tue", time:"1:45 PM", coach:"", room:"", cap:12, enrolled:9, tuition:0, roster:[] },
      { id:"c031", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Tue", time:"3:00 PM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c032", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Tue", time:"4:00 PM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c033", program:"Ninja", name:"Ninja White (6-8)", ages:"6-8", level:"55 min", day:"Tue", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c034", program:"Tumbling", name:"Tumbling 3", ages:"6+", level:"55 min", day:"Tue", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:7, tuition:87, roster:[] },
      { id:"c035", program:"Tumbling", name:"Tumbling 4", ages:"6+", level:"55 min", day:"Tue", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c036", program:"Gymnastics", name:"Firecrackers", ages:"5+", level:"55 min", day:"Tue", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c037", program:"Gymnastics", name:"Super Kids L1", ages:"5+", level:"55 min", day:"Tue", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c038", program:"Tumbling", name:"Tumbling 1-2", ages:"6+", level:"55 min", day:"Tue", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c039", program:"Ninja", name:"Ninja White (6-8)", ages:"6-8", level:"55 min", day:"Tue", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c040", program:"Tumbling", name:"Dynamites L4", ages:"6+", level:"55 min", day:"Tue", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c041", program:"Tumbling", name:"Tumbling 3", ages:"6+", level:"55 min", day:"Tue", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c042", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Tue", time:"6:10 PM", coach:"", room:"", cap:8, enrolled:3, tuition:70, roster:[] },
      { id:"c043", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Tue", time:"6:10 PM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c044", program:"Gymnastics", name:"Gym Kids L1", ages:"5+", level:"55 min", day:"Tue", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c045", program:"Gymnastics", name:"Hot Shots L2", ages:"5+", level:"55 min", day:"Tue", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c046", program:"Tumbling", name:"Tumbling 1-2", ages:"6+", level:"55 min", day:"Tue", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c047", program:"Cheer", name:"Novas", ages:"", level:"", day:"Tue", time:"4:00–6:00 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:9, tuition:0, roster:[] },
      { id:"c048", program:"Cheer", name:"Flash", ages:"", level:"", day:"Tue", time:"6:00–7:15 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:12, tuition:0, roster:[] },
      { id:"c049", program:"Preschool", name:"Minis", ages:"Walking–3 (parent & me)", level:"45 min", day:"Wed", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c050", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Wed", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c051", program:"Preschool", name:"Preschool Learn & Play", ages:"3–5 · potty trained · drop-off", level:"", day:"Wed", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:0, roster:[] },
      { id:"c052", program:"STEAM", name:"STEAM & Play", ages:"Grades K–2", level:"", day:"Wed", time:"10:00 AM", coach:"", room:"", cap:12, enrolled:7, tuition:0, roster:[] },
      { id:"c053", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Wed", time:"3:00 PM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c054", program:"Ninja", name:"Ninja Blue", ages:"6+", level:"55 min", day:"Wed", time:"3:00 PM", coach:"", room:"", cap:10, enrolled:10, tuition:87, roster:[], notes:"Full \u2014 waitlist open." },
      { id:"c055", program:"Preschool", name:"Mighty Movers", ages:"Invitation only", level:"45 min", day:"Wed", time:"4:00 PM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c056", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Wed", time:"4:00 PM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c057", program:"Tumbling", name:"Tumbling 1-2", ages:"6+", level:"55 min", day:"Wed", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:7, tuition:87, roster:[] },
      { id:"c058", program:"Tumbling", name:"Tumbling 3", ages:"6+", level:"55 min", day:"Wed", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c059", program:"Gymnastics", name:"Gym Kids L1", ages:"5+", level:"55 min", day:"Wed", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c060", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Wed", time:"5:05 PM", coach:"", room:"", cap:8, enrolled:8, tuition:70, roster:[], notes:"Full \u2014 waitlist open." },
      { id:"c061", program:"Gymnastics", name:"Gym Kids L1", ages:"5+", level:"55 min", day:"Wed", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c062", program:"Ninja", name:"Ninja White (6-8)", ages:"6-8", level:"55 min", day:"Wed", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:7, tuition:87, roster:[] },
      { id:"c063", program:"Ninja", name:"Ninja Red L3", ages:"6+", level:"55 min", day:"Wed", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c064", program:"Tumbling", name:"Tumbling 4", ages:"6+", level:"55 min", day:"Wed", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c065", program:"Ninja", name:"Ninja Blue L2", ages:"6+", level:"55 min", day:"Wed", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:7, tuition:87, roster:[] },
      { id:"c066", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Wed", time:"6:10 PM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c067", program:"Cheer", name:"Flare", ages:"", level:"", day:"Wed", time:"4:00–5:30 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:12, tuition:0, roster:[] },
      { id:"c068", program:"Cheer", name:"Ignite", ages:"", level:"", day:"Wed", time:"5:30–7:00 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:16, tuition:0, roster:[], notes:"Full \u2014 waitlist open." },
      { id:"c069", program:"Preschool", name:"Minis", ages:"Walking–3 (parent & me)", level:"45 min", day:"Thu", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c070", program:"Preschool", name:"Mighty Movers+", ages:"Invitation only", level:"45 min", day:"Thu", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c071", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Thu", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c072", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Thu", time:"10:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c073", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Thu", time:"11:00 AM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c074", program:"Gymnastics", name:"Gymnastics L1", ages:"5+", level:"55 min", day:"Thu", time:"11:00 AM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c075", program:"Gymnastics", name:"Hot Shots L2", ages:"5+", level:"55 min", day:"Thu", time:"11:00 AM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c076", program:"Ninja", name:"Ninja White/Blue L1-2", ages:"6+", level:"55 min", day:"Thu", time:"11:00 AM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c077", program:"Ninja", name:"Ninja Red L3", ages:"6+", level:"75 min", day:"Thu", time:"11:30 AM", coach:"", room:"", cap:10, enrolled:6, tuition:0, roster:[] },
      { id:"c078", program:"STEAM", name:"STEAM", ages:"", level:"", day:"Thu", time:"1:00 PM", coach:"", room:"", cap:12, enrolled:9, tuition:0, roster:[] },
      { id:"c079", program:"Preschool", name:"Movers", ages:"3–5", level:"45 min", day:"Thu", time:"3:00 PM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c080", program:"Preschool", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Thu", time:"4:00 PM", coach:"", room:"", cap:8, enrolled:4, tuition:70, roster:[] },
      { id:"c081", program:"Gymnastics", name:"Hot Shots L2 (6-8)", ages:"6-8", level:"55 min", day:"Thu", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c082", program:"Ninja", name:"Ninja (8+)", ages:"8+", level:"55 min", day:"Thu", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c083", program:"Tumbling", name:"Tumbling 4", ages:"6+", level:"55 min", day:"Thu", time:"4:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c084", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Thu", time:"5:05 PM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c085", program:"Preschool", name:"Mighty Movers", ages:"Invitation only", level:"45 min", day:"Thu", time:"5:05 PM", coach:"", room:"", cap:8, enrolled:5, tuition:70, roster:[] },
      { id:"c086", program:"Gymnastics", name:"Gym Kids L1 (8+)", ages:"8+", level:"55 min", day:"Thu", time:"5:05 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c087", program:"Cheer", name:"Sparkles Cheer", ages:"", level:"", day:"Thu", time:"5:05 PM", coach:"", room:"", cap:16, enrolled:7, tuition:0, roster:[] },
      { id:"c088", program:"Gymnastics", name:"Super Kids L1", ages:"5+", level:"55 min", day:"Thu", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c089", program:"Ninja", name:"Ninja White (6-8)", ages:"6-8", level:"55 min", day:"Thu", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c090", program:"Ninja", name:"Ninja White (9+)", ages:"9+", level:"55 min", day:"Thu", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c091", program:"Tumbling", name:"Tumbling 3", ages:"6+", level:"55 min", day:"Thu", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:10, tuition:87, roster:[], notes:"Full \u2014 waitlist open." },
      { id:"c092", program:"Tumbling", name:"Tumbling 1", ages:"6+", level:"55 min", day:"Thu", time:"6:10 PM", coach:"", room:"", cap:10, enrolled:7, tuition:87, roster:[] },
      { id:"c093", program:"Open Gym", name:"Open Gym", ages:"", level:"", day:"Thu", time:"7:15 PM", coach:"", room:"", cap:20, enrolled:14, tuition:0, roster:[] },
      { id:"c094", program:"Cheer", name:"Novas", ages:"", level:"", day:"Thu", time:"4:00–6:00 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:7, tuition:0, roster:[] },
      { id:"c095", program:"Cheer", name:"Flash", ages:"", level:"", day:"Thu", time:"6:00–7:15 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:11, tuition:0, roster:[] },
      { id:"c096", program:"Open Gym", name:"Morning Playtime", ages:"5 & under", level:"", day:"Fri", time:"10:00 AM", coach:"", room:"", cap:20, enrolled:10, tuition:0, roster:[] },
      { id:"c097", program:"STEAM", name:"STEAM", ages:"", level:"", day:"Fri", time:"11:30 AM", coach:"", room:"", cap:12, enrolled:9, tuition:0, roster:[] },
      { id:"c098", program:"STEAM", name:"STEAM", ages:"", level:"", day:"Fri", time:"12:45 PM", coach:"", room:"", cap:12, enrolled:9, tuition:0, roster:[] },
      { id:"c099", program:"Ninja", name:"Ninja Blue (8+)", ages:"8+", level:"55 min", day:"Fri", time:"2:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c100", program:"Gymnastics", name:"Gym Kids L1", ages:"5+", level:"55 min", day:"Fri", time:"2:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c101", program:"Gymnastics", name:"Super Kids L1", ages:"5+", level:"55 min", day:"Fri", time:"2:00 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c102", program:"Preschool", name:"Mighty Ninjas", ages:"4.5–5", level:"45 min", day:"Fri", time:"2:00 PM", coach:"", room:"", cap:8, enrolled:6, tuition:70, roster:[] },
      { id:"c103", program:"Gymnastics", name:"Firecrackers L3", ages:"5+", level:"55 min", day:"Fri", time:"2:00 PM", coach:"", room:"", cap:10, enrolled:4, tuition:87, roster:[] },
      { id:"c104", program:"Tumbling", name:"Tumbling 1", ages:"6+", level:"55 min", day:"Fri", time:"3:00 PM", coach:"", room:"", cap:10, enrolled:6, tuition:87, roster:[] },
      { id:"c105", program:"Tumbling", name:"Tumbling 3", ages:"6+", level:"55 min", day:"Fri", time:"3:00 PM", coach:"", room:"", cap:10, enrolled:8, tuition:87, roster:[] },
      { id:"c106", program:"Gymnastics", name:"Hot Shots L2", ages:"5+", level:"55 min", day:"Fri", time:"3:00 PM", coach:"", room:"", cap:10, enrolled:5, tuition:87, roster:[] },
      { id:"c107", program:"Cheer", name:"Starlights Cheer", ages:"", level:"", day:"Fri", time:"3:00 PM", coach:"", room:"", cap:16, enrolled:11, tuition:0, roster:[] },
      { id:"c108", program:"Cheer", name:"Open Gym Tumbling", ages:"", level:"", day:"Fri", time:"3:00–4:15 PM", coach:"", room:"Cheer Gym", cap:16, enrolled:12, tuition:0, roster:[] }
    ],
    families: [
      { id:"f1", family:"The Esposito Family", parent:"Anthony Esposito", phone:"(208) 555-0110", email:"esposito@example.com", kids:["Gabby","Leo","Mia"], autopay:true, notes:"Gabby — Ignite competitive cheer (Flare). Leo & Mia — Little Ninjas. All three — STEAM & Play." },
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

    // ---- TEAM APP (native TeamSnap-style): Momentum's all-star cheer program.
    // Named competitive teams (Flare = Ava's team) + Exhibition + Rec. Add/edit teams in-app.
    // Away competitions carry TRAVEL details (venue, hotel, depart/call). Linked by team NAME.
    teams: [
      // Real squad names and practice times, read off Momentum's own Fall 2026
      // schedule. Level and age division are blank on purpose - their published
      // material does not say which pathway each squad sits in. Ask Josh, then fill.
      { id:"tm1", name:"Flare", level:"", age:"", practice:"Mon 4:00–5:30 PM · Wed 4:00–5:30 PM · Thu 6:00–7:15 PM", coach:"", color:"#0f9d9d",
        roster:[{athlete:"Gabby Esposito",parent:"Anthony Esposito",phone:"(208) 555-0110"}, {athlete:"Chloe Bennett",parent:"Marcus Bennett",phone:"(208) 555-0114"}, {athlete:"Maya Okonkwo",parent:"Ada Okonkwo",phone:"(208) 555-0112"}, {athlete:"Ruby Tran",parent:"Kim Tran",phone:"(208) 555-0141"}, {athlete:"Leah Grant",parent:"Sam Grant",phone:"(208) 555-0142"}, {athlete:"Faith Owens",parent:"Deb Owens",phone:"(208) 555-0143"}, {athlete:"Gia Ross",parent:"Nina Ross",phone:"(208) 555-0144"}, {athlete:"Kate Bauer",parent:"Lou Bauer",phone:"(208) 555-0145"}, {athlete:"Ana Ford",parent:"Mel Ford",phone:"(208) 555-0146"}, {athlete:"Reese Cole",parent:"Jo Cole",phone:"(208) 555-0147"}] },
      { id:"tm2", name:"Ignite", level:"", age:"", practice:"Mon 5:30–7:00 PM · Wed 5:30–7:00 PM", coach:"", color:"#c2492a",
        roster:[{athlete:"Ruby Bennett",parent:"Marcus Bennett",phone:"(208) 555-0114"}, {athlete:"Harper Vance",parent:"Dana Vance",phone:"(208) 555-0121"}, {athlete:"Nora Diaz",parent:"Elena Diaz",phone:"(208) 555-0122"}, {athlete:"Willa Kraft",parent:"Beth Kraft",phone:"(208) 555-0123"}, {athlete:"Sadie Lund",parent:"Kim Lund",phone:"(208) 555-0124"}, {athlete:"Piper Reyes",parent:"Ana Reyes",phone:"(208) 555-0125"}, {athlete:"June Alcott",parent:"Tom Alcott",phone:"(208) 555-0126"}] },
      { id:"tm3", name:"Novas", level:"", age:"", practice:"Tue 4:00–6:00 PM · Thu 4:00–6:00 PM", coach:"", color:"#0e7490",
        roster:[{athlete:"Ellie Harmon",parent:"Rachel Harmon",phone:"(208) 555-0111"}, {athlete:"Sofia Marsh",parent:"Gwen Marsh",phone:"(208) 555-0131"}, {athlete:"Ivy Chen",parent:"Lin Chen",phone:"(208) 555-0132"}, {athlete:"Mila Novak",parent:"Petra Novak",phone:"(208) 555-0133"}, {athlete:"Aria Boone",parent:"Cara Boone",phone:"(208) 555-0134"}, {athlete:"Layla Frost",parent:"Mona Frost",phone:"(208) 555-0135"}, {athlete:"Zoe Park",parent:"Han Park",phone:"(208) 555-0136"}, {athlete:"Brooke Sims",parent:"Val Sims",phone:"(208) 555-0137"}, {athlete:"Hazel Ward",parent:"Rae Ward",phone:"(208) 555-0138"}] },
      { id:"tm4", name:"Flash", level:"", age:"", practice:"Tue 6:00–7:15 PM · Thu 6:00–7:15 PM", coach:"", color:"#dda12e",
        roster:[{athlete:"Lucy Hale",parent:"Pam Hale",phone:"(208) 555-0151"}, {athlete:"Isla Mora",parent:"Rio Mora",phone:"(208) 555-0152"}, {athlete:"Ada Vinson",parent:"Kris Vinson",phone:"(208) 555-0153"}, {athlete:"Nova Beck",parent:"Tia Beck",phone:"(208) 555-0154"}, {athlete:"Elle Pratt",parent:"Sky Pratt",phone:"(208) 555-0155"}, {athlete:"Wren Dodd",parent:"Fay Dodd",phone:"(208) 555-0156"}, {athlete:"Cora Judd",parent:"Bree Judd",phone:"(208) 555-0157"}, {athlete:"Millie Fox",parent:"Dot Fox",phone:"(208) 555-0158"}] },
      { id:"tm5", name:"Embers", level:"", age:"", practice:"Mon 6:00 PM", coach:"", color:"#b8461f",
        roster:[{athlete:"Lila Beck",parent:"Tia Beck",phone:"(208) 555-0154"}, {athlete:"Nina Rowe",parent:"Cara Rowe",phone:"(208) 555-0171"}, {athlete:"Quinn Ives",parent:"Jo Ives",phone:"(208) 555-0172"}, {athlete:"Remi Hall",parent:"Bea Hall",phone:"(208) 555-0173"}, {athlete:"Sloane Ott",parent:"Dot Ott",phone:"(208) 555-0174"}, {athlete:"Talia Fein",parent:"Mel Fein",phone:"(208) 555-0175"}, {athlete:"Wynn Cole",parent:"Sky Cole",phone:"(208) 555-0176"}] },
      { id:"tm6", name:"Sparkles", level:"", age:"", practice:"Thu 5:05 PM", coach:"", color:"#d4608c",
        roster:[{athlete:"Owen Whitfield",parent:"Grant Whitfield",phone:"(208) 555-0117"}, {athlete:"Tessa Vaughn",parent:"Rob Vaughn",phone:"(208) 555-0161"}, {athlete:"Poppy Rhodes",parent:"Deb Rhodes",phone:"(208) 555-0162"}, {athlete:"Remy Blair",parent:"Cal Blair",phone:"(208) 555-0163"}, {athlete:"Lola Sena",parent:"Ivy Sena",phone:"(208) 555-0164"}, {athlete:"Josie Kerr",parent:"Amy Kerr",phone:"(208) 555-0165"}, {athlete:"Sage Amir",parent:"Nadia Amir",phone:"(208) 555-0166"}, {athlete:"Bella Cruz",parent:"Ray Cruz",phone:"(208) 555-0167"}] },
      { id:"tm7", name:"Starlights", level:"", age:"", practice:"Fri 3:00 PM", coach:"", color:"#9b4fd0",
        roster:[{athlete:"Gabby Esposito",parent:"Anthony Esposito",phone:"(208) 555-0110"}, {athlete:"Chloe Bennett",parent:"Marcus Bennett",phone:"(208) 555-0114"}, {athlete:"Maya Okonkwo",parent:"Ada Okonkwo",phone:"(208) 555-0112"}, {athlete:"Ruby Tran",parent:"Kim Tran",phone:"(208) 555-0141"}, {athlete:"Leah Grant",parent:"Sam Grant",phone:"(208) 555-0142"}, {athlete:"Faith Owens",parent:"Deb Owens",phone:"(208) 555-0143"}, {athlete:"Gia Ross",parent:"Nina Ross",phone:"(208) 555-0144"}, {athlete:"Kate Bauer",parent:"Lou Bauer",phone:"(208) 555-0145"}, {athlete:"Ana Ford",parent:"Mel Ford",phone:"(208) 555-0146"}, {athlete:"Reese Cole",parent:"Jo Cole",phone:"(208) 555-0147"}] }
    ],
    teamevents: [
      // Flare (Ava's team) — includes TRAVEL competitions
      { id:"te1",  team:"Flare", type:"Practice",    title:"Full routine + stunts", date:"2026-08-04", time:"6:00 PM", location:"Gym B", going:9,  maybe:1, out:1 },
      { id:"te2",  team:"Flare", type:"Practice",    title:"Tumbling + jumps",       date:"2026-08-06", time:"6:00 PM", location:"Gym B", going:10, maybe:1, out:0 },
      { id:"te3",  team:"Flare", type:"Competition", title:"Spokane Cheer Classic",  date:"2026-09-12", time:"Call 8:30 AM", location:"Spokane Arena, WA", hotel:"DoubleTree by Hilton Spokane City Center", hotelAddr:"322 N Spokane Falls Ct, Spokane, WA", depart:"Depart Fri 4:00 PM · Call 8:30 AM Sat · room block under 'Momentum'", going:9, maybe:2, out:1, notes:"Uniform + comp bow. Carpool sign-up in announcements." },
      { id:"te4",  team:"Flare", type:"Competition", title:"Rocky Mountain Rumble",  date:"2026-10-24", time:"Call 9:00 AM", location:"Ford Idaho Center, Nampa, ID", hotel:"Hampton Inn & Suites Nampa", hotelAddr:"5750 Franklin Rd, Nampa, ID", depart:"Depart Fri 2:00 PM (5 hr drive) · Call 9:00 AM Sat", going:7, maybe:3, out:1, notes:"Overnight trip — parents book the room block by Oct 1." },
      // Fusion
      { id:"te5",  team:"Fusion", type:"Practice",    title:"Motions + counts",       date:"2026-08-05", time:"4:30 PM", location:"Gym B", going:6, maybe:1, out:0 },
      { id:"te6",  team:"Fusion", type:"Competition", title:"Spokane Cheer Classic",  date:"2026-09-12", time:"Call 10:30 AM", location:"Spokane Arena, WA", depart:"Day trip — carpool leaves 8:30 AM", going:5, maybe:2, out:0, notes:"Day trip, no hotel." },
      // Blaze — travel
      { id:"te7",  team:"Blaze", type:"Practice",    title:"Choreo — new routine",   date:"2026-08-03", time:"5:30 PM", location:"Gym B", going:8, maybe:1, out:0 },
      { id:"te8",  team:"Blaze", type:"Practice",    title:"Stunt groups",           date:"2026-08-10", time:"5:30 PM", location:"Gym B", going:7, maybe:2, out:0 },
      { id:"te9",  team:"Blaze", type:"Competition", title:"Rocky Mountain Rumble",  date:"2026-10-24", time:"Call 11:00 AM", location:"Ford Idaho Center, Nampa, ID", hotel:"Hampton Inn & Suites Nampa", hotelAddr:"5750 Franklin Rd, Nampa, ID", depart:"Depart Fri 2:00 PM · Call 11:00 AM Sat", going:8, maybe:1, out:0 },
      // Radiance (Prep)
      { id:"te10", team:"Radiance (Prep)", type:"Practice", title:"Skills + jumps",  date:"2026-08-05", time:"4:00 PM", location:"Gym B", going:6, maybe:1, out:0 },
      { id:"te11", team:"Radiance (Prep)", type:"Showcase", title:"Prep Debut Showcase", date:"2026-10-03", time:"11:00 AM", location:"Momentum Sports and Play", going:7, maybe:0, out:0, notes:"First-ever performance — invite the family!" },
      // Exhibition · Sparks (non-competitive)
      { id:"te12", team:"Exhibition · Sparks", type:"Practice", title:"Dance + spirit", date:"2026-08-03", time:"5:00 PM", location:"Gym B", going:10, maybe:2, out:1 },
      { id:"te13", team:"Exhibition · Sparks", type:"Showcase", title:"Momentum Family Showcase", date:"2026-10-10", time:"10:00 AM", location:"Momentum Sports and Play", going:8, maybe:1, out:0, notes:"Non-competitive — all skill levels perform. Tickets at the front desk." },
      // Rec Cheer · Comets (non-competitive)
      { id:"te14", team:"Rec Cheer · Comets", type:"Practice", title:"Skills + cheer", date:"2026-08-07", time:"1:00 PM", location:"Gym B", going:6, maybe:1, out:1 },
      { id:"te15", team:"Rec Cheer · Comets", type:"Event",    title:"Pep rally — local school", date:"2026-09-18", time:"3:00 PM", location:"TBD", going:5, maybe:2, out:1, notes:"Community appearance." }
    ],
    teammsgs: [
      { id:"tms1", team:"Flare", author:"Coach Jordan", text:"Bring your competition bow AND practice bow Thursday — we run the full routine top to bottom. Hair up, no jewelry. ", ts:"2026-07-14T17:02:00Z" },
      { id:"tms2", team:"Flare", author:"Coach Jordan", text:"Rocky Mountain Rumble is an OVERNIGHT trip — book the Hampton Inn room block under 'Momentum' by Oct 1. Details in the Travel section above.", ts:"2026-07-15T14:20:00Z" },
      { id:"tms3", team:"Blaze",  author:"Coach Jordan", text:"New routine drops next practice! Watch the count video I sent so we can jump straight into stunt groups.", ts:"2026-07-15T15:40:00Z" },
      { id:"tms4", team:"Radiance (Prep)", author:"Coach Jordan", text:"Our Prep athletes have their FIRST showcase Oct 3 — bring the whole family. So proud of these girls already. ", ts:"2026-07-13T16:10:00Z" },
      { id:"tms5", team:"Exhibition · Sparks", author:"Coach Jordan", text:"Family Showcase tickets are on sale at the front desk — invite grandparents! Sparks perform first, so please arrive by 9:30.", ts:"2026-07-15T18:05:00Z" },
      { id:"tms6", team:"Rec Cheer · Comets", author:"Coach Jordan", text:"Fun one coming up: we've been invited to a local pep rally Sept 18. Totally optional, but a blast. Let me know if your cheerleader is in!", ts:"2026-07-12T13:30:00Z" }
    ],
    // ---- BOOKS & MARGINS: for-profit expense ledger (add/line-out in-app). Monthly figures.
    expenses: [
      { id:"ex1",  date:"2026-07-01", vendor:"Schreiber Way Property LLC", category:"Occupancy", amount:4200, method:"ACH", notes:"Building lease — 3877 N Schreiber Way" },
      { id:"ex2",  date:"2026-07-01", vendor:"Payroll — coaches & front desk", category:"Payroll", amount:5200, method:"ACH", notes:"Monthly staff wages" },
      { id:"ex3",  date:"2026-07-01", vendor:"IRS / State — payroll taxes", category:"Payroll", amount:700, method:"ACH", notes:"Employer taxes" },
      { id:"ex4",  date:"2026-07-03", vendor:"NW Sports Insurance", category:"Insurance", amount:450, method:"Card", notes:"General + participant liability" },
      { id:"ex5",  date:"2026-07-05", vendor:"Avista Utilities", category:"Utilities", amount:700, method:"ACH", notes:"Power / water / gas" },
      { id:"ex6",  date:"2026-07-05", vendor:"Ziply Fiber", category:"Utilities", amount:160, method:"Card", notes:"Internet + phone" },
      { id:"ex7",  date:"2026-07-06", vendor:"The Studio Director", category:"Software", amount:159, method:"Card", notes:"Class mgmt (being replaced by this hub)" },
      { id:"ex8",  date:"2026-07-08", vendor:"Tumbl Trak / Resilite", category:"Equipment", amount:350, method:"Card", notes:"Mats + equipment upkeep" },
      { id:"ex9",  date:"2026-07-10", vendor:"CleanCo Janitorial", category:"Facilities", amount:400, method:"ACH", notes:"Weekly cleaning" },
      { id:"ex10", date:"2026-07-12", vendor:"Meta Ads", category:"Marketing", amount:450, method:"Card", notes:"Facebook + Instagram" },
      { id:"ex11", date:"2026-07-15", vendor:"Stripe processing fees", category:"Fees", amount:520, method:"Auto", notes:"~2.9% card fees on tuition" },
      { id:"ex12", date:"2026-07-16", vendor:"Amazon Business", category:"Supplies", amount:180, method:"Card", notes:"Office + gym supplies" },
      { id:"ex13", date:"2026-07-18", vendor:"Varsity / choreographer", category:"Programs", amount:300, method:"Card", notes:"Cheer music + choreography" }
    ],

    // ---- CHECK-IN & ATTENDANCE: the floor log (class-level records; kiosk adds new ones).
    attendance: [
      { id:"at1", date:"2026-08-17", class:"Rec Gym · Level 3–4", coach:"Coach Emma",  present:5,  of:6,  notes:"" },
      { id:"at2", date:"2026-08-17", class:"Exhibition Cheer",    coach:"Coach Jordan", present:12, of:13, notes:"1 out sick — parent texted ahead" },
      { id:"at3", date:"2026-08-17", class:"Little Ninjas",       coach:"Josh Terra",   present:7,  of:7,  notes:"" },
      { id:"at4", date:"2026-08-18", class:"Rec Gym · Level 1",   coach:"Coach Emma",   present:11, of:12, notes:"" },
      { id:"at5", date:"2026-08-18", class:"Ninja · White & Blue",coach:"Josh Terra",   present:12, of:12, notes:"Full house" },
      { id:"at6", date:"2026-08-18", class:"Tot Town",            coach:"Katie Terra",  present:7,  of:8,  notes:"" }
    ],

    // ---- WAITLIST: queues for full classes; promote in-app when a spot opens.
    waitlist: [
      { id:"w1", class:"Rec Gym · Level 1",    child:"Nora Diaz",   family:"Diaz Family",   phone:"(208) 555-0122", since:"2026-08-02", status:"Waiting" },
      { id:"w2", class:"Rec Gym · Level 1",    child:"Tommy Vance", family:"Vance Family",  phone:"(208) 555-0121", since:"2026-08-09", status:"Waiting" },
      { id:"w3", class:"Ninja · White & Blue", child:"Milo Kraft",  family:"Kraft Family",  phone:"(208) 555-0123", since:"2026-07-28", status:"Waiting" },
      { id:"w4", class:"Ninja · White & Blue", child:"June Alcott", family:"Alcott Family", phone:"(208) 555-0126", since:"2026-08-05", status:"Waiting" },
      { id:"w5", class:"Ninja · White & Blue", child:"Remy Blair",  family:"Blair Family",  phone:"(208) 555-0163", since:"2026-08-14", status:"Waiting" }
    ],

    // ---- GROWTH FUNNEL: every lead from first contact to enrolled.
    leads: [
      { id:"l1", name:"Harper Quinn",  age:5, program:"Gymnastics", source:"Facebook",                  stage:"New",         date:"2026-08-17", note:"Asked about preschool gym vs Rec L1." },
      { id:"l2", name:"Beckett Ross",  age:7, program:"Ninja",      source:"Referral — Rivera Family",  stage:"Contacted",   date:"2026-08-15", note:"Mateo's cousin. Wants Wednesday." },
      { id:"l3", name:"Adeline Frost", age:4, program:"Preschool",  source:"Google",                    stage:"Trial booked", date:"2026-08-12", trial:"Tue Aug 25 · 9:30 AM (Tot Town)" },
      { id:"l4", name:"Jude Marsh",    age:9, program:"Tumbling",   source:"Walk-in",                   stage:"Trial booked", date:"2026-08-14", trial:"Fri Aug 21 · 4:00 PM (Tumbling L2–3)" },
      { id:"l5", name:"Callie Sena",   age:6, program:"Cheer",      source:"Instagram",                 stage:"Trial done",  date:"2026-08-06", note:"Loved it — mom comparing schedules." },
      { id:"l6", name:"Miles Ott",     age:8, program:"Ninja",      source:"Referral — Bennett Family", stage:"Trial done",  date:"2026-08-08", note:"Ready to sign — waiting on White & Blue spot." },
      { id:"l7", name:"Piper Hale",    age:5, program:"Gymnastics", source:"Facebook",                  stage:"Enrolled",    date:"2026-07-30", note:"Enrolled in Preschool Gymnastics." }
    ],

    // ---- HR & CERTIFICATIONS: per-person cert ledger with real expiry dates.
    hrrecords: [
      { id:"hr1", name:"Josh Terra",   role:"Owner · Ninja & Parkour Director", certs:[ {cert:"Ninja/Parkour L2", exp:"2027-05-01"}, {cert:"CPR/First Aid", exp:"2027-03-15"}, {cert:"Background check", exp:"2027-08-01"} ], pay:"Owner draw", hired:"2020-08-01" },
      { id:"hr2", name:"Katie Terra",  role:"Owner · Preschool & Education Director", certs:[ {cert:"Early Childhood Ed", exp:""}, {cert:"CPR/First Aid", exp:"2026-09-20"}, {cert:"Background check", exp:"2027-08-01"} ], pay:"Owner draw", hired:"2020-08-01" },
      { id:"hr3", name:"Coach Emma",   role:"Gymnastics Coach", certs:[ {cert:"USAG Safety", exp:"2027-01-10"}, {cert:"CPR/First Aid", exp:"2026-08-30"}, {cert:"Background check", exp:"2026-11-15"} ], pay:"Hourly", hired:"2023-09-01" },
      { id:"hr4", name:"Coach Jordan", role:"Cheer Director · Ignite", certs:[ {cert:"USASF Coach", exp:"2027-06-01"}, {cert:"CPR/First Aid", exp:"2026-12-05"}, {cert:"Background check", exp:"2027-02-20"} ], pay:"Hourly", hired:"2022-08-15" },
      { id:"hr5", name:"Coach Mia",    role:"Tumbling Coach", certs:[ {cert:"USAG Safety", exp:"2026-10-12"}, {cert:"CPR/First Aid", exp:"2026-10-12"}, {cert:"Background check", exp:"2027-04-01"} ], pay:"Hourly", hired:"2024-01-08" },
      { id:"hr6", name:"Frankie",      role:"Front Desk · Enrollment", certs:[ {cert:"CPR/First Aid", exp:"2027-02-14"}, {cert:"Background check", exp:"2027-01-30"} ], pay:"Hourly", hired:"2024-06-01" }
    ],

    // ---- WAIVERS & SAFETY: the docket (one row per family) + the incident log.
    waivers: [
      { id:"wa1", family:"The Esposito Family", kids:"Ava · Leo · Mia", status:"Signed", signed:"2025-09-02", expires:"2026-09-02" },
      { id:"wa2", family:"The Harmon Family",   kids:"Sam · Ellie",     status:"Signed", signed:"2026-01-10", expires:"2027-01-10" },
      { id:"wa3", family:"Okonkwo Family",      kids:"Zara",            status:"Signed", signed:"2026-03-14", expires:"2027-03-14" },
      { id:"wa4", family:"The Bennett Family",  kids:"Chloe · Ruby",    status:"Signed", signed:"2025-08-30", expires:"2026-08-30" },
      { id:"wa5", family:"Rivera Family",       kids:"Mateo",           status:"Signed", signed:"2026-06-01", expires:"2027-06-01" },
      { id:"wa6", family:"Whitfield Family",    kids:"Owen",            status:"Missing", signed:"", expires:"" }
    ],
    incidents: [
      { id:"in1", date:"2026-08-06", where:"Ninja Zone · Red & Purple", what:"Scraped knee on warped-wall dismount. Ice applied, parent notified at pickup, logged same day.", status:"Closed" },
      { id:"in2", date:"2026-07-22", where:"Gym B", what:"Mat velcro seam lifting — taped immediately, replacement pad ordered.", status:"Closed" }
    ],

    // ---- APPROVAL DESK: anything that spends, discounts or changes policy waits for an owner.
    // ---- KIDS ------------------------------------------------------------
    // Derived from the sample families already in this seed, not invented anew.
    // Real kids arrive via Bring Your Data (/import.html) the day Momentum says yes.
    // `photoConsent` is deliberately "unset" by default: silence is not consent.
    kids: [
      { id:"k1",  child:"Gabby",  family:"The Esposito Family", familyId:"f1", age:11, program:"Cheer",      level:"Ignite \u00b7 Flare",     photoConsent:"yes",   sample:true },
      { id:"k2",  child:"Leo",    family:"The Esposito Family", familyId:"f1", age:6,  program:"Ninja",      level:"White & Blue",       photoConsent:"yes",   sample:true },
      { id:"k3",  child:"Mia",    family:"The Esposito Family", familyId:"f1", age:4,  program:"Preschool",  level:"Little Ninjas",      photoConsent:"no",    sample:true },
      { id:"k4",  child:"Sam",    family:"The Harmon Family",   familyId:"f2", age:9,  program:"Gymnastics", level:"Rec Level 2",        photoConsent:"unset", sample:true },
      { id:"k5",  child:"Ellie",  family:"The Harmon Family",   familyId:"f2", age:7,  program:"Tumbling",   level:"Rec Level 1",        photoConsent:"unset", sample:true },
      { id:"k6",  child:"Zara",   family:"Okonkwo Family",      familyId:"f3", age:5,  program:"Preschool",  level:"Tot Town",           photoConsent:"yes",   sample:true },
      { id:"k7",  child:"Chloe",  family:"The Bennett Family",  familyId:"f4", age:10, program:"Cheer",      level:"Exhibition \u00b7 Sparks", photoConsent:"unset", sample:true },
      { id:"k8",  child:"Ruby",   family:"The Bennett Family",  familyId:"f4", age:8,  program:"Gymnastics", level:"Rec Level 1",        photoConsent:"unset", sample:true },
      { id:"k9",  child:"Mateo",  family:"The Reyes Family",    familyId:"f5", age:12, program:"Ninja",      level:"Red & Purple",       photoConsent:"yes",   sample:true },
      { id:"k10", child:"Owen",   family:"The Walsh Family",    familyId:"f6", age:6,  program:"Gymnastics", level:"Rec Level 1",        photoConsent:"no",    sample:true }
    ],

    // ---- VISITS ----------------------------------------------------------
    // Per-child attendance. THREE statuses, and the difference between the last
    // two is the whole point: a family who tells you they cannot make it is not
    // drifting away. A family who simply stops showing up is.
    //   present  \u2014 in the gym
    //   told     \u2014 absent, parent said so in advance
    //   noshow   \u2014 absent, nobody said anything
    // Ruby (k8) is the demonstration: three silent misses in a row.
    visits: [
      { id:"v01", kidId:"k1", child:"Gabby", class:"Ignite Cheer", date:"2026-08-04", status:"present", sample:true },
      { id:"v02", kidId:"k1", child:"Gabby", class:"Ignite Cheer", date:"2026-08-11", status:"present", sample:true },
      { id:"v03", kidId:"k1", child:"Gabby", class:"Ignite Cheer", date:"2026-08-18", status:"present", sample:true },
      { id:"v04", kidId:"k2", child:"Leo",   class:"Ninja \u00b7 White & Blue", date:"2026-08-04", status:"present", sample:true },
      { id:"v05", kidId:"k2", child:"Leo",   class:"Ninja \u00b7 White & Blue", date:"2026-08-11", status:"told", note:"Family holiday", sample:true },
      { id:"v06", kidId:"k2", child:"Leo",   class:"Ninja \u00b7 White & Blue", date:"2026-08-18", status:"present", sample:true },
      { id:"v07", kidId:"k3", child:"Mia",   class:"Little Ninjas", date:"2026-08-05", status:"present", sample:true },
      { id:"v08", kidId:"k3", child:"Mia",   class:"Little Ninjas", date:"2026-08-12", status:"present", sample:true },
      { id:"v09", kidId:"k3", child:"Mia",   class:"Little Ninjas", date:"2026-08-19", status:"present", sample:true },
      { id:"v10", kidId:"k4", child:"Sam",   class:"Rec Gym \u00b7 Level 2", date:"2026-08-05", status:"present", sample:true },
      { id:"v11", kidId:"k4", child:"Sam",   class:"Rec Gym \u00b7 Level 2", date:"2026-08-12", status:"noshow", sample:true },
      { id:"v12", kidId:"k4", child:"Sam",   class:"Rec Gym \u00b7 Level 2", date:"2026-08-19", status:"present", sample:true },
      { id:"v13", kidId:"k5", child:"Ellie", class:"Tumbling", date:"2026-08-06", status:"present", sample:true },
      { id:"v14", kidId:"k5", child:"Ellie", class:"Tumbling", date:"2026-08-13", status:"present", sample:true },
      { id:"v15", kidId:"k5", child:"Ellie", class:"Tumbling", date:"2026-08-20", status:"told", note:"Sick", sample:true },
      { id:"v16", kidId:"k6", child:"Zara",  class:"Tot Town", date:"2026-08-04", status:"present", sample:true },
      { id:"v17", kidId:"k6", child:"Zara",  class:"Tot Town", date:"2026-08-11", status:"present", sample:true },
      { id:"v18", kidId:"k6", child:"Zara",  class:"Tot Town", date:"2026-08-18", status:"present", sample:true },
      { id:"v19", kidId:"k7", child:"Chloe", class:"Exhibition Cheer", date:"2026-08-04", status:"present", sample:true },
      { id:"v20", kidId:"k7", child:"Chloe", class:"Exhibition Cheer", date:"2026-08-11", status:"noshow", sample:true },
      { id:"v21", kidId:"k7", child:"Chloe", class:"Exhibition Cheer", date:"2026-08-18", status:"noshow", sample:true },
      { id:"v22", kidId:"k8", child:"Ruby",  class:"Rec Gym \u00b7 Level 1", date:"2026-08-05", status:"noshow", sample:true },
      { id:"v23", kidId:"k8", child:"Ruby",  class:"Rec Gym \u00b7 Level 1", date:"2026-08-12", status:"noshow", sample:true },
      { id:"v24", kidId:"k8", child:"Ruby",  class:"Rec Gym \u00b7 Level 1", date:"2026-08-19", status:"noshow", sample:true },
      { id:"v25", kidId:"k9", child:"Mateo", class:"Ninja \u00b7 Red & Purple", date:"2026-08-06", status:"present", sample:true },
      { id:"v26", kidId:"k9", child:"Mateo", class:"Ninja \u00b7 Red & Purple", date:"2026-08-13", status:"present", sample:true },
      { id:"v27", kidId:"k9", child:"Mateo", class:"Ninja \u00b7 Red & Purple", date:"2026-08-20", status:"present", sample:true },
      { id:"v28", kidId:"k10", child:"Owen", class:"Rec Gym \u00b7 Level 1", date:"2026-08-05", status:"present", sample:true },
      { id:"v29", kidId:"k10", child:"Owen", class:"Rec Gym \u00b7 Level 1", date:"2026-08-12", status:"present", sample:true },
      { id:"v30", kidId:"k10", child:"Owen", class:"Rec Gym \u00b7 Level 1", date:"2026-08-19", status:"noshow", sample:true }
    ],

    // ---- LADDERS ---------------------------------------------------------
    // Lifted verbatim from the Floor Studio page, where they were hardcoded.
    // They are Momentum's real progressions. Now data, so Josh and Katie can
    // edit a rung without anyone touching a file.
    ladders: [
      { id:"ld1", program:"Ninja", title:"Momentum Ninjas \u2014 the belt ladder", rungs:[
        { name:"Little / Mighty Ninjas", note:"Ages 3\u20135 \u00b7 fundamentals", color:"#9ad5cf" },
        { name:"White & Blue",           note:"First belts \u00b7 obstacles + safety", color:"#0f9d9d" },
        { name:"Red & Purple",           note:"Bigger walls, longer laches", color:"#0e7490" },
        { name:"Gray & Black",           note:"Advanced lines + spotting others", color:"#0f1417" } ] },
      { id:"ld2", program:"Gymnastics", title:"Gymnastics \u2014 Rec to team", rungs:[
        { name:"Preschool Gym", note:"Ages 3\u20135 \u00b7 Tot Town \u2192 floor", color:"#9ad5cf" },
        { name:"Rec Level 1",   note:"Shapes, rolls, cartwheel", color:"#14b8a6" },
        { name:"Rec Level 2",   note:"Handstands, bridges, bars", color:"#0f9d9d" },
        { name:"Rec Level 3\u20134", note:"Back handspring track", color:"#0e7490" },
        { name:"PreComp Team",  note:"Routines + mock meets", color:"#134e4a" } ] },
      { id:"ld3", program:"Cheer", title:"Cheer \u2014 Sparks to Ignite", rungs:[
        { name:"Exhibition \u00b7 Sparks", note:"Non-comp \u00b7 performance first", color:"#9ad5cf" },
        { name:"Rec Cheer \u00b7 Comets",  note:"Skills + school-spirit events", color:"#14b8a6" },
        { name:"Radiance (Prep)",     note:"First competition season", color:"#0f9d9d" },
        { name:"Ignite \u2014 Flare \u00b7 Fusion \u00b7 Blaze", note:"Full competitive program", color:"#0e7490" } ] }
    ],

    // ---- OFFERS ----------------------------------------------------------
    // A seat offered to someone on a waitlist, holding for a set window. When it
    // lapses the seat passes to the next in line instead of sitting empty.
    offers: [],

    // ---- ROOMS -----------------------------------------------------------
    // Named from rooms already referenced in Momentum's own class and incident
    // data. Editable in Parties & Rooms \u2014 nothing here is guessed at.
    rooms: [
      { id:"rm1", name:"Cheer Gym",     note:"On 9 of their listed cheer classes" },
      { id:"rm2", name:"Ninja Zone",    note:"From the incident log" },
      { id:"rm3", name:"Tot Town",      note:"Preschool room" },
      { id:"rm4", name:"Preschool Gym", note:"From the level ladder" }
    ],

    // ---- BOOKINGS --------------------------------------------------------
    // Parties bound to a room and a time, so two cannot occupy one room at once.
    bookings: [],

    // ---- TIME CLOCK ------------------------------------------------------
    // Empty on purpose. Every other room ships with sample data so nothing waits
    // on Josh and Katie -- but a punch is a wage. A seeded punch becomes a real
    // number in Books & Margins the first time a week is approved, so this one
    // starts at zero and fills up the first time somebody taps in.
    punches: [],
    payperiods: [],

    approvals: [
      { id:"ap1", type:"Refund",   item:"Whitfield Family — $87 August tuition (moved out of state mid-month)", from:"Front Desk", status:"Pending", ts:"2026-08-18" },
      { id:"ap2", type:"Discount", item:"Staff-child rate for Coach Emma's daughter — 50% on Rec Gym L1", from:"Coach Emma", status:"Pending", ts:"2026-08-17" },
      { id:"ap3", type:"Schedule", item:"Move Tumbling · Level 1 from Wed 5:00 PM to Wed 6:00 PM starting September", from:"Coach Mia", status:"Pending", ts:"2026-08-16" },
      { id:"ap4", type:"Closure",  item:"Labor Day — closed Mon Sep 7, note in the family newsletter", from:"Katie Terra", status:"Approved", by:"Katie Terra", ts:"2026-08-12" },
      { id:"ap5", type:"Purchase", item:"Replacement ninja warped-wall pads — $350 (Tumbl Trak)", from:"Josh Terra", status:"Approved", by:"Josh Terra", ts:"2026-08-10" }
    ],

    // ---- SYSTEM HEALTH: every system the gym runs on, one board.
    systems: [
      { id:"sy1", name:"This hub",              area:"Operations", status:"CLEAR", note:"Schedule, families, billing views, Team App, front desk — all in one place." },
      { id:"sy2", name:"momentumsportsandplay.com", area:"Website", status:"CLEAR", note:"Public site (Wix). The hub replaces the back office, not the public site — until you want it to." },
      { id:"sy3", name:"The Studio Director",   area:"Legacy",     status:"WATCH", note:"$159/mo. Being replaced by this hub — export family + class data before cancelling." },
      { id:"sy4", name:"Autopay / billing",     area:"Money",      status:"CLEAR", note:"Auto-pay the 1st at 8 AM, flat rate over 47 weeks. Processor connects when you're ready." },
      { id:"sy5", name:"Waiver forms",          area:"Safety",     status:"WATCH", note:"1 family missing, 2 expiring within 30 days — see Waivers & Safety." },
      { id:"sy6", name:"Email & newsletter",    area:"Marketing",  status:"CLEAR", note:"Frankie drafts the family newsletter from live class data." }
    ]
  }
};

/* ---------------------------------------------------------------------------
   WHO IS SIGNED IN -- resolved here, in the <head>, before anything renders.

   This used to live only in hub-nav.js, which is deferred. Deferred scripts run
   AFTER the inline scripts on a page, so every inline block that wrote
   `window.hubWho || Promise.resolve(null)` silently fell through to null and
   treated the visitor as a guest. Guest is "*". The practical effect was that a
   PARENT opening the Command Center was shown the owner's board -- headcounts,
   fill rates and monthly revenue -- while the sidebar beside it correctly showed
   them only two rooms. Defining the promise first closes that hole for every
   page at once, not just the one where it was noticed.
--------------------------------------------------------------------------- */
(function () {
  var t = "";
  try { t = new URLSearchParams(location.search).get("sess") || localStorage.getItem("hub_sess") || ""; }
  catch (e) { t = ""; }
  try { if (t) localStorage.setItem("hub_sess", t); } catch (e) {}
  window.hubWho = window.hubWho || fetch("/api/auth?do=whoami&t=" + encodeURIComponent(t))
    .then(function (r) { return r.json(); })
    .catch(function () { return null; });
})();
