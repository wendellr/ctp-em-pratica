import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const c=JSON.parse(await readFile(new URL('../content/caso-01.json',import.meta.url),'utf8'));
test('case has a complete, uniquely addressable decision sequence',()=>{
 assert.equal(c.steps.length,5);
 assert.equal(new Set(c.steps.map(s=>s.id)).size,5);
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
 assert.ok(total>=20&&total<=25);
});
test('activity teaches generative AI with explicitly prepared examples',()=>{
 assert.equal(c.fictional,true);
 assert.equal(c.focus,'generative-ai-literacy');
 assert.equal(c.examplesOrigin,'prepared-not-live');
 assert.deepEqual(c.steps.map(s=>s.id),['prompt','contexto','confiabilidade','iteracao','avaliacao']);
 for(const step of c.steps){assert.ok(step.stimulus.trim());assert.ok(step.example.trim());assert.ok(['Lívia','Caio','Pingo'].includes(step.character));}
});
