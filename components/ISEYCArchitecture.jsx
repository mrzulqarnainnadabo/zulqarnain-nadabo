'use client';

import { useMemo, useState } from 'react';
import ISEYCThreeModel from './ISEYCThreeModel';

const offices = [
  {id:'president',label:'National President',type:'PRESIDENTIAL OFFICE',detail:'Chairs the Presidential Council, sets institutional direction and retains decisions reserved to the President. Delegation must be recorded in writing.'},
  {id:'chief-of-staff',label:'Chief of Staff',type:'PRESIDENTIAL OFFICE',detail:'Coordinates presidential priorities, agenda, office workflow and follow-through. Does not silently override department heads.'},
  {id:'secretary-general',label:'Secretary General',type:'PRESIDENTIAL OFFICE',detail:'Maintains minutes, resolutions, correspondence, official registers, appointment records and the decision archive.'},
  {id:'coo',label:'Chief Operations Officer',type:'PRESIDENTIAL COUNCIL',detail:'Coordinates execution rhythm, cross-department plans, delivery tracking and operational escalation. Department heads remain accountable for programmes.'},
  {id:'cfo',label:'Chief Financial Officer',type:'PRESIDENTIAL COUNCIL',detail:'Coordinates budgets, financial records, controls, forecasts and reporting. Expenditure authority is limited to written approvals.'},
];

const departments = [
  {id:'education',n:'01',label:'Education & Capacity Building',short:'Education',x:.4,y:3.15,w:2.25,d:1.55,h:1.5,accent:'#b78e51',mandate:'Build knowledge, practical skills, leadership capacity and institutional competence. Learning is measured through demonstrated capability—not attendance certificates alone.',workstreams:['Learning programmes','Leadership & civic capability','Digital capability','Enterprise & employability','Learning quality','Certification & records'],screens:['Overview & approved annual plan','Programmes, cohorts & schedules','Learning library','Participants & consent','Assessment & completion evidence','Reports & My Development'],lifecycle:'Needs assessment → programme brief → curriculum → facilitator approval → registration & consent → delivery → assessment → feedback → verified completion → follow-up',measure:'Demonstrated skill improvement, assessed completion and evidence of applied learning.'},
  {id:'health',n:'02',label:'Health & Well-being',short:'Health',x:3.15,y:3.15,w:2.25,d:1.55,h:1.5,accent:'#6f9a8b',mandate:'Promote community health literacy, prevention, well-being, responsible information and pathways to trusted services. ISEYC is not a clinical provider.',workstreams:['Health literacy','Prevention & awareness','Mental & social well-being','Community health needs','Partnerships & referral pathways','Programme quality'],screens:['Overview & priority themes','Health programmes & outreach','Evidence library','Community observations','Verified referral directory','Safeguarding & reports'],lifecycle:'Need identified → evidence review → qualified review → safeguarding & privacy → programme approval → delivery → feedback & incident handling → lessons',measure:'Evidence-reviewed materials, qualified review, referral freshness and documented corrective action.'},
  {id:'technology',n:'03',label:'Software & Technology',short:'Technology',x:5.9,y:3.15,w:2.25,d:1.55,h:1.5,accent:'#788b9a',mandate:'Build and maintain useful, secure, accessible digital systems that strengthen ISEYC programmes and institutional operations.',workstreams:['Product & systems engineering','Digital operations','Cybersecurity & privacy','Digital skills','Data & AI governance','Technical support'],screens:['Product portfolio & owners','Roadmap & requirements','Engineering, issues & releases','Security & access review','Infrastructure & continuity','Learning & reports'],lifecycle:'Requirements → architecture → development → testing → release review → explicit approval → maintenance',measure:'Release success, critical vulnerability remediation, service recovery, restore tests and handover completeness.'},
  {id:'civic',n:'04',label:'Civic Department',short:'Civic',x:8.65,y:3.15,w:2.25,d:1.55,h:1.5,accent:'#a58c63',mandate:'Strengthen citizen participation, civic understanding, public accountability and evidence-informed dialogue through non-partisan engagement.',workstreams:['Community listening','Civic education','Public Mandate','Evidence & accountability','Dialogue & engagement','Field network'],screens:['Overview, mandate & geography','Community network & access tiers','Observations, review & publication','Civic education resources','Public evidence register','Dialogue & reports'],lifecycle:'Community report → human review → publication → evidence reuse → dialogue → documented institutional response',measure:'Traceable records, timely review, geographic coverage, civic learning and documented response.'},
];

const shared = [
  {id:'observatory',label:'Observatory',short:'Evidence engine',x:1.25,y:7.1,w:2.5,d:1.45,h:1.05,accent:'#9d875c',detail:'Published source records and documented observations inform all four departments. Geography, source dates, methods, coverage and limitations travel with the evidence.'},
  {id:'idcc',label:'Digital Operations Centre',short:'Institutional operations',x:4.75,y:7.1,w:2.5,d:1.45,h:1.05,accent:'#6c806f',detail:'The operating layer for programmes, workplans, reports, meetings, decisions, actions, appointments, learning, communications and external engagement—within approved authority.'},
  {id:'brain',label:'Civic Brain',short:'Evidence interpretation',x:8.25,y:7.1,w:2.5,d:1.45,h:1.05,accent:'#71899a',detail:'An interpretation layer that retrieves relevant evidence, explains limitations and drafts analysis. Outputs remain advisory and require human review.'},
];

const governance = [
  {id:'cfo',label:'Finance',short:'CFO',x:1.7,y:.55,w:1.65,d:1.1,h:1.05,accent:'#b79c70'},
  {id:'coo',label:'Operations',short:'COO',x:3.55,y:.55,w:1.65,d:1.1,h:1.05,accent:'#b79c70'},
  {id:'president',label:'Presidential Office',short:'PRESIDENT',x:5.4,y:.55,w:2.0,d:1.1,h:1.65,accent:'#b79c70'},
  {id:'chief-of-staff',label:'Chief of Staff',short:'COS',x:7.6,y:.55,w:1.65,d:1.1,h:1.05,accent:'#b79c70'},
  {id:'secretary-general',label:'Secretariat',short:'SG',x:9.45,y:.55,w:1.65,d:1.1,h:1.05,accent:'#b79c70'},
];

const sharedServices = [
  {id:'council-records',label:'Council & Decisions',short:'Governance records',detail:'Formal decisions, approvals, rationale, assigned action owners and follow-through. AI can prepare drafts; only authorised humans confirm decisions.'},
  {id:'meetings',label:'Meetings & Action Tracker',short:'Meetings · minutes · actions',detail:'Meeting intake, agendas, minutes, confirmed decisions and linked action tracking with named owners and due dates.'},
  {id:'chamber',label:'Digital Chamber',short:'Formal sessions',detail:'Formal session scheduling, chair controls, draft document intelligence and controlled hand-off to the action tracker.'},
  {id:'presidential-brief',label:'Presidential Command Brief',short:'Private executive workspace',detail:'A restricted, draft-only workspace for presidential priorities, briefings and recommendations. It does not grant decision authority to AI.'},
  {id:'development',label:'Developmental Profiles',short:'Member capability',detail:'Consent-based role induction, capability pathways, competency evidence and member development with privacy and access boundaries.'},
  {id:'learning-register',label:'Learning & Competency',short:'Learning evidence',detail:'Approved learning modules, assessments, competency evidence and induction progress shared across the institution.'},
  {id:'media-command',label:'Social Media & Content Command',short:'Draft · review · publish',detail:'Public communication workflow with draft, review, approval and publication states. AI output remains draft-only until human approval.'},
  {id:'partners',label:'Partner & External Engagement',short:'Institutional relationships',detail:'Partner organisations, external contacts, engagement records, due diligence and follow-up.'},
];

const sharedRegisters = [
  'Appointment & Role Register',
  'Programmes & Work Register',
  'Council Decisions & Action Register',
  'Department Reports & Scorecards',
  'Learning & Competency Register',
  'Partner Organisations & External Engagement',
  'Meetings, Chamber, Actions & Media records',
];

const roleTemplates = ['National President','Chief of Staff to the President','Secretary General','Chief Operations Officer','Chief Financial Officer','Head, Education & Capacity Building','Head, Health & Well-being','Head, Software & Technology','Head, Civic Department','Youth Leadership Coordinator','Director of Public Engagement & Awareness','Director of Member Welfare & Social Development','Chair, Disciplinary Committee','Special Adviser to the President'];

const publicLayer = [
  {id:'mandate',label:'Civic Mandate',short:'Reviewed public records',detail:'Public participation intake with human review and a published-only public record boundary.'},
  {id:'briefs',label:'Public evidence briefs',short:'What evidence supports',detail:'Public-facing explanations that preserve source provenance, geographic scope and what remains unknown.'},
  {id:'institution',label:'ISEYC public institution',short:'What the world sees',detail:'The public identity, four departments, approved programmes and published institutional work.'},
];

const allModules = [...governance,...departments,...shared,...sharedServices];

const sceneModules = [
  ...governance.map((item,i)=>({...item,kind:'office',x:[-8,-4,0,4,8][i],z:-6,w:2.25,d:1.5,h:item.id==='president'?2.05:1.45})),
  ...departments.map((item,i)=>({...item,kind:'department',x:[-8,-2.7,2.7,8][i],z:-.3,w:3.15,d:2.2,h:2.0})),
  ...shared.map((item,i)=>({...item,kind:'shared',x:[-6,0,6][i],z:5.1,w:3.35,d:2.2,h:1.55})),
];

function project(x,y,z=0){
  return [560+(x-y)*39,72+(x+y)*22-z*1.05];
}
function points(coords){return coords.map(([x,y,z])=>project(x,y,z).join(',')).join(' ');}
function Building({item,selected,onSelect,kind='department'}){
  const {x,y,w,d,h}=item;
  const roof=[[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]];
  const faceX=[[x+w,y,0],[x+w,y+d,0],[x+w,y+d,h],[x+w,y,h]];
  const faceY=[[x,y+d,0],[x+w,y+d,0],[x+w,y+d,h],[x,y+d,h]];
  const center=project(x+w/2,y+d/2,h);
  const base=project(x+w/2,y+d/2,0);
  const isSelected=selected===item.id;
  const fill=kind==='office'?'#d8c39c':kind==='shared'?'#dce4dc':'#e8ece3';
  const wallA=kind==='office'?'#a88a5d':kind==='shared'?'#738a78':'#8b9b8b';
  const wallB=kind==='office'?'#806b4b':kind==='shared'?'#506b59':'#5d7663';
  return <g className={`ise-3d-module ${isSelected?'is-selected':''}`} role="button" tabIndex={0} aria-label={item.label} aria-pressed={isSelected} onClick={()=>onSelect(item.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(item.id);}}}>
    <polygon points={points(faceY)} fill={wallA} stroke="#415b49" strokeWidth="1.2"/>
    <polygon points={points(faceX)} fill={wallB} stroke="#354d3e" strokeWidth="1.2"/>
    <polygon points={points(roof)} fill={isSelected?'#d6b778':fill} stroke={isSelected?'#76572d':'#637766'} strokeWidth="1.5"/>
    <polygon points={points([[x+.22,y+.22,h+.015],[x+w-.22,y+.22,h+.015],[x+w-.22,y+d-.22,h+.015],[x+.22,y+d-.22,h+.015]])} fill="none" stroke={item.accent||'#b18b52'} strokeWidth="1.4" opacity=".9"/>
    {Array.from({length:Math.max(2,Math.floor(w/.65))}).map((_,i)=>{
      const wx=x+.38+i*(w-.65)/Math.max(1,Math.floor(w/.65)-1);
      const p1=project(wx,y+d,h*.28),p2=project(wx,y+d,h*.68);
      return <line key={i} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke="#d9e2d5" strokeWidth="2.6" opacity=".72"/>;
    })}
    <path d={`M ${center[0]-w*5} ${center[1]+8} L ${center[0]+w*5} ${center[1]+8}`} stroke="#7b8e7d" strokeWidth="1" opacity=".5"/>
    <text x={center[0]} y={center[1]-2} textAnchor="middle" className="ise-3d-label">{item.short||item.label}</text>
    {kind==='office'&&<text x={center[0]} y={center[1]+12} textAnchor="middle" className="ise-3d-sub">{item.short}</text>}
    <circle cx={base[0]} cy={base[1]+7} r={isSelected?5:3} fill={isSelected?'#b78e51':'#607c68'} opacity=".9"/>
  </g>;
}

function Platform(){
  const top=[[0,0,0],[12,0,0],[12,10,0],[0,10,0]];
  const bottom=[[0,0,-.35],[12,0,-.35],[12,10,-.35],[0,10,-.35]];
  return <g>
    <polygon points={points([[0,10,-.35],[12,10,-.35],[12,10,0],[0,10,0]])} fill="#8b9a8b"/>
    <polygon points={points([[12,0,-.35],[12,10,-.35],[12,10,0],[12,0,0]])} fill="#718574"/>
    <polygon points={points(top)} fill="#d8ded2" stroke="#738677" strokeWidth="1.5"/>
    <polygon points={points([[.35,.35,.01],[11.65,.35,.01],[11.65,9.65,.01],[.35,9.65,.01]])} fill="none" stroke="#a7b1a1" strokeDasharray="4 6"/>
    <path d={`M ${project(6,.3,.02).join(' ')} L ${project(6,9.7,.02).join(' ')}`} stroke="#b8a37d" strokeWidth="2" strokeDasharray="6 6" opacity=".75"/>
  </g>;
}

function DetailPanel({item,kind}){
  if(!item)return null;
  const isDepartment=kind==='department';
  const isOffice=kind==='office';
  return <aside className="ise-architecture-inspector" aria-live="polite">
    <div className="ise-inspector-top"><span>{isDepartment?'DEPARTMENT WORKSPACE':isOffice?'GOVERNANCE OFFICE':kind==='shared'?'SHARED INFRASTRUCTURE':'PUBLIC INTERFACE'}</span><span>ISEYC / MODEL</span></div>
    <p className="ise-inspector-kicker">{item.n||item.type||item.short||'INSTITUTIONAL LAYER'}</p>
    <h3>{item.label}</h3>
    <p className="ise-inspector-description">{item.mandate||item.detail||'A defined part of the institutional architecture.'}</p>
    {isDepartment&&<>
      <div className="ise-inspector-group"><span>CORE WORKSTREAMS</span><div className="ise-chip-list">{item.workstreams.map(x=><span key={x}>{x}</span>)}</div></div>
      <div className="ise-inspector-group"><span>IDCC WORKSPACE</span><ol className="ise-screen-list">{item.screens.map((x,i)=><li key={x}><b>{String(i+1).padStart(2,'0')}</b>{x}</li>)}</ol></div>
      <div className="ise-inspector-group"><span>PROGRAMME LIFECYCLE</span><p className="ise-lifecycle">{item.lifecycle}</p></div>
      <div className="ise-inspector-group"><span>WHAT GOOD LOOKS LIKE</span><p className="ise-lifecycle">{item.measure}</p></div>
    </>}
    {isOffice&&<div className="ise-inspector-group"><span>AUTHORITY BOUNDARY</span><p className="ise-lifecycle">{item.detail}</p><small>Role template only. No individual appointment or occupancy is implied.</small></div>}
    {kind==='shared'&&<div className="ise-inspector-group"><span>HOW IT SERVES THE INSTITUTION</span><p className="ise-lifecycle">{item.detail}</p></div>}
    {kind==='public'&&<div className="ise-inspector-group"><span>PUBLIC PRESENTATION</span><p className="ise-lifecycle">{item.detail}</p></div>}
  </aside>;
}

export default function ISEYCArchitecture(){
  const [active,setActive]=useState('president');
  const [mode,setMode]=useState('structure');
  const [threeReady,setThreeReady]=useState(false);
  const [threeFailed,setThreeFailed]=useState(false);
  const selected=useMemo(()=>allModules.find(x=>x.id===active)||publicLayer.find(x=>x.id===active)||offices[0],[active]);
  const kind=governance.some(x=>x.id===active)?'office':departments.some(x=>x.id===active)?'department':shared.some(x=>x.id===active)||sharedServices.some(x=>x.id===active)?'shared':'public';
  return <section id="iseyc" className="institution-section ise-architecture-section" aria-labelledby="iseyc-title">
    <header className="ise-architecture-heading">
      <div><p className="institution-kicker">ISEYC / INSTITUTIONAL ARCHITECTURE</p><h2 id="iseyc-title">An institution,<br/><em>made visible.</em></h2></div>
      <p>A spatial model of how ISEYC is designed to work: governance, four departments, shared institutional infrastructure and the public-facing layer.</p>
    </header>
    <div className="ise-architecture-toolbar">
      <div><span className="ise-model-status"/> <b>ARCHITECTURAL MODEL</b><small>AXONOMETRIC / EXPLODED SYSTEM</small></div>
      <div className="ise-model-mode" role="group" aria-label="Institutional model view">
        <button type="button" onClick={()=>setMode('structure')} aria-pressed={mode==='structure'}>Structure</button>
        <button type="button" onClick={()=>setMode('operations')} aria-pressed={mode==='operations'}>How it works</button>
      </div>
    </div>
    <div className={`ise-architecture-stage mode-${mode}`}>
      <div className="ise-architecture-canvas" role="region" tabIndex={0} aria-label="Scrollable axonometric institutional model">
        <ISEYCThreeModel modules={sceneModules} selectedId={active} onSelect={setActive} onReady={()=>setThreeReady(true)} onError={()=>setThreeFailed(true)}/>
        {!threeReady&&<svg viewBox="0 0 1080 660" role="group" aria-label="Fallback axonometric model of ISEYC institutional architecture">
          <defs><filter id="ise-shadow" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="7"/></filter></defs>
          <ellipse cx="560" cy="548" rx="440" ry="55" fill="#334a3b" opacity=".12" filter="url(#ise-shadow)"/>
          <Platform/>
          <g className="ise-platform-labels">
            <text x="560" y="90">GOVERNANCE / PRESIDENTIAL COUNCIL</text>
            <text x="560" y="270">DEPARTMENTAL WORKSPACES</text>
            <text x="560" y="492">SHARED INSTITUTIONAL INFRASTRUCTURE</text>
          </g>
          <g className="ise-architecture-connectors" opacity=".6">
            <path d="M560 155 L560 220 M560 220 L560 290 M560 440 L560 485" stroke="#9c8053" strokeWidth="2" strokeDasharray="5 7" fill="none"/>
            <path d="M300 310 L840 310" stroke="#a5b1a4" strokeDasharray="3 8" fill="none"/>
          </g>
          {governance.map(item=><Building key={item.id} item={item} selected={active} onSelect={setActive} kind="office"/>)}
          {departments.map(item=><Building key={item.id} item={item} selected={active} onSelect={setActive} kind="department"/>)}
          {shared.map(item=><Building key={item.id} item={item} selected={active} onSelect={setActive} kind="shared"/>)}
          <g className="ise-architecture-public">
            <path d="M390 602 L730 602" stroke="#a17e4d" strokeWidth="2"/>
            <text x="560" y="625" textAnchor="middle">PUBLIC INTERFACE / PUBLISHED WORK / COMMUNITY ENGAGEMENT</text>
          </g>
        </svg>}
        {threeFailed&&<span className="ise-three-fallback-note">WebGL is unavailable in this browser. Showing the axonometric model.</span>}
        <div className="ise-architecture-compass"><span>N</span><i/></div>
        <div className="ise-architecture-legend"><span><i className="legend-office"/>Governance</span><span><i className="legend-department"/>Departments</span><span><i className="legend-shared"/>Shared systems</span></div>
      </div>
      <DetailPanel item={selected} kind={kind}/>
    </div>
    <div className="ise-architecture-index">
      <div className="ise-index-label"><span>01—04</span><b>DEPARTMENTS</b></div>
      {departments.map(item=><button type="button" key={item.id} onClick={()=>setActive(item.id)} aria-pressed={active===item.id}><span>{item.n}</span><b>{item.label}</b><i>↗</i></button>)}
    </div>
    <div className="ise-architecture-shared-rail">
      <div><span>INSTITUTION-WIDE SYSTEMS</span><b>Governance, people and operations</b></div>
      {sharedServices.map(item=><button type="button" key={item.id} onClick={()=>setActive(item.id)} aria-pressed={active===item.id}><b>{item.label}</b><small>{item.short}</small></button>)}
    </div>
    <div className="ise-architecture-public-rail">
      <div><span>PUBLIC LAYER</span><b>What the world can inspect</b></div>
      {publicLayer.map(item=><button type="button" key={item.id} onClick={()=>setActive(item.id)} aria-pressed={active===item.id}><b>{item.label}</b><small>{item.short}</small></button>)}
    </div>
    <details className="ise-record-register">
      <summary><span>INSTITUTIONAL RECORDS / IDCC</span><b>7 shared registers & record systems</b></summary>
      <div>{sharedRegisters.map((name,i)=><span key={name}><i>{String(i+1).padStart(2,'0')}</i>{name}</span>)}</div>
    </details>
    <details className="ise-role-register"><summary><span>GOVERNANCE ROLE TEMPLATES</span><b>14 roles · no assumed appointments</b></summary><div>{roleTemplates.map((role,i)=><span key={role}><i>{String(i+1).padStart(2,'0')}</i>{role}</span>)}</div></details>
    <p className="ise-architecture-disclosure">This is a conceptual axonometric model of the documented institutional architecture, not a physical building plan or live staff directory. Office positions are role templates; no individual appointments, occupancy, programme counts or performance outcomes are implied. IDCC records and personal information remain private. Department workspace names are drawn from the current Notion blueprints; database filters are not access controls.</p>
  </section>;
}
