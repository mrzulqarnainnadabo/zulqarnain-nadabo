'use client';

import { useState } from 'react';

const stages=[
 {id:'intake',n:'01',name:'Diagnose',system:'FirstLine',type:'INTAKE',detail:'A business completes the FirstLine diagnostic. The answers are mapped into a Hubil client record with organisation type, priority, dominant gap, readiness and source.',records:['Diagnostic response','Client record','Readiness & priority','Diagnostic source'],gate:'A diagnostic is an intake signal—not proof of a live sales conversation.'},
 {id:'brief',n:'02',name:'Interpret',system:'AI Brief',type:'DRAFT INTELLIGENCE',detail:'The AI Brief is written into Raw Diagnostic Notes. Automation state indicates whether it needs review or is ready for a human. The brief helps prepare a relevant first message.',records:['Raw Diagnostic Notes','Dominant gap','Recommended track','Draft first message'],gate:'AI output remains a draft. It does not contact a prospect or make a commercial commitment.'},
 {id:'review',n:'03',name:'Approve',system:'Human review',type:'CONTROL GATE',detail:'A person reads the brief, edits the first message and chooses whether to send it by WhatsApp or email. The record remains Briefed until a real reply or conversation occurs.',records:['Reviewed AI brief','Edited first message','Outbound action','Next follow-up'],gate:'No automatic sending. A diagnostic alone does not move a record into Discovery.'},
 {id:'discover',n:'04',name:'Discover',system:'Client pipeline',type:'RELATIONSHIP',detail:'A live conversation, booked call or genuine discovery moves the client into Discovery. Needs, constraints, decision role and the next action are recorded.',records:['Discovery notes','Decision role','Needs & constraints','Next action'],gate:'Move to Discovery only when a real conversation exists.'},
 {id:'scope',n:'05',name:'Scope',system:'Proposal',type:'COMMERCIAL SCOPE',detail:'A package, quoted amount, deliverables, dates and payment terms are agreed. The record moves to Proposal while the commercial path is being considered.',records:['Package','Quoted amount','Deliverables summary','Start & due dates'],gate:'A proposal is not an active engagement.'},
 {id:'deliver',n:'06',name:'Deliver',system:'Project OS',type:'LINKED DELIVERY',detail:'When the engagement starts, create a Project linked to the Client. Delivery tasks link to that Project; task completion rolls up into project progress.',records:['Client ↔ Project relation','Delivery task checklist','Tasks Done / Total Tasks','Payment status'],gate:'Project status and client status are separate records. Task completion does not itself constitute client acceptance.'},
 {id:'handover',n:'07',name:'Handover',system:'Support',type:'CLOSE & CONTINUE',detail:'The work enters review, completion is recorded, the client approves the handover and the relationship moves to Delivered or Support as appropriate.',records:['Review outcome','Completed date','Handover record','Support period & follow-up'],gate:'Delivered and ongoing Support are distinct lifecycle states.'}
];

const states=['Briefed','Discovery','Proposal','Active','Delivered / Support'];
const packages=[
 {id:'foundation',name:'Foundation',level:'01',summary:'Establish a credible digital presence and the basic customer contact path.',items:['Business documentation pack','Google Business Profile setup','Mobile-first website','WhatsApp click-to-chat & greeting','Maps / NAP consistency','Handover training']},
 {id:'growth',name:'Growth',level:'02',summary:'Connect customer enquiries to simple records, responses and repeatable workflows.',items:['Everything in Foundation','Customer & order database','Chatbot / auto-responder','Basic enquiry automation','Simple admin view','Notion workspace starter','14-day light support']},
 {id:'operating-system',name:'Operating System',level:'03',summary:'Integrate the core workflows, records and team operations of a small business.',items:['Everything in Growth','Integrated mini operating system','Custom sales workflow','Lightweight internal dashboard','Document & knowledge system','Team access setup','30-day support & optimisation review']},
 {id:'custom',name:'Custom',level:'04',summary:'A scoped engagement for needs that do not fit a standard package.',items:['Discovery-led scope','Defined deliverables','Agreed milestones','Named dependencies','Acceptance and handover criteria']}
];

export default function HubilArchitecture(){
 const [stage,setStage]=useState('intake');
 const [pack,setPack]=useState('growth');
 const current=stages.find(x=>x.id===stage)||stages[0];
 const selected=packages.find(x=>x.id===pack)||packages[1];
 return <section id="hubil" className="hubil-architecture" aria-labelledby="hubil-title">
  <div className="hubil-heading"><div><p className="hubil-kicker">HUBIL GROUP / COMMERCIAL SYSTEMS</p><h2 id="hubil-title">A business problem.<br/>A <em>structured response.</em></h2></div><p>One connected operating model: understand the business, prepare a useful response, earn the conversation, scope the work and deliver with traceable records.</p></div>
  <div className="hubil-system-bar"><span><i/> HUBIL CLIENT OPERATING ARCHITECTURE</span><span>FIRSTLINE → CLIENT → PROJECT → TASKS</span></div>
  <div className="hubil-architecture-board">
   <div className="hubil-lane-label"><span>01</span><b>DIAGNOSIS & RELATIONSHIP</b><small>From first signal to an agreed engagement</small></div>
   <div className="hubil-flow" role="tablist" aria-label="Hubil operating architecture stages">
    {stages.map((s,i)=><button type="button" role="tab" aria-selected={stage===s.id} aria-controls="hubil-stage-detail" key={s.id} onClick={()=>setStage(s.id)}><span>{s.n}</span><b>{s.name}</b><small>{s.system}</small>{i!==stages.length-1&&<i aria-hidden="true">→</i>}</button>)}
   </div>
   <div className="hubil-state-track"><span>CLIENT STATUS</span><div>{states.map((s,i)=><b key={s} className={i===0?'is-first':''}>{s}</b>)}</div></div>
   <div className="hubil-stage-detail" id="hubil-stage-detail" role="tabpanel">
    <div><span className="hubil-detail-index">{current.n} / {current.type}</span><h3>{current.detail}</h3><p className="hubil-control-gate"><b>CONTROL</b>{current.gate}</p></div>
    <div className="hubil-records"><span>RECORDS CREATED OR UPDATED</span>{current.records.map((r,i)=><div key={r}><i>0{i+1}</i>{r}</div>)}</div>
   </div>
  </div>
  <div className="hubil-delivery-architecture">
   <div className="hubil-lane-label"><span>02</span><b>DELIVERY DATA MODEL</b><small>One client can have multiple projects; each project carries its own task list.</small></div>
   <div className="hubil-data-model-visual">
    <div className="hubil-entity"><span>RELATIONSHIP</span><b>Client</b><small>Contact · status · source · next action</small></div>
    <div className="hubil-relation"><b>1 : many</b><i/></div>
    <div className="hubil-entity"><span>ENGAGEMENT</span><b>Project</b><small>Package · scope · dates · payment · status</small><em>Tasks Done / Total Tasks · rollup</em></div>
    <div className="hubil-relation"><b>1 : many</b><i/></div>
    <div className="hubil-entity"><span>EXECUTION</span><b>Delivery tasks</b><small>Category · priority · owner · due date · completion</small></div>
   </div>
   <p className="hubil-data-note">Project progress is derived from linked task completion. Human review, client acceptance, payment reconciliation and handover remain explicit steps.</p>
  </div>
  <div className="hubil-package-heading"><div><span>THE SERVICE ARCHITECTURE</span><h3>Scope the right level of support.</h3></div><p>Packages define a starting scope. The actual project is recorded and delivered against agreed requirements.</p></div>
  <div className="hubil-packages" role="tablist" aria-label="Hubil service packages">{packages.map(p=><button key={p.id} type="button" role="tab" aria-selected={pack===p.id} onClick={()=>setPack(p.id)}><span>{p.level}</span><b>{p.name}</b><i>{p.id===pack?'Selected':'Explore'} ↗</i></button>)}</div>
  <div className="hubil-package-detail" role="tabpanel"><div><span>PACKAGE / {selected.level}</span><h4>{selected.name}</h4><p>{selected.summary}</p></div><ul>{selected.items.map((x,i)=><li key={x}><i>{String(i+1).padStart(2,'0')}</i>{x}</li>)}</ul></div>
  <div className="hubil-live-reference"><span>LIVE DIAGNOSTIC</span><a href="https://hubil-firstline-system-ns1d.vercel.app" target="_blank" rel="noreferrer">Open FirstLine ↗</a><small>Diagnostic and operating workflow documented in Hubil’s client dashboard. No client growth, revenue or delivery-performance gains are claimed.</small>
  </div>
 </section>;
}
