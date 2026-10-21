export async function requestJSON(url,{body,headers={},signal,timeout=8000,fetcher=fetch}={}){
 const controller=new AbortController();const abort=()=>controller.abort();
 if(signal?.aborted)controller.abort();else signal?.addEventListener('abort',abort,{once:true});
 const timer=setTimeout(()=>controller.abort(),timeout);
 try{
  const response=await fetcher(url,{method:body!==undefined?'POST':'GET',headers:{...(body!==undefined?{'Content-Type':'application/json'}:{}),...headers},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:controller.signal,cache:'no-store'});
  let data;try{data=await response.json()}catch{const e=Error('Servidor indisponível. Aguarde e tente novamente.');e.status=response.status;throw e}
  if(!response.ok){const e=Error(data.error||'Falha de conexão.');e.status=response.status;throw e}return data;
 }catch(e){if(controller.signal.aborted){const error=Error(signal?.aborted?'Consulta cancelada.':'A conexão demorou demais. Tentando reconectar.');error.name='AbortError';throw error}throw e}
 finally{clearTimeout(timer);signal?.removeEventListener('abort',abort)}
}
export class PollingLoop{
 constructor({read,onState,onError,delay=1500}){Object.assign(this,{read,onState,onError,delay});this.generation=0;this.flight=null;this.interval=null;this.controller=null}
 invalidate(){this.generation++;this.controller?.abort();this.flight=null}
 stop(){clearInterval(this.interval);this.interval=null;this.invalidate()}
 start(){this.stop();this.interval=setInterval(()=>this.run(),this.delay);return this.run()}
 run(){if(this.flight)return this.flight;const generation=this.generation;const controller=new AbortController();this.controller=controller;
  const promise=Promise.resolve().then(()=>this.read(controller.signal)).then(value=>{if(generation===this.generation)this.onState(value)}).catch(error=>{if(generation===this.generation)this.onError(error)}).finally(()=>{if(this.flight===promise)this.flight=null});
  this.flight=promise;return promise;
 }
}
