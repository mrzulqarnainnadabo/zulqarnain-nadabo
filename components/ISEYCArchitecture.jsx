'use client';

import { useState } from 'react';

const offices = [
  { id:'president', label:'National President', group:'Presidential Office', detail:'Institutional direction, Council chairing, strategic decisions and final presidential approvals. Reserved decisions are delegated only in writing.' },
  { id:'chief-of-staff', label:'Chief of Staff', group:'Presidential Office', detail:'Presidential priorities, agenda, coordination and follow-through. Coordinates the President’s office without silently overriding department heads.' },
  { id:'secretary-general', label:'Secretary General', group:'Presidential Office', detail:'Minutes, resolutions, official correspondence, policy register, appointment records and the decision archive.' },
  { id:'coo', label:'Chief Operations Officer', group:'Presidential Council', detail:'Execution rhythm, cross-department plans, delivery tracking and operational escalation. Department heads remain accountable for their programmes.' },
  { id:'cfo', label:'Chief Financial Officer', group:'Presidential Council', detail:'Budgets, financial records, controls, forecasts and financial reporting. Expenditure authority remains limited to written approvals.' },
];
const departments = [
  {id:'education', n:'01', label:'Education & Capacity Building', short:'Education', position:'translate3d(-330px, 115px, 0)', mandate:'Build knowledge, practical skills, leadership capacity and institutional competence. Learning is measured through demonstrated capability—not attendance certificates alone.', rooms:['Learning programmes','Leadership & civic capability','Digital capability','Enterprise & employability','Learning quality','Certification & records'], lifecycle:'Needs assessment → programme brief → curriculum → delivery → assessment → feedback → verified completion'},
  {id:'health', n:'02', label:'Health & Well-being', short:'Health', position:'translate3d(190px, 115px, 0)', mandate:'Promote health literacy, prevention, well-being, responsible information and pathways to trusted services. ISEYC is not a clinical provider.', rooms:['Health literacy','Prevention & awareness','Mental & social well-being','Community observations','Partnerships & referrals','Safeguarding & quality'], lifecycle:'Need → evidence review → qualified review → safeguarding → approval → delivery → feedback & learning'},
  {id:'technology', n:'03', label:'Software & Technology', short:'Technology', position:'translate3d(-330px, -115px, 0)', mandate:'Build and maintain useful, secure, accessible digital systems that strengthen programmes and institutional operations.', rooms:['Product & systems engineering','Digital operations','Cybersecurity & privacy','Digital skills','Data & AI governance','Technical support'], lifecycle:'Requirements → architecture → development → testing → release approval → maintenance'},
  {id:'civic', n:'04', label:'Civic Department', short:'Civic', position:'translate3d(190px, -115px, 0)', mandate:'Strengthen citizen participation, civic understanding, public accountability and evidence-informed dialogue through non-partisan engagement.', rooms:['Community listening','Civic education','Public Mandate','Evidence & accountability','Dialogue & engagement','Field network'], lifecycle:'Community report → human review → publication → evidence → dialogue → documented response'},
];
const capabilities = [
  {id:'observatory',label:'Observatory',type:'EVIDENCE ENGINE',detail:'Published source records and documented observations inform all four departments. Source coverage, dates and limitations remain visible.'},
  {id:'brain',label:'Civic Brain',type:'INTERPRETATION',detail:'Retrieves relevant evidence, explains limitations and drafts analysis. Outputs remain advisory and require human review.'},
  {id:'operations',label:'Digital Operations Centre',type:'INSTITUTIONAL OPERATIONS',detail:'Coordinates programmes, work plans, reports, meetings, actions, appointments, communications and external engagement within approved authority.'},
  {id:'council',label:'Council & Decisions',type:'GOVERNANCE RECORDS',detail:'Council meetings, formal decisions, action owners, rationale, approvals and follow-through.'},
  {id:'command',label:'Presidential Command Brief',type:'PRESIDENTIAL OFFICE',detail:'A private, draft-only executive workspace for the National President. Briefings and recommendations remain subject to presidential review.'},
  {id:'meetings',label:'Meeting & Decision Tracker',type:'MEETINGS & ACTIONS',detail:'Controlled intake, AI-assisted draft preparation, human review, confirmed decisions and action follow-through.'},
  {id:'profiles',label:'Developmental Profiles',type:'MEMBER DEVELOPMENT',detail:'Consent-based member profiles, capability pathways, the documented four-tier hierarchy and seven Responsibility Pillars, with defined access tiers and privacy boundaries.'},
  {id:'chamber',label:'Digital Chamber',type:'FORMAL SESSIONS',detail:'Session scheduling, chair controls, draft document intelligence and controlled hand-off to the action tracker.'},
  {id:'media',label:'Social Media & Content Command',type:'PUBLIC COMMUNICATION',detail:'Draft, review, approval and publication lifecycle. AI output is draft-only; a human approval is required before publication.'},
  {id:'development',label:'Developmental Profiles & Community Intelligence',type:'PEOPLE & CAPABILITY',detail:'Role induction, learning pathways, competency evidence and development records.'},
];
const councilRoles = ['National President','Chief of Staff to the President','Secretary General','Chief Operations Officer','Chief Financial Officer','Head, Education & Capacity Building','Head, Health & Well-being','Head, Software & Technology','Head, Civic Department','Youth Leadership Coordinator','Director of Public Engagement & Awareness','Director of Member Welfare & Social Development','Chair, Disciplinary Committee','Special Adviser to the President'];
const registers = ['Appointment & Role Register','Programmes & Work Register','Council Decisions & Action Register','Department Reports & Scorecards','Learning & Competency Register','Partner Organisations & External Engagement'];
const officeById = Object.fromEntries(offices.map(x=>[x.id,x]));
const departmentById = Object.fromEntries(departments.map(x=>[x.id,x]));
const capabilityById = Object.fromEntries(capabilities.map(x=>[x.id,x]));

function Volume({id,label,kind,position,selected,onSelect,sub}) {
  return <button type="button" className={`campus-volume campus-volume-${kind} ${selected?'is-selected':''}`} style={{'--volume-position':position}} onClick={()=>onSelect(id)} aria-pressed={selected}>
    <span className="campus-face campus-face-top"><span className="campus-volume-code">{sub}</span><strong>{label}</strong></span>
    <span className="campus-face campus-face-front" />
    <span className="campus-face campus-face-side" />
  </button>;
}

export default function ISEYCArchitecture() {
  const [active,setActive]=useState('president');
  const [layer,setLayer]=useState('observatory');
  const [view,setView]=useState('institution');
  const [rotation,setRotation]=useState(-45);
  const selectedOffice=officeById[active];
  const selectedDepartment=departmentById[active];
  const selectedCapability=capabilityById[active];
  const activeTitle=selectedOffice?.label||selectedDepartment?.label||selectedCapability?.label||'Institutional architecture';
  return <section id="iseyc" className="institution-section institution-architecture" aria-labelledby="iseyc-title">
    <div className="institution-heading">
      <div><p className="institution-kicker">ISEYC / Institutional architecture</p><h2 id="iseyc-title">Designed to <em>work as one.</em></h2></div>
      <p>An explorable architectural model of the institution: governance above, four departments, and shared capabilities beneath. Built from the IDCC operating blueprint.</p>
    </div>
    <div className="campus-toolbar">
      <div><span className="campus-live-dot"/><span>INSTITUTION MODEL</span><i>·</i><span>STRUCTURE & WORKSPACES</span></div>
      <div className="campus-view-switch" role="group" aria-label="Model view">
        <button type="button" onClick={()=>setView('institution')} aria-pressed={view==='institution'}>Structure</button>
        <button type="button" onClick={()=>setView('operations')} aria-pressed={view==='operations'}>Operations</button>
      </div>
      <div className="campus-rotate-controls"><button type="button" onClick={()=>setRotation(value=>value+90)}>Rotate ↻</button><button type="button" onClick={()=>setRotation(-45)}>Reset view</button></div>
    </div>
    <div className="campus-layout">
      <div className="campus-viewport" data-view={view}>
        <div className="campus-world" style={{"--campus-rotation": rotation + "deg"}}>
          <div className="campus-ground"/>
          <div className="campus-plinth campus-plinth-top"><span>PRESIDENTIAL COUNCIL / PRESIDENTIAL OFFICE</span></div>
          <div className="campus-plinth campus-plinth-mid"><span>DEPARTMENTAL WORKSPACES</span></div>
          <div className="campus-plinth campus-plinth-base"><span>SHARED INSTITUTIONAL INFRASTRUCTURE</span></div>
          <Volume id="president" label="President" kind="office" position="translate3d(-80px,-225px,82px)" selected={active==='president'} onSelect={setActive} sub="NP"/>
          <Volume id="chief-of-staff" label="Chief of Staff" kind="office" position="translate3d(70px,-225px,82px)" selected={active==='chief-of-staff'} onSelect={setActive} sub="COS"/>
          <Volume id="secretary-general" label="Secretary General" kind="office" position="translate3d(220px,-225px,82px)" selected={active==='secretary-general'} onSelect={setActive} sub="SG"/>
          <Volume id="coo" label="Operations" kind="office" position="translate3d(-230px,-225px,82px)" selected={active==='coo'} onSelect={setActive} sub="COO"/>
          <Volume id="cfo" label="Finance" kind="office" position="translate3d(-380px,-225px,82px)" selected={active==='cfo'} onSelect={setActive} sub="CFO"/>
          {departments.map(d=><Volume key={d.id} id={d.id} label={d.short} kind="department" position={d.position} selected={active===d.id} onSelect={setActive} sub={d.n}/>)}
          {capabilities.slice(0,3).map((c,i)=><Volume key={c.id} id={c.id} label={c.label} kind="shared" position={`translate3d(${-230+i*230}px,225px,0)`} selected={active===c.id} onSelect={(id)=>{setActive(id);setLayer(id);}} sub={c.type}/>)}
          <div className="campus-connector campus-connector-one"/><div className="campus-connector campus-connector-two"/>
        </div>
        <div className="campus-orientation"><span>AXONOMETRIC / EXPLODED VIEW</span><span>SELECT A VOLUME TO INSPECT</span></div>
      </div>
      <aside className="campus-inspector" aria-live="polite">
        <div className="campus-inspector-top"><span>{selectedOffice?.group||selectedDepartment?'OFFICE / DEPARTMENT':'SHARED CAPABILITY'}</span><span>ISEYC · 01</span></div>
        <p className="campus-inspector-kicker">{selectedOffice?.group||selectedDepartment?.n||selectedCapability?.type}</p>
        <h3>{activeTitle}</h3>
        <p className="campus-inspector-description">{selectedOffice?.detail||selectedDepartment?.mandate||selectedCapability?.detail}</p>
        {selectedDepartment&&<><div className="campus-inspector-label">CORE WORKSTREAMS</div><ul className="campus-room-list">{selectedDepartment.rooms.map((r,i)=><li key={r}><span>0{i+1}</span>{r}</li>)}</ul><div className="campus-inspector-label">DEPARTMENT WORKSPACE / IDCC</div><ul className="campus-room-list">{selectedDepartment.screens.map((r,i)=><li key={r}><span>↗</span>{r}</li>)}</ul><div className="campus-inspector-label">PROGRAMME LIFECYCLE</div><p className="campus-lifecycle">{selectedDepartment.lifecycle}</p></>}
        {selectedOffice&&<div className="campus-authority-note"><b>Authority boundary</b><span>Role template only. Appointment, delegated authority and access are confirmed separately in IDCC.</span></div>}
        {selectedCapability&&!selectedOffice&&!selectedDepartment&&<div className="campus-authority-note"><b>Shared capability</b><span>Select another model layer to inspect its relationship with departmental work.</span></div>}
        <div className="campus-inspector-footer"><span>MODEL BASIS</span><span>IDCC operating blueprint · Nov 2026</span></div>
      </aside>
    </div>
    <div className="campus-department-rail">
      {departments.map(d=><button type="button" key={d.id} onClick={()=>setActive(d.id)} aria-pressed={active===d.id}><span>{d.n}</span><b>{d.label}</b><i>↗</i></button>)}
    </div>
    <div className="campus-shared-rail"><div><span>SHARED SYSTEMS</span><p>One evidence foundation. Distinct institutional responsibilities.</p></div>{capabilities.map(c=><button key={c.id} type="button" onClick={()=>{setActive(c.id);setLayer(c.id);}} aria-pressed={active===c.id}><span>{c.type}</span><b>{c.label}</b></button>)}</div>
    <div className="campus-register-rail"><span>INSTITUTIONAL REGISTERS / NOTION</span><div>{registers.map((name,i)=><span key={name}><i>0{i+1}</i>{name}</span>)}</div></div><div className="campus-governance-line"><span>GOVERNANCE RHYTHM</span><p>Weekly operational review <i>→</i> Monthly departmental reporting <i>→</i> Quarterly Council review</p></div><div className="campus-council-roles"><span>PRESIDENTIAL COUNCIL / ROLE TEMPLATES</span><div>{councilRoles.map((role,i)=><span key={role}><i>0{i+1}</i>{role}</span>)}</div></div>
    <p className="institution-disclosure">This is an architectural model of the documented institutional structure, not a physical building plan or live staff directory. The office positions are role templates; no individual appointments, occupancy, programme counts or performance outcomes are implied. The model is a public-facing interpretation of IDCC; restricted records and personal information remain private.</p>
  </section>;
}
