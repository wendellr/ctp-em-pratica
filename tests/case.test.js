import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const c=JSON.parse(await readFile(new URL('../content/caso-01.json',import.meta.url),'utf8'));
test('case has a complete, uniquely addressable decision sequence',()=>{
 assert.equal(c.steps.length,8);
 assert.equal(new Set(c.steps.map(s=>s.id)).size,8);
 c.steps.forEach((s,i)=>{
  assert.equal(s.order,i+1);
  assert.equal(s.options.length,3);
  assert.equal(new Set(s.options.map(o=>o.id)).size,3);
  assert.equal(s.options.filter(o=>o.id===s.recommendedOptionId).length,1);
  for(const o of s.options){assert.ok(o.text.trim());assert.ok(o.feedback.trim());}
  assert.ok(s.discussion.trim());
 });
});
test('facilitator schedule fits the announced activity',()=>{
 const total=c.openingMinutes+c.closingMinutes+c.steps.reduce((n,s)=>n+s.durationMinutes,0);
 assert.equal(total,c.durationMinutes);
 assert.ok(total===30);
});
test('activity teaches generative AI with explicitly prepared examples',()=>{
 assert.equal(c.fictional,true);
 assert.equal(c.focus,'generative-ai-literacy');
 assert.equal(c.examplesOrigin,'prepared-not-live');
 assert.deepEqual(c.steps.map(s=>s.id),['escolha','prompt','contexto','confiabilidade','iteracao','avaliacao','dados','instituicao']);
 for(const step of c.steps){assert.ok(step.stimulus.trim());assert.ok(step.example.trim());assert.ok(['Lívia','Caio','Pingo'].includes(step.character));}
});

test('spreadsheet example retains its denominators and population',async()=>{
 const csv=await readFile(new URL('../content/formulario-ficticio.csv',import.meta.url),'utf8');
 const rows=csv.trim().split('\n').slice(1).map(row=>row.split(','));
 assert.equal(rows.reduce((n,r)=>n+Number(r[1]),0),35);
 assert.equal(rows.reduce((n,r)=>n+Number(r[2]),0),13);
 assert.equal(Number(rows[2][2])/Number(rows[2][1]),.6);
 assert.match(c.steps.find(s=>s.id==='dados').example,/13\/35/);
});
