'use client';

import { useState } from 'react';

const stages=[
  {id:'diagnose',n:'01',name:'Diagnose',short:'FirstLine',detail:'A business completes a structured presence diagnostic. The answers become source material for a draft AI brief—not an automatic sales message.',records:['Diagnostic response','Raw diagnostic notes','Readiness & priority','Draft first message'],gate:'Human review before any first message is sent.'},
  {id:'discover',n:'02',name:'Discover',short:'Conversation',detail:'A real conversation moves a prospect from Briefed to Discovery. The system records the next step and keeps the relationship stage explicit.',records:['Client record','Discovery notes','Needs & constraints','Next action'],gate:'A diagnostic alone does not mean a sales conversation has happened.'},
  {id:'scope',n:'03',name:'Scope',short:'Proposal',detail:'A suitable package and delivery scope are agreed before an engagement becomes an active project.',records:['Package selection','Quoted amount','Deliverables summary','Start & due dates'],gate:'A proposal is not an active engagement until the work starts.'},
  {id:'deliver',n:'04',name:'Deliver',short:'Project OS',detail:'The client record links to a project. The project links to delivery tasks, with task completion rolled up to show progress.',records:['Project record','Task checklist','Progress rollups','Payment status'],gate:'Task completion informs review; handover and client approval remain human steps.'},
  {id:'handover',n:'05',name:'Handover',short:'Support',detail:'Completed work is reviewed, handed over and moved into the appropriate support period. Reusable assets improve the next engagement.',records:['Review & approval','Completed date','Handover record','Support & optimisation'],gate:'Delivered and ongoing support are distinct lifecycle states.'}
];
const packages=[
  {id:'foundation',name:'Foundation',level:'01',summary:'Establish a credible digital presence and the basic customer contact path.',items:['Business documentation pack','Google Business Profile setup','Mobile-first website','WhatsApp click-to-chat & greeting','Maps / NAP consistency','Handover training']},
  {id:'growth',name:'Growth',level:'02',summary:'Connect customer enquiries to simple records, responses and repeatable workflows.',items:['Everything in Foundation','Customer & order database','Chatbot / auto-responder','Basic enquiry automation','Simple admin view','Notion workspace starter','14-day light support']},
  {id:'operating-system',name:'Operating System',level:'03',summary:'Integrate the core workflows, records and team operations of a small business.',items:['Everything in Growth','Integrated mini operating system','Custom sales workflow','Lightweight internal dashboard','Document & knowledge system','Team access setup','30-day support & optimisation review']},
  {id:'custom',name:'Custom',level:'04',summary:'A scoped engagement for needs that do not fit a standard package.',items:['Discovery-led scope','Defined deliverables','Agreed milestones','Named dependencies','Acceptance and handover criteria']}
];
export default function HubilArchitecture(){
 const [stage,setStage]=useState('diagnose');
 const [pack,setPack]=useState('growth');
 const current=stages.find(x=>x.id===stage)||stages[0];
 const selected=packages.find(x=>x.id===pack)||packages[1];
 return <section id="hubil" className="hubil-architecture" aria-labelledby="hubil-title">
  <div className="hubil-heading"><div><p className="hubil-kicker">HUBIL GROUP / COMMERCIAL SYSTEMS</p><h2 id="hubil-title">From a business problem<br/>to a <em>working system.</em></h2></div><p>A delivery architecture for helping small businesses move from diagnosis to a structured, supportable digital operation.</p></div>
  <div className="hubil-system-bar"><span><i/> CLIENT DELIVERY ARCHITECTURE</span><span>FIRSTLINE → PROJECT → HANDOVER</span></div>
  <div className="hubil-flow" role="tablist" aria-label="Hubil client delivery stages">
   {stages.map((s,i)=><button type="button" role="tab" aria-selected={stage===s.id} aria-controls="hubil-stage-detail" key={s.id} onClick={()=>setStage(s.id)}><span>{s.n}</span><b>{s.name}</b><small>{s.short}</small>{i!==stages.length-1&&<i aria-hidden="true">→</i>}</button>)}
  </div>
  <div className="hubil-stage-detail" id="hubil-stage-detail" role="tabpanel">
   <div><span className="hubil-detail-index">{current.n} / {current.name.toUpperCase()}</span><h3>{current.detail}</h3><p>{current.gate}</p></div>
   <div className="hubil-records"><span>RECORDS CREATED OR UPDATED</span>{current.records.map((r,i)=><div key={r}><i>0{i+1}</i>{r}</div>)}</div>
  </div>
  <div className="hubil-package-heading"><div><span>THE SERVICE ARCHITECTURE</span><h3>Four ways to build the right foundation.</h3></div><p>Packages define the scope of delivery. The client, project and task records track the actual work.</p></div>
  <div className="hubil-packages" role="tablist" aria-label="Hubil service packages">{packages.map(p=><button key={p.id} type="button" role="tab" aria-selected={pack===p.id} onClick={()=>setPack(p.id)}><span>{p.level}</span><b>{p.name}</b><i>{p.id===pack?'Selected':'Explore'} ↗</i></button>)}</div>
  <div className="hubil-package-detail" role="tabpanel"><div><span>PACKAGE / {selected.level}</span><h4>{selected.name}</h4><p>{selected.summary}</p></div><ul>{selected.items.map((x,i)=><li key={x}><i>{String(i+1).padStart(2,'0')}</i>{x}</li>)}</ul></div>
  <div className="hubil-data-model"><span>OPERATING DATA MODEL</span><div><b>Client</b><i>1 : many</i><b>Project</b><i>1 : many</i><b>Delivery tasks</b></div><p>Project progress is derived from linked task completion. Payment status, due dates and handover remain explicit project records.</p></div>
  <p className="hubil-disclosure">Based on Hubil’s FirstLine diagnostic and Notion operating system. The documented workflow is a designed operating process; no client counts, revenue growth or delivery-performance improvements are claimed here.</p>
 </section>;
}
