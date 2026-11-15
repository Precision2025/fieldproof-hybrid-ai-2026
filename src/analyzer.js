/** FieldProof's transparent, deterministic evidence rubric. It never diagnoses electrical work. */
export const CHECKS = [
 {id:'arrival',label:'Arrival & access',tip:'Record access, arrival / departure, and the exact affected area.',test:(t)=>/arriv|access|entered|check.?in|on.?site|at (the )?(site|property)|location/i.test(t)},
 {id:'before',label:'Before-condition evidence',tip:'Document the condition as found and include a before photo.',test:(t,p)=>/before|observ|reported|found|initial|existing|symptom|tripp|flicker|outage|not work/i.test(t)&&p.some(x=>x.stage==='before')},
 {id:'action',label:'Work performed',tip:'State what you did, without implying a test or repair not documented.',test:(t)=>/replac|install|repaired|adjust|isolat|inspect|reset|tested|measur|reterminat|clean|secured|troubleshoot/i.test(t)},
 {id:'after',label:'After-condition evidence',tip:'Record the observed state after work and attach an after photo.',test:(t,p)=>/after|restored|verified|functional|operat|post.?service|completed|passed|not resolved/i.test(t)&&p.some(x=>x.stage==='after')},
 {id:'verification',label:'Verification notes',tip:'Record who observed the final condition and the actual outcome; do not invent readings.',test:(t)=>/verif|tested|measur|confirmed|checked|witness|not resolved|unable to test/i.test(t)},
 {id:'customer',label:'Customer handoff',tip:'Capture approval, customer response, or explicit pending handoff.',test:(t)=>/(?:notified|contacted|informed|updated)\s+(?:the\s+)?(?:customer|manager|tenant|representative)|(?:customer|manager|tenant|representative)\s+(?:confirmed|approved|signed|accepted|declined|was notified|was informed|was contacted)|handoff\s*(?:complete|pending|attempted)/i.test(t)}
];
export function evaluateEvidence(notes='',photos=[]){
 const clean=String(notes).trim();
 const checks=CHECKS.map(c=>({...c,complete:Boolean(c.test(clean,photos))}));
 const score=checks.filter(c=>c.complete).length;
 return {checks,score,total:checks.length,percent:Math.round(100*score/checks.length),missing:checks.filter(x=>!x.complete).map(x=>x.label),ready:score===checks.length,notes:clean,photoCount:photos.length};
}
export function makePacket(job,notes,photos=[]){
 const q=evaluateEvidence(notes,photos);
 return [
   `FIELDPROOF • FIELD EVIDENCE PACKET`,
   `Job: ${job?.id||'Untitled'} | Site: ${job?.site||'Not provided'}`,
   `Generated: ${new Date().toISOString()}`,
   `Evidence: ${q.score}/${q.total} checks | ${photos.length} locally referenced photos`,
   '', 'TECHNICIAN NOTES (UNVERIFIED; HUMAN-ENTERED)', q.notes||'[No notes recorded]',
   '', 'MISSING / REQUIRES CONFIRMATION',
   ...(q.missing.length?q.checks.filter(x=>!x.complete).map(x=>`• ${x.label}: ${x.tip}`):['• None flagged by the text-based rubric. Human review still required.']),
   '', 'PHOTO INDEX',...(photos.length?photos.map((p,i)=>`• ${i+1}. ${p.name} — ${p.stage} — ${p.size} bytes`):['• No photos attached']),
   '', 'REVIEW WARNING: This is a documentation audit, not a safety clearance or certification. Do not infer tests, parts, readings or signatures not supplied.'
 ].join('\n');
}
export const DEMOS={
 'Parking-lot lights':{id:'WO-2048',site:'North service lot • Dallas, TX',notes:'On site 8:12 PM, manager reported two parking-lot fixtures flickering near the loading bay. Before service: observed intermittent light output, no exposed conductors visible. Inspected fixture supply and documented the conditions. After work: one fixture restored, second fixture not resolved pending replacement part. Confirmed outcome with site manager and notified customer of return visit.',photos:[{name:'before-bay.jpg',stage:'before',size:742100},{name:'after-bay.jpg',stage:'after',size:651200}]},
 'Retail outage':{id:'WO-5103',site:'Retail back room • Plano, TX',notes:'Tenant said the circuit is down. Inspected panel and noted the condition. Need to come back.',photos:[]},
 'EV charging':{id:'WO-7776',site:'Commercial garage • Richardson, TX',notes:'Checked in 10:15 AM at facility garage. Site contact confirmed an EV charger is offline. Before photo recorded, inspected equipment and documented labels. Verified the charger still displays a fault; customer notified. No repair performed; customer to approve return scope.',photos:[{name:'charger-fault-before.jpg',stage:'before',size:814933}]}
};