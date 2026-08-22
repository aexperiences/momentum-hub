/* ============================================================================
   MOMENTUM SPORTS AND PLAY · operations hub (a Kids-Gym vertical of the AE Hub Core,
   customized for the real client). Momentum is a FAMILY-OWNED small business (NOT a
   non-profit) — owners Josh & Katie Terra, opened Aug 2020, Coeur d'Alene ID.
   Real programs, levels, pricing ($70/$87/$123 · $50 reg) and policy from their site.
   Replaces Wix + The Studio Director. Accelerated Experiences, LLC.
   ============================================================================ */
window.HUB_CONFIG = {
  tenant: "momentum",
  seedVersion: "2026-08-22-momentum-v7-realcheer",

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
    { name:"Front Desk", keys:["checkin","enroll","funnel"], accent:"#14b8a6" },
    { name:"Programs",   keys:["schedule","studio","coaches"], accent:"#0f9d9d" },
    { name:"Team App",   keys:["team"], accent:"#0e7490" },
    { name:"Families",   keys:["families"],  accent:"#14b8a6" },
    { name:"Money",      keys:["tuition","books"], accent:"#0f9d9d" },
    { name:"People & Safety", keys:["hr","law","approvals"], accent:"#0a6f6f" },
    { name:"System",     keys:["comply","it","org"], accent:"#0891b2" },
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
    { k:"coaches",  label:"Staff & Coaches",   ic:"/icons/coaches.svg", href:"/coaches.html",  ds:"Your team and their programs" },
    { k:"hr",       label:"HR & Certifications", ic:"/icons/hr.svg", href:"/hr.html",     ds:"Certs, expirations, payroll and onboarding" },
    { k:"law",      label:"Waivers & Safety",  ic:"/icons/law.svg", href:"/law.html",      ds:"The waiver docket and the incident log" },
    { k:"approvals",label:"Approval Desk",     ic:"/icons/approvals.svg", href:"/approvals.html", ds:"Refunds, discounts and changes — owner signs" },
    { k:"comply",   label:"Comply · Trust Center", ic:"/icons/comply.svg", href:"/comply.html", ds:"Live domain checks + sealed evidence chain" },
    { k:"it",       label:"System Health",     ic:"/icons/it.svg", href:"/it.html",       ds:"Every system Momentum runs on, one board" },
    { k:"org",      label:"AI Staff",          ic:"/icons/org.svg", href:"/org.html",      ds:"Frankie on duty — and the org that scales" },
    { k:"skins",    label:"Choose Your Look",  ic:"/icons/skins.svg", href:"/skins.html",    ds:"Six looks, made for Momentum — tap one, the whole hub repaints" }
  ],

  roles: {
    admin:     "*",
    manager:   "*",
    frontdesk: ["home","checkin","enroll","funnel","schedule","team","families","tuition","skins"],
    coach:     ["home","checkin","schedule","studio","team","coaches","hr"],
    trainee:   ["home","checkin","schedule","studio"],
    teacher:   ["home","checkin","schedule","studio","team"],
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

  collections: ["classes","families","coaches","teams","teamevents","teammsgs","expenses","attendance","waitlist","leads","hrrecords","waivers","incidents","approvals","systems","evidence"],

  programColors: { Gymnastics:"#12968f", Ninja:"#b8461f", Cheer:"#dda12e", Tumbling:"#9b4fd0", STEAM:"#1f6fa8", Preschool:"#d4608c", Homeschool:"#6f9a30", Camps:"#2f8fbf" },

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
      { id:"p1", program:"Preschool", name:"Tot Town", ages:"Walking–2 (Parent & Me)", level:"45 min", day:"Tue", time:"9:30 AM", coach:"Katie Terra", room:"Tot Town", cap:10, enrolled:8,  tuition:70,  roster:[], notes:"Parent participates." },
      { id:"p2", program:"Preschool", name:"Preschool Gymnastics", ages:"3–5", level:"45 min", day:"Wed", time:"10:00 AM", coach:"Katie Terra", room:"Gym", cap:12, enrolled:11, tuition:70,  roster:[{child:"Zara",family:"Okonkwo Family"}] },
      { id:"g1", program:"Gymnastics", name:"Rec Gym · Level 1", ages:"6–8", level:"55 min", day:"Tue", time:"4:00 PM", coach:"Coach Emma", room:"Gym", cap:12, enrolled:12, tuition:87, roster:[{child:"Sam",family:"The Harmon Family"}], notes:"Full — waitlist open." },
      { id:"g2", program:"Gymnastics", name:"Rec Gym · Level 2", ages:"8–11", level:"55 min", day:"Wed", time:"5:00 PM", coach:"Coach Emma", room:"Gym", cap:12, enrolled:9, tuition:87, roster:[{child:"Ellie",family:"The Harmon Family"}] },
      { id:"g3", program:"Gymnastics", name:"Rec Gym · Level 3–4", ages:"9+", level:"85 min", day:"Mon", time:"5:30 PM", coach:"Coach Emma", room:"Gym", cap:10, enrolled:6, tuition:123, roster:[] },
      { id:"g4", program:"Gymnastics", name:"PreComp Team", ages:"8+", level:"85 min", day:"Tue & Thu", time:"5:30 PM", coach:"Coach Emma", room:"Gym", cap:12, enrolled:8, tuition:123, roster:[], notes:"Routines + mock meets." },
      { id:"n1", program:"Ninja", name:"Little Ninjas", ages:"3–5", level:"45 min", day:"Mon", time:"9:30 AM", coach:"Josh Terra", room:"Ninja Zone", cap:10, enrolled:7, tuition:70, roster:[{child:"Mateo",family:"Rivera Family"},{child:"Leo",family:"The Esposito Family"},{child:"Mia",family:"The Esposito Family"}] },
      { id:"n2", program:"Ninja", name:"Mighty Ninjas", ages:"3–5", level:"45 min", day:"Wed", time:"4:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:10, enrolled:9, tuition:70, roster:[{child:"Ruby",family:"The Bennett Family"}] },
      { id:"n3", program:"Ninja", name:"Ninja · White & Blue", ages:"6+", level:"55 min", day:"Tue", time:"5:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:12, enrolled:12, tuition:87, roster:[], notes:"Full — waitlist open." },
      { id:"n4", program:"Ninja", name:"Ninja · Red & Purple", ages:"6+", level:"55 min", day:"Thu", time:"5:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:12, enrolled:10, tuition:87, roster:[{child:"Owen",family:"Whitfield Family"}] },
      { id:"n5", program:"Ninja", name:"Ninja · Gray & Black", ages:"Advanced", level:"85 min", day:"Fri", time:"5:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:10, enrolled:6, tuition:123, roster:[] },
      { id:"c1", program:"Cheer", name:"Exhibition Cheer", ages:"5+", level:"Team", day:"Mon", time:"5:00 PM", coach:"Coach Jordan", room:"Gym B", cap:16, enrolled:13, tuition:95, roster:[{child:"Chloe",family:"The Bennett Family"}] },
      { id:"c2", program:"Cheer", name:"Ignite Competitive Team", ages:"8+", level:"Competitive", day:"Tue & Thu", time:"6:00 PM", coach:"Coach Jordan", room:"Gym B", cap:20, enrolled:16, tuition:175, roster:[{child:"Gabby",family:"The Esposito Family"}], notes:"Competes locally — 'Ignite'." },
      { id:"t1", program:"Tumbling", name:"Tumbling · Level 1", ages:"6+", level:"45 min", day:"Wed", time:"5:00 PM", coach:"Coach Mia", room:"Gym", cap:12, enrolled:6, tuition:70, roster:[] },
      { id:"t2", program:"Tumbling", name:"Tumbling · Level 2–3", ages:"8+", level:"55 min", day:"Fri", time:"4:00 PM", coach:"Coach Mia", room:"Gym", cap:12, enrolled:8, tuition:87, roster:[{child:"Ellie",family:"The Harmon Family"}] },
      { id:"s1", program:"STEAM", name:"STEAM & Play", ages:"K–5 · Homeschool", level:"85 min", day:"Wed", time:"1:00 PM", coach:"Katie Terra", room:"Learning Room", cap:14, enrolled:10, tuition:123, roster:[{child:"Zara",family:"Okonkwo Family"},{child:"Gabby",family:"The Esposito Family"},{child:"Leo",family:"The Esposito Family"},{child:"Mia",family:"The Esposito Family"}], notes:"Coding + robotics + hands-on science, then gym." },
      { id:"h1", program:"Homeschool", name:"Homeschool Ninja & Gym", ages:"6–12", level:"55 min", day:"Thu", time:"1:00 PM", coach:"Josh Terra", room:"Ninja Zone", cap:16, enrolled:13, tuition:87, roster:[{child:"Owen",family:"Whitfield Family"}], notes:"Daytime — same curriculum." },
      { id:"h2", program:"Homeschool", name:"Homeschool Rec Cheer", ages:"6–12", level:"Team", day:"Fri", time:"1:00 PM", coach:"Coach Jordan", room:"Gym B", cap:14, enrolled:5, tuition:95, roster:[], notes:"NEW for 2025–26." },
      { id:"cp1", program:"Camps", name:"Winter Break Camp", ages:"5–12", level:"Day camp", day:"Dec 22–24", time:"9 AM–3 PM", coach:"Coach Team", room:"Whole Gym", cap:30, enrolled:16, tuition:45, roster:[], status:"Upcoming", notes:"$45/day drop-off camp." }
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
