import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateEvidence,makePacket,DEMOS} from '../src/analyzer.js';
test('empty notes and photos are not ready',()=>{const e=evaluateEvidence('',[]);assert.equal(e.score,0);assert.equal(e.ready,false);assert.equal(e.total,6)});
test('retail failure flags missing evidence rather than inventing it',()=>{const d=DEMOS['Retail outage'];const e=evaluateEvidence(d.notes,d.photos);assert(e.missing.length>0);assert.equal(e.ready,false)});
test('complete before and after samples can pass checklist',()=>{const d=DEMOS['Parking-lot lights'];const e=evaluateEvidence(d.notes,d.photos);assert.equal(e.ready,true)});
test('text alone cannot satisfy photo evidence',()=>{const d=DEMOS['Parking-lot lights'];const e=evaluateEvidence(d.notes,[]);assert.equal(e.checks.find(x=>x.id==='before').complete,false);assert.equal(e.checks.find(x=>x.id==='after').complete,false)});
test('export identifies human notes as unverified',()=>{const p=makePacket({id:'EX-1',site:'Test'},'Some note',[]);assert(p.includes('UNVERIFIED'));assert(p.includes('not a safety clearance'))});