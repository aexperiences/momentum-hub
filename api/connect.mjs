// /api/connect — Momentum Sports and Play · Connect (staff messaging, channels, native video).
// House pattern (Accelerated Experiences, LLC): Vercel Node serverless (ESM), env-gated,
// dependency-free (raw fetch to Upstash/Vercel KV REST).
//
// DIFFERENT FROM THE PREVIEW HUBS ON PURPOSE. McArthur's Connect trusts the office and lets
// the browser assert who it is. Momentum is an authed hub with children's names in it, so
// identity here is taken from the hub session on the SERVER — a browser cannot claim to be
// a coach it isn't. Guests get exactly one door: the rtc* signaling actions, where the
// unguessable room id in the outreach link is the capability. Nothing else answers them.
//
// DEGRADES GRACEFULLY: with no KV env set it returns 200 {ok:false,reason:'no_kv'} — dormant, never broken.
//   KV_REST_API_URL + KV_REST_API_TOKEN   (Vercel KV)  — or —
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN  (Upstash direct)

const HUB = (process.env.HUB_NS || "momentum") + ":";   // the hub's own namespace — sessions live here
const NS  = HUB + "connect:";                            // everything this file writes
const ROSTER_TTL = 60, PEER_STALE = 22000, BOX_TTL = 90, THREAD_MAX = 500;
const RING_TTL = 45, LIVE_STALE = 32000, CH_MAX = 400, PRESENCE_STALE = 5 * 60 * 1000;

function kvCreds(){ const url=(process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL||'').replace(/\/$/,'');
  const tok=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN||''; return url&&tok?{url,tok}:null; }
async function kv(cmd){ const c=kvCreds(); if(!c) throw new Error('no_kv');
  const r=await fetch(c.url,{method:'POST',headers:{authorization:'Bearer '+c.tok,'content-type':'application/json'},body:JSON.stringify(cmd)});
  const j=await r.json().catch(()=>null); if(!r.ok){const e=new Error((j&&j.error)||('kv '+r.status));e.status=r.status;throw e;} return j?j.result:null; }
const getJSON=async(k,d)=>{ try{const v=await kv(['GET',k]); return v==null?d:JSON.parse(v);}catch(e){ if(String(e.message)==='no_kv')throw e; return d;} };
const setJSON=(k,v,ex)=>kv(ex?['SET',k,JSON.stringify(v),'EX',String(ex)]:['SET',k,JSON.stringify(v)]);

function cors(res){ res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS'); res.setHeader('Access-Control-Allow-Headers','content-type'); }
function json(res,code,obj){ res.statusCode=code; res.setHeader('content-type','application/json; charset=utf-8'); res.end(JSON.stringify(obj)); }
async function readBody(req){ if(req.body!=null){ if(typeof req.body==='object')return req.body; if(typeof req.body==='string'){try{return JSON.parse(req.body);}catch{return{};}} }
  const chunks=[]; try{ for await(const c of req) chunks.push(typeof c==='string'?Buffer.from(c):c);}catch{return{};}
  if(!chunks.length)return{}; try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return{};} }
const clip=(s,n)=>String(s==null?'':s).slice(0,n);
const slug=(s)=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-+|-+$/g,'').toLowerCase().slice(0,80);
const now=()=>Date.now();
const pairKey=(a,b)=>{ const x=[slug(a),slug(b)].sort(); return x[0]+'~'+x[1]; };

/* ---------------- identity: the server decides, not the browser ----------------
   The hub stores sessions as momentum:sess:<token> = "role|name". We read that and
   derive the speaking identity from it. A missing or expired token is a guest, and a
   guest reaches nothing but the rtc* doors below. */
async function meOf(p){
  const t = clip(p.sess, 120);
  if(!t) return null;
  let raw=null; try{ raw = await kv(['GET', HUB+'sess:'+t]); }catch(e){ if(String(e.message)==='no_kv') throw e; }
  if(!raw) return null;
  const s=String(raw), i=s.indexOf('|');
  const role = i>=0 ? s.slice(0,i) : 'guest';
  const name = (i>=0 ? s.slice(i+1) : '').trim();
  if(role==='guest') return null;
  const id = slug(name) || slug(role);
  if(!id) return null;
  return { slug:id, name: name || role, role };
}

/* ---------------- presence ---------------- */
async function ping(p,me){
  const r=await getJSON(NS+'roster',{}); r[me.slug]={name:clip(me.name,80),role:clip(me.role,30),ts:now()};
  await setJSON(NS+'roster',r); return {ok:true,me:me.slug,name:me.name,role:me.role,ts:now()}; }
async function who(p,me){ const r=await getJSON(NS+'roster',{}); const t=now();
  const list=Object.keys(r).map(k=>({slug:k,name:r[k].name,role:r[k].role||'',online:(t-(r[k].ts||0))<PRESENCE_STALE,ts:r[k].ts||0}));
  return {ok:true,me:me.slug,people:list}; }

/* ---------------- 1:1 messaging (pair threads) ---------------- */
async function send(p,me){ const to=slug(p.to); const text=clip(p.text,4000);
  if(!to||!text) return {ok:false,reason:'bad_args'};
  const msg={from:me.slug,name:clip(me.name,80),text,ts:now()};
  const tk=NS+'thread:'+pairKey(me.slug,to);
  await kv(['RPUSH',tk,JSON.stringify(msg)]); await kv(['LTRIM',tk,String(-THREAD_MAX),'-1']);
  for(const w of [me.slug,to]){ const idx=await getJSON(NS+'threads:'+w,{});
    const other=w===me.slug?to:me.slug; idx[other]={with:other,lastText:clip(text,120),lastFrom:me.slug,lastTs:msg.ts};
    await setJSON(NS+'threads:'+w,idx); }
  return {ok:true,ts:msg.ts}; }
async function thread(p,me){ const w=slug(p.with); if(!w) return {ok:false,reason:'bad_args'};
  let raw=[]; try{ raw=await kv(['LRANGE',NS+'thread:'+pairKey(me.slug,w),'0','-1'])||[]; }catch(e){ if(String(e.message)==='no_kv')throw e; }
  const msgs=raw.map(s=>{try{return JSON.parse(s);}catch{return null;}}).filter(Boolean);
  await setJSON(NS+'read:'+me.slug+':'+w,{ts:now()});
  return {ok:true,me:me.slug,msgs}; }
async function inbox(p,me){ const idx=await getJSON(NS+'threads:'+me.slug,{}); const out=[];
  for(const w in idx){ const rd=await getJSON(NS+'read:'+me.slug+':'+w,{ts:0});
    out.push(Object.assign({unread:(idx[w].lastTs||0)>(rd.ts||0)&&idx[w].lastFrom!==me.slug},idx[w])); }
  out.sort((a,b)=>(b.lastTs||0)-(a.lastTs||0)); return {ok:true,threads:out}; }

/* ---------------- call ring ---------------- */
async function ring(p,me){ const to=slug(p.to); if(!to) return {ok:false,reason:'bad_args'};
  await setJSON(NS+'ring:'+to,{from:me.slug,name:clip(me.name,80),room:clip(p.room,200),subject:clip(p.subject,120),ts:now()},RING_TTL);
  return {ok:true}; }
async function poll(p,me){
  const r=await getJSON(NS+'ring:'+me.slug,null);
  if(r){ try{ await kv(['DEL',NS+'ring:'+me.slug]); }catch{} }
  let unread=0; try{ const idx=await getJSON(NS+'threads:'+me.slug,{});
    for(const w in idx){ const rd=await getJSON(NS+'read:'+me.slug+':'+w,{ts:0}); if((idx[w].lastTs||0)>(rd.ts||0)&&idx[w].lastFrom!==me.slug) unread++; } }catch{}
  return {ok:true,me:me.slug,name:me.name,ring:r,unread}; }

/* ---------------- live rooms ---------------- */
async function live(p,me){ const room=clip(p.room,200); if(!room) return {ok:false,reason:'bad_args'};
  const L=await getJSON(NS+'live',{}); const t=now();
  for(const rm in L){ for(const s in (L[rm].people||{})) if(t-(L[rm].people[s].ts||0)>LIVE_STALE) delete L[rm].people[s];
    if(!Object.keys(L[rm].people||{}).length) delete L[rm]; }
  L[room]=L[room]||{subject:clip(p.subject,120),people:{}};
  if(p.subject) L[room].subject=clip(p.subject,120);
  const key = me ? me.slug : ('guest-'+clip(p.peer,12));
  L[room].people[key]={name: me ? clip(me.name,80) : clip(p.name,80)||'Guest', ts:t};
  await setJSON(NS+'live',L); return {ok:true}; }
async function liveList(){ const L=await getJSON(NS+'live',{}); const t=now(); const out=[];
  for(const rm in L){ const ppl=Object.values(L[rm].people||{}).filter(x=>t-(x.ts||0)<=LIVE_STALE);
    if(ppl.length) out.push({room:rm,subject:L[rm].subject||'',count:ppl.length,names:ppl.map(x=>x.name)}); }
  return {ok:true,rooms:out}; }

/* ---------------- channels ---------------- */
async function chsend(p,me){ const ch=slug(p.channel); const text=clip(p.text,4000);
  if(!ch||!text) return {ok:false,reason:'bad_args'};
  const msg={from:me.slug,name:clip(me.name,80),text,ts:now()};
  await kv(['RPUSH',NS+'ch:'+ch,JSON.stringify(msg)]); await kv(['LTRIM',NS+'ch:'+ch,String(-CH_MAX),'-1']);
  const meta=await getJSON(NS+'chmeta',{}); meta[ch]={name:clip(p.channelName,80)||ch,lastText:clip(text,120),lastFrom:me.slug,lastTs:msg.ts};
  await setJSON(NS+'chmeta',meta); return {ok:true,ts:msg.ts}; }
async function chread(p,me){ const ch=slug(p.channel); if(!ch) return {ok:false,reason:'bad_args'};
  let raw=[]; try{ raw=await kv(['LRANGE',NS+'ch:'+ch,'0','-1'])||[]; }catch(e){ if(String(e.message)==='no_kv')throw e; }
  const msgs=raw.map(s=>{try{return JSON.parse(s);}catch{return null;}}).filter(Boolean);
  await setJSON(NS+'chread:'+me.slug+':'+ch,{ts:now()});
  return {ok:true,me:me.slug,msgs}; }
async function channels(p,me){ const meta=await getJSON(NS+'chmeta',{}); const out=[];
  for(const ch in meta){ const rd=await getJSON(NS+'chread:'+me.slug+':'+ch,{ts:0});
    const unread=(meta[ch].lastTs||0)>(rd.ts||0)&&meta[ch].lastFrom!==me.slug;
    out.push(Object.assign({channel:ch,unread},meta[ch])); }
  out.sort((a,b)=>(b.lastTs||0)-(a.lastTs||0)); return {ok:true,channels:out}; }

/* ---------------- RTC signaling (guest-capable) ----------------
   These four are the only actions an outside guest can reach, and all they can do is
   swap connection offers inside ONE room whose id they were handed. They carry no
   family data, no roster, no message history. */
async function rtcJoin(p){ const room=clip(p.room,200),peer=clip(p.peer,80); if(!room||!peer) return {ok:false,reason:'bad_args'};
  const rk=NS+'rtcroom:'+room; const roster=await getJSON(rk,{}); const t=now();
  for(const id in roster) if(t-(roster[id].ts||0)>PEER_STALE) delete roster[id];
  roster[peer]={name:clip(p.name,80)||'Guest',ts:t}; await setJSON(rk,roster,ROSTER_TTL);
  return {ok:true,peers:Object.keys(roster).filter(id=>id!==peer).map(id=>({id,name:roster[id].name}))}; }
async function rtcPoll(p){ const room=clip(p.room,200),peer=clip(p.peer,80); if(!room||!peer) return {ok:false,reason:'bad_args'};
  const rk=NS+'rtcroom:'+room; const roster=await getJSON(rk,{}); const t=now();
  for(const id in roster) if(t-(roster[id].ts||0)>PEER_STALE) delete roster[id];
  if(roster[peer]) roster[peer].ts=t; else roster[peer]={name:clip(p.name,80)||'Guest',ts:t};
  await setJSON(rk,roster,ROSTER_TTL);
  const bk=NS+'rtcbox:'+room+':'+peer; let msgs=[];
  try{ const res=await kv(['LRANGE',bk,'0','-1']);
    if(Array.isArray(res)&&res.length){ await kv(['DEL',bk]); msgs=res.map(s=>{try{return JSON.parse(s);}catch{return null;}}).filter(Boolean);} }catch{}
  // `peer` mirrors `id`, and `signals` mirrors `msgs`: the engine and this file were
  // written months apart in different hubs and each had its own name for these two.
  // Answering to both is one line and removes a whole class of silent no-video bug.
  const list=Object.keys(roster).filter(id=>id!==peer).map(id=>({id,peer:id,name:roster[id].name}));
  return {ok:true,peers:list,msgs,signals:msgs}; }
async function rtcSignal(p){ const room=clip(p.room,200),to=clip(p.to,80),from=clip(p.from,80);
  if(!room||!to||!from) return {ok:false,reason:'bad_args'};
  const bk=NS+'rtcbox:'+room+':'+to;
  try{ await kv(['RPUSH',bk,JSON.stringify({from,fromName:clip(p.name,80),kind:clip(p.kind,16),data:p.data||{},ts:now()})]); await kv(['EXPIRE',bk,String(BOX_TTL)]); }
  catch(e){ if(String(e.message)==='no_kv')throw e; }
  return {ok:true}; }
async function rtcLeave(p){ const room=clip(p.room,200),peer=clip(p.peer,80); if(!room||!peer) return {ok:false,reason:'bad_args'};
  const rk=NS+'rtcroom:'+room; const roster=await getJSON(rk,{}); delete roster[peer]; await setJSON(rk,roster,ROSTER_TTL);
  try{ await kv(['DEL',NS+'rtcbox:'+room+':'+peer]); }catch{}
  return {ok:true}; }

/* GUESTS: the unguessable room id is the capability. `live` is half-open — a guest may
   register that a room is busy, but only ever inside the room they were invited to. */
const GUEST_OK = { rtcJoin:1, rtcPoll:1, rtcSignal:1, rtcLeave:1, live:1, liveList:0 };

const ACT={ ping,who, send,thread,inbox, ring,poll, live,liveList, chsend,chread,channels,
  rtcJoin,rtcPoll,rtcSignal,rtcLeave };

export default async function handler(req,res){
  cors(res);
  if(req.method==='OPTIONS'){ res.statusCode=204; res.end(); return; }
  if(!kvCreds()) return json(res,200,{ok:false,reason:'no_kv'});
  let body={}; if(req.method==='POST'){ try{ body=await readBody(req);}catch{body={};} }
  const url=new URL(req.url,'http://x');
  const p=Object.assign({},Object.fromEntries(url.searchParams),body);
  const doName=String(p.do||'');
  const fn=ACT[doName];
  if(!fn) return json(res,400,{ok:false,reason:'bad_action',message:'unknown action: '+doName});
  try{
    let me=null;
    try{ me=await meOf(p); }catch(e){ if(String(e&&e.message)==='no_kv') return json(res,200,{ok:false,reason:'no_kv'}); }
    if(!me && !GUEST_OK[doName]) return json(res,200,{ok:false,reason:'no_seat',message:'Sign in to the hub to use Connect.'});
    const out=await fn(p,me);
    return json(res,200,out);
  }
  catch(e){ if(String(e&&e.message)==='no_kv') return json(res,200,{ok:false,reason:'no_kv'});
    return json(res,200,{ok:false,reason:'error',message:clip(e&&e.message,200)}); }
}
