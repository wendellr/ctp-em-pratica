import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {timingSafeEqual} from 'node:crypto';
import {newToken,createSession,advance,vote,publicState} from './live/session.js';
const root=process.cwd(),missions=JSON.parse(await readFile(resolve(root,'live/missions.json'),'utf8'));
const secret=process.env.HOST_KEY;if(!secret||secret.length<32)throw Error('Configure HOST_KEY com pelo menos 32 caracteres.');
const sessions=new Map(),admins=new Map(),attempts=new Map();
const equal=(a,b)=>{const x=Buffer.from(a||''),y=Buffer.from(b||'');return x.length===y.length&&timingSafeEqual(x,y)};
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data))};
function isAdmin(req){const cookie=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('ctp_host='))?.slice(9);return (admins.get(cookie)||0)>Date.now()}
async function body(req){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>4096)throw Error('Pedido muito grande.')}return JSON.parse(raw||'{}')}
const server=http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://local'),path=url.pathname;
 if(path==='/health'){res.writeHead(200,{'Content-Type':'text/plain'});res.end('ok\n');return}
 if(path.startsWith('/api/')){
  if(req.method==='POST'&&req.headers.origin&&req.headers.origin!==`${req.headers['x-forwarded-proto']||'http'}://${req.headers.host}`)return json(res,403,{error:'Origem não autorizada.'});
  if(path==='/api/login'&&req.method==='POST'){const ip=req.headers['x-real-ip']||req.socket.remoteAddress,now=Date.now();const rate=attempts.get(ip)||{n:0,start:now};if(now-rate.start>600000){rate.n=0;rate.start=now}rate.n++;attempts.set(ip,rate);if(rate.n>15)return json(res,429,{error:'Muitas tentativas. Aguarde dez minutos.'});const b=await body(req);if(!equal(b.key,secret))return json(res,401,{error:'Chave incorreta.'});const t=newToken();admins.set(t,now+12*3600000);res.setHeader('Set-Cookie',`ctp_host=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200${req.headers['x-forwarded-proto']==='https'?'; Secure':''}`);return json(res,200,{ok:true})}
  if(path==='/api/me')return json(res,isAdmin(req)?200:401,{ok:isAdmin(req)});
  if(path==='/api/logout'&&req.method==='POST'){res.setHeader('Set-Cookie','ctp_host=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return json(res,200,{ok:true})}
  if(path==='/api/sessions'&&req.method==='POST'){if(!isAdmin(req))return json(res,401,{error:'Entre como apresentador.'});if(sessions.size>=50)return json(res,409,{error:'Limite de sessões. Aguarde a expiração.'});let code;do{code=String(Math.floor(100000+Math.random()*900000))}while(sessions.has(code));const s=createSession(code);sessions.set(code,s);return json(res,201,{code})}
  const match=path.match(/^\/api\/sessions\/(\d{6})(?:\/(join|vote|action|host))?$/);if(!match)return json(res,404,{error:'Rota não encontrada.'});
  const [,code,action]=match,s=sessions.get(code);if(!s||s.expires<Date.now())return json(res,404,{error:'Sessão inexistente ou expirada.'});
  if(req.method==='GET'){if(action==='host'&&!isAdmin(req))return json(res,401,{error:'Entre como apresentador.'});if(action&&action!=='host')return json(res,405,{error:'Método inválido.'});const state=publicState(s,missions[s.mission],action==='host');const id=req.headers['x-participant'];if(s.people.has(id)){s.people.set(id,Date.now());state.myVote=s.votes[s.mission][s.round].get(id)||null}return json(res,200,state)}
  if(req.method!=='POST')return json(res,405,{error:'Método inválido.'});const b=await body(req);
  if(action==='join'){let id=typeof b.id==='string'&&s.people.has(b.id)?b.id:null;if(!id){if(s.people.size>=2000)return json(res,409,{error:'Sessão lotada.'});id=newToken()}s.people.set(id,Date.now());return json(res,200,{id})}
  if(action==='vote'){vote(s,req.headers['x-participant'],b,missions[s.mission]);return json(res,200,{ok:true})}
  if(action==='action'){if(!isAdmin(req))return json(res,401,{error:'Entre como apresentador.'});advance(s,b.action,missions.length);return json(res,200,{ok:true})}
  return json(res,404,{error:'Rota não encontrada.'});
 }
 if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'Método inválido.'});
 const aliases={'/apresentador':'/live/host.html','/participar':'/live/join.html','/projecao':'/live/screen.html'};const rel=aliases[path]||(path==='/'?'/index.html':path);
 if(!/^\/(?:index\.html|app\.js|assets\/[\w.-]+|content\/(?:caso-01\.json|formulario-ficticio\.csv)|live\/(?:host\.html|join\.html|screen\.html|live\.js|network\.js|live\.css|qr\.js))$/.test(rel))return json(res,404,{error:'Arquivo não encontrado.'});
 const file=resolve(root,'.'+rel);if(!file.startsWith(root+sep))return json(res,404,{error:'Arquivo não encontrado.'});await stat(file);const data=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.csv':'text/csv; charset=utf-8'})[extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY'});res.end(req.method==='HEAD'?undefined:data);
 }catch(e){if(e.code==='ENOENT')json(res,404,{error:'Arquivo não encontrado.'});else json(res,400,{error:e.message==='Unexpected end of JSON input'?'Pedido inválido.':e.message})}});
setInterval(()=>{for(const [code,s]of sessions)if(s.expires<Date.now())sessions.delete(code);for(const [k,t]of admins)if(t<Date.now())admins.delete(k);for(const [k,r]of attempts)if(Date.now()-r.start>600000)attempts.delete(k)},60000).unref();
server.listen(Number(process.env.PORT||8080),'0.0.0.0');
