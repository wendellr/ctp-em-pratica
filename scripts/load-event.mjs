// Execute somente na janela combinada. HOST_KEY deve vir do ambiente, nunca de argumento.
import {performance} from 'node:perf_hooks';
if(!process.argv.includes('--confirm-window'))throw Error('Defina a janela com o responsável e use --confirm-window. Nenhuma requisição foi enviada.');
const origin=process.env.CTP_TEST_ORIGIN;if(!origin)throw Error('Configure CTP_TEST_ORIGIN.');
const key=process.env.HOST_KEY;if(!key)throw Error('Configure HOST_KEY no ambiente.');
const metrics=[];let cookie='',code='',stopped=false;
process.on('SIGINT',()=>{stopped=true;console.error('Interrupção solicitada. Finalizando apenas o gerador.');});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function api(path,body,id){const at=performance.now();let status=0;try{const r=await fetch(origin+'/api/'+path,{method:body!==undefined?'POST':'GET',headers:{...(body!==undefined?{'Content-Type':'application/json'}:{}),...(cookie?{cookie}:{}),...(id?{'X-Participant':id}:{})},body:body!==undefined?JSON.stringify(body):undefined,signal:AbortSignal.timeout(8000)});status=r.status;if(path==='login')cookie=r.headers.get('set-cookie')?.split(';')[0]||'';const d=await r.json();if(!r.ok)throw Error('HTTP '+r.status);return d}finally{metrics.push({ms:performance.now()-at,status});}}
function report(label,start){const a=metrics.slice(start),times=a.map(x=>x.ms).sort((a,b)=>a-b),errors=a.filter(x=>x.status<200||x.status>=300).length;const p95=times[Math.max(0,Math.ceil(times.length*.95)-1)]||0;console.log(JSON.stringify({stage:label,requests:a.length,p95ms:Math.round(p95),errors,errorRate:a.length?errors/a.length:0}));if(errors/a.length>.02||p95>3000)throw Error('Critério de interrupção atingido. Pare e avalie o servidor antes de continuar.');}
async function all(items,fn){const results=await Promise.allSettled(items.map(fn));const fail=results.find(x=>x.status==='rejected');if(fail)throw fail.reason}
try{
 await api('login',{key});code=(await api('sessions',{})).code;console.log('Sessão exclusiva de ensaio:',code);
 const ids=[];
 for(const total of [10,50,100,150]){if(stopped)break;const start=metrics.length;while(ids.length<total){const batch=Math.min(10,total-ids.length);const fresh=await Promise.all(Array.from({length:batch},()=>api(`sessions/${code}/join`,{})));ids.push(...fresh.map(x=>x.id));await sleep(300)}
 for(let round=0;round<10&&!stopped;round++){const now=performance.now();await all(ids,id=>api(`sessions/${code}`,undefined,id));await sleep(Math.max(0,1500-(performance.now()-now)))}report('poll-'+total,start);}
 if(stopped)throw Error('Teste interrompido pelo operador.');
 for(const round of [1,2]){await api(`sessions/${code}/action`,{action:'open'});const start=metrics.length;await all(ids,(id)=>api(`sessions/${code}/vote`,{mission:0,round,option:round===1?'a':'b',confidence:2},id));await all(ids.slice(0,30),id=>api(`sessions/${code}/join`,{id}));await all(ids.slice(0,30),id=>api(`sessions/${code}/vote`,{mission:0,round,option:round===1?'a':'b',confidence:3},id));await api(`sessions/${code}/action`,{action:'close'});const state=await api(`sessions/${code}/host`);if(state.stats.rounds[round].total!==ids.length)throw Error('Contagem divergente.');report('votes-'+round,start);if(round===1)await api(`sessions/${code}/action`,{action:'evidence'});}
 await api(`sessions/${code}/action`,{action:'reveal'});const final=await api(`sessions/${code}/host`);if(final.stats.paired!==150||final.stats.changed!==150)throw Error('Comparação pareada divergente.');console.log('Contagens e reconexão de identificadores conferidas. Isso não substitui teste físico de Wi-Fi/4G.');
}catch(e){console.error('Teste encerrado:',e.message);process.exitCode=1}
