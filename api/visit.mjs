// /api/visit — Momentum Sports and Play · the visit log.
// House pattern (Accelerated Experiences, LLC): Vercel Node serverless (ESM), env-gated,
// dependency-free (raw fetch to Upstash/Vercel KV REST).
//
// WHY THIS EXISTS. The hub is a gift in the client's hands. Anthony needs to see whether
// and when it is being opened — date, time, page, and the visitor's IP — without asking
// the client and without a third-party analytics script. Every page fires one small
// beacon here; the server records what the edge already knows about the request.
//
// WHAT IT IS NOT. Not analytics, not tracking across sites, not a directory. One list,
// visible to admin/manager seats only, capped at the most recent 2,000 pageviews.
// Reading the log requires a real owner seat — the wide-open demo seat gets nothing.
//
// DEGRADES GRACEFULLY: with no KV env set every action returns 200 {ok:false,reason:'no_kv'}.

const HUB = (process.env.HUB_NS || "momentum") + ":";
const KEY = HUB + "visitlog";          // a Redis list, newest first
const KEEP = 2000;                     // LTRIM cap — roughly months of a small gym's traffic
const PAGE_MAX = 500;                  // most rows one 'list' call returns

function kvCreds(){ const url=(process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL||'').replace(/\/$/,'');
  const tok=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN||''; return url&&tok?{url,tok}:null; }
async function kv(cmd){ const c=kvCreds(); if(!c) throw new Error('no_kv');
  const r=await fetch(c.url,{method:'POST',headers:{authorization:'Bearer '+c.tok,'content-type':'application/json'},body:JSON.stringify(cmd)});
  const j=await r.json().catch(()=>null); if(!r.ok){const e=new Error((j&&j.error)||('kv '+r.status));e.status=r.status;throw e;} return j?j.result:null; }

function json(res,code,obj){ res.statusCode=code; res.setHeader('content-type','application/json; charset=utf-8'); res.end(JSON.stringify(obj)); }
function cors(res){ res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers','content-type'); }
async function readBody(req){ if(req.body!=null){ if(typeof req.body==='object')return req.body; if(typeof req.body==='string'){try{return JSON.parse(req.body);}catch{return{};}} }
  const chunks=[]; try{ for await(const c of req) chunks.push(typeof c==='string'?Buffer.from(c):c);}catch{return{};}
  if(!chunks.length)return{}; try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return{};} }
const clip=(s,n)=>String(s==null?'':s).slice(0,n);

// Same identity rule as Connect: the server reads the seat off the session token.
// A browser cannot claim to be a seat it isn't, and a missing token is simply a visitor.
async function seatOf(sess){
  const t=clip(sess,120); if(!t) return null;
  let raw=null; try{ raw=await kv(['GET', HUB+'sess:'+t]); }catch(e){ if(String(e.message)==='no_kv') throw e; }
  if(!raw) return null;
  const s=String(raw), i=s.indexOf('|');
  return { role: i>=0?s.slice(0,i):'guest', name: (i>=0?s.slice(i+1):'').trim() };
}

// The edge already knows all of this — we only write it down.
function requestFacts(req){
  const h=req.headers||{};
  const ip = clip(String(h['x-forwarded-for']||'').split(',')[0].trim() || h['x-real-ip'] || '', 46);
  let city=''; try{ city=decodeURIComponent(String(h['x-vercel-ip-city']||'')); }catch(e){ city=String(h['x-vercel-ip-city']||''); }
  return { ip,
    city:  clip(city,60),
    reg:   clip(h['x-vercel-ip-country-region']||'',12),
    co:    clip(h['x-vercel-ip-country']||'',6),
    ua:    clip(h['user-agent']||'',180) };
}

export default async function handler(req,res){
  cors(res);
  if(req.method==='OPTIONS'){ res.statusCode=204; res.end(); return; }
  if(req.method!=='POST'){ json(res,405,{ok:false,error:'POST only'}); return; }
  const p=await readBody(req);
  const action=clip(p.action,20)||'hit';

  try{
    if(action==='hit'){
      // Anyone may be counted — that is the point. Nothing is returned to them.
      const f=requestFacts(req);
      let who='';
      try{ const seat=await seatOf(p.sess); if(seat && seat.role!=='guest') who=clip(seat.role,30)+'|'+clip(seat.name,60); }catch(e){ if(String(e.message)==='no_kv'){ json(res,200,{ok:false,reason:'no_kv'}); return; } }
      const entry={ t:Date.now(), p:clip(p.path,120)||'/', ip:f.ip, city:f.city, reg:f.reg, co:f.co, ua:f.ua, who, ref:clip(p.ref,140) };
      await kv(['LPUSH', KEY, JSON.stringify(entry)]);
      await kv(['LTRIM', KEY, '0', String(KEEP-1)]);
      json(res,200,{ok:true}); return;
    }

    if(action==='list'){
      // Owner eyes only. The demo seat, a parent, a coach, a forged token — all refused.
      const seat=await seatOf(p.sess);
      if(!seat || (seat.role!=='admin' && seat.role!=='manager')){ json(res,200,{ok:false,reason:'no_seat'}); return; }
      const n=Math.max(1,Math.min(PAGE_MAX, parseInt(p.n,10)||PAGE_MAX));
      const raw=await kv(['LRANGE', KEY, '0', String(n-1)]) || [];
      const rows=[]; for(const s of raw){ try{ rows.push(JSON.parse(s)); }catch(e){} }
      const total=await kv(['LLEN', KEY]);
      json(res,200,{ok:true, rows, total: Number(total)||rows.length, cap:KEEP}); return;
    }

    json(res,400,{ok:false,error:'UNKNOWN_ACTION'});
  }catch(e){
    if(String(e.message)==='no_kv'){ json(res,200,{ok:false,reason:'no_kv'}); return; }
    json(res,200,{ok:false,error:'kv_error'});
  }
}
