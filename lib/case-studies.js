export const caseStudies = [
  {
      slug: 'iseyc',
      number: '01',
      category: 'Institutional architecture',
      title: 'Building an institution that can learn from communities',
      subtitle: 'ISEYC · Institutional operating architecture',
      stage: 'Institutional architecture · interactive 3D preview',
      thesis: 'The challenge was not to create another youth organisation website. It was to make the institution legible as an operating system: clear departments, accountable programmes, shared evidence and a credible route from community input to institutional response.',
      problem: {
        heading: 'An institution needs more than an organisation chart',
        body: 'ISEYC needed a coherent way to connect its public identity, four departments, programmes, evidence, accountability and internal operations. Without clear boundaries, a website can present an attractive institution while leaving its actual operating model difficult to understand or govern.',
        evidence: ['Four official departments define the institutional structure.', 'Civic Mandate review and publication belong to the Civic Department.', 'Observatory evidence should support every department, not only civic work.', 'Internal authority must distinguish a staff session from an approved appointment.']
      },
      investigation: {
        heading: 'Start with the institution’s real structures',
        body: 'I reviewed the institutional requirements and the existing digital operations work, then separated enduring institutional responsibilities from the software used to support them.',
        evidence: ['Department names and boundaries were treated as fixed requirements.', 'Programme, workplan, report, accountable-role and evidence structures informed the model.', 'Public information and restricted operations were treated as separate access domains.']
      },
      discovery: {
        heading: 'The institution is the system; software is the support layer',
        body: 'The key design decision was to avoid organising the institution around a dashboard or a collection of tools. Departments own programmes and responsibilities. Shared capabilities provide evidence and operational support across those departments.',
        evidence: ['The four departments are Education & Capacity Building, Health & Well-being, Software & Technology, and Civic Department.', 'The Observatory is a shared evidence engine.', 'The Civic Department owns human review and publication of Mandate records.', 'Published evidence can inform work across all departments.']
      },
      architecture: {
        heading: 'A department-led model with shared capabilities',
        body: 'The architecture follows the institution’s hierarchy: institution → departments → programmes and services → public engagement → evidence and outcomes → supporting systems. Public and restricted experiences share a product shell, not a common permission boundary or database.',
        decisions: [
          ['Department ownership', 'Keeps responsibility and programme delivery close to the people accountable for them.'],
          ['Shared Observatory evidence', 'Prevents each department from building an isolated evidence base.'],
          ['Human review before publication', 'Keeps community submissions distinct from reviewed public records.'],
          ['Separate identity and appointment authority', 'A successful sign-in does not itself grant institutional authority.']
        ]
      },
      contribution: {
        heading: 'What I designed and implemented',
        body: 'I defined the institutional information hierarchy, translated the four-department model into an interactive architecture, and connected programme, evidence, review and reporting concepts in the portfolio prototype. I also established the public/restricted boundary and the authority rules that future integrations must respect.',
        items: ['Institutional hierarchy and department model', 'Interactive orbitable 3D institutional model with axonometric fallback', 'Mandate-to-Civic-Department review path', 'Shared Observatory, Civic Brain and Digital Operations capability model', 'Access and authority constraints for future operations']
      },
      validation: {
        heading: 'What is validated—and what is not',
        body: 'The current representation is grounded in the supplied institutional requirements and existing operating structures. It is an interactive WebGL architecture preview with a keyboard-accessible axonometric fallback, not a live organisational directory or real-time IDCC data feed.',
        checks: ['Four official departments represented consistently.', 'No invented officers, programme counts or institutional outcomes.', 'Civic Mandate review and publication shown as a human-governed process.', 'Private operations are not exposed through the public preview.'],
        limitations: ['The model is not yet connected to live IDCC records.', 'The WebGL scene and fallback communicate architecture; they do not simulate live operations.', 'Production identity, role approval and resource-level permissions remain prerequisites.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The demonstrated result is architectural clarity: the institutional responsibilities and shared capabilities can be inspected in one coherent model. No operational performance improvement is claimed yet because the live workflows have not been measured against a baseline.',
        measures: ['Time required to locate the owner of a programme or decision', 'Share of active programmes with an accountable role and evidence trail', 'Time from community submission to human review and publication', 'Share of departmental workplans linked to Observatory evidence']
      },
      links: [{label:'ISEYC public institution',url:'https://www.iseyc.com.ng'},{label:'Civic Mandate pilot',url:'https://2027-street-mandate.vercel.app'},{label:'Civic Brain',url:'https://iseyc-civic-brain.vercel.app'}]
      ,proof: [{label:'Interactive 3D model source',detail:'WebGL scene · orbit, selection, on-demand rendering and reduced-motion handling',url:'https://github.com/mrzulqarnainnadabo/zulqarnain-nadabo/blob/feat/unified-personal-operating-system/components/ISEYCThreeModel.jsx'},{label:'Institutional structure and accessible fallback',detail:'Four departments · governance offices · shared infrastructure · keyboard-operable axonometric model',url:'https://github.com/mrzulqarnainnadabo/zulqarnain-nadabo/blob/feat/unified-personal-operating-system/components/ISEYCArchitecture.jsx'}]
    },
  {
      slug: 'hubil',
      number: '02',
      category: 'Commercial systems architecture',
      title: 'Turning small-business support into a repeatable delivery system',
      subtitle: 'Hubil Group · Client delivery operating system',
      stage: 'Operating workflow · live since September 2026',
      thesis: 'Small businesses do not need disconnected digital deliverables. They need a clear path from the problem they describe to a scoped solution, reliable delivery, handover and support. Hubil’s operating model connects those stages in one traceable workflow.',
      problem: {
        heading: 'Client work can become fragmented across conversations and tools',
        body: 'A diagnostic, sales conversation, proposal, project checklist and payment record are different parts of one engagement. When they are not connected, it becomes difficult to see what was promised, what is being delivered and what remains before handover.',
        evidence: ['Hubil’s operating process distinguishes Briefed, Discovery, Proposal, Active, Delivered and Support stages.', 'Projects are linked to clients and delivery tasks.', 'Packages define different levels of business support: Foundation, Growth, Operating System and Custom.']
      },
      investigation: {
        heading: 'Map the client journey and the records behind it',
        body: 'I reviewed the Hubil Client Dashboard and its connected client, project and delivery-task data model. The workflow includes a FirstLine business-presence diagnostic, a draft AI brief and a human-reviewed first message before the relationship advances.',
        evidence: ['The diagnostic maps business identity, contact route, business type, customer channels, biggest frustration, readiness and additional notes into the client record.', 'The weekly operating loop prioritises high-priority Briefed prospects for a same-day first message.', 'Project records include package, quoted and paid amounts, status, dates, deliverables and linked tasks.']
      },
      discovery: {
        heading: 'The important unit is the engagement—not the individual task',
        body: 'The client record establishes the relationship; the project defines the agreed engagement; delivery tasks make the work executable. Keeping those objects linked gives the operator a coherent view from first conversation through delivery.',
        evidence: ['The FirstLine AI brief supports preparation but does not send a message automatically.', 'Project rollups count completed and total linked tasks.', 'Review, completion, payment and support remain distinct states.']
      },
      architecture: {
        heading: 'A connected client → project → task model',
        body: 'The system combines a relationship pipeline with a delivery model. Client stages track the commercial conversation. Project stages track execution. Linked task records provide delivery detail, while package definitions establish the expected scope.',
        decisions: [
          ['Diagnostic before proposal', 'Creates a structured understanding of the business problem before recommending work.'],
          ['Human-reviewed AI brief', 'Uses AI to prepare a first-message draft while keeping the actual communication under human control.'],
          ['Client, project and task separation', 'Keeps relationship management, commercial scope and execution records distinct but connected.'],
          ['Package-based scope', 'Creates a repeatable service architecture while retaining a Custom path for work that needs separate scoping.'],
          ['Explicit handover and support states', 'Prevents completed delivery from being confused with ongoing support.']
        ]
      },
      contribution: {
        heading: 'What I designed and put into operation',
        body: 'I developed the Hubil service architecture and operating workflow, including the FirstLine diagnostic-to-brief process, client stage rules, package definitions, project/task relationships and weekly review rhythm.',
        items: ['FirstLine diagnostic and client-record mapping', 'AI-assisted brief with human approval before outreach', 'Client pipeline stages and weekly operating rhythm', 'Foundation, Growth, Operating System and Custom package structure', 'Client → project → delivery-task relationship', 'Task completion rollups and delivery status rules']
      },
      validation: {
        heading: 'A live workflow, with commercial impact still to measure',
        body: 'The Hubil dashboard documentation records the weekly operating loop as live from 6 September 2026. The data model includes linked project tasks and rollups. This establishes that the workflow is in use as an operating design; it does not establish improved revenue, conversion or delivery speed.',
        checks: ['Client stage definitions and transition rules documented.', 'FirstLine diagnostic fields mapped to the client record.', 'Project records linked to delivery tasks.', 'Completed and total task rollups defined.'],
        limitations: ['No verified lead-to-client conversion rate is available here.', 'No baseline for delivery time or rework has been established.', 'No revenue growth or client outcome is claimed.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The demonstrated output is a connected operating workflow that makes the client journey, scope and delivery progress easier to inspect. Its commercial value should be evaluated using a consistent weekly baseline rather than assumed from the existence of the system.',
        measures: ['Share of high-priority diagnostics receiving a same-day first message', 'Briefed-to-Discovery and Discovery-to-Proposal conversion rates', 'Proposal-to-active engagement conversion', 'On-time project completion and review-to-handover time', 'Task completion and rework by package', 'Support retention and referral rate']
      },
      links: [{label:'Open FirstLine diagnostic',url:'https://hubil-firstline-system-ns1d.vercel.app'}]
      ,proof: [{label:'Hubil operating model source',detail:'Seven-stage client lifecycle · human approval gate · client-to-project-to-task data model · service packages',url:'https://github.com/mrzulqarnainnadabo/zulqarnain-nadabo/blob/feat/unified-personal-operating-system/components/HubilArchitecture.jsx'}]
    },
  {
      slug: 'mandate',
      number: '03',
      category: 'Civic participation',
      title: 'Turning community voice into a reviewed public record',
      subtitle: 'Civic Mandate Nigeria · Public participation workflow',
      stage: 'Public pilot · evolving',
      thesis: 'A public submission form is not an accountability system. The difficult part is preserving the difference between what a community reports, what a reviewer accepts for publication and what an institution actually does in response.',
      problem: {
        heading: 'Community input can disappear between collection and response',
        body: 'Civic participation needs a traceable path from a person’s report to a reviewed record and, eventually, an accountable response. If raw submissions are presented as verified facts—or if publication is automatic—the system can create false confidence instead of public trust.',
        evidence: ['Community reports are not prevalence estimates.', 'A submitted concern is not automatically a verified fact.', 'Publication and institutional response are separate events.']
      },
      investigation: {
        heading: 'Model the review boundary before the interface',
        body: 'I examined the public-only CommunityRecord contract and the existing review workflow, including its states and the relationship to Civic Brain and the Observatory.',
        evidence: ['Public API contract version 0.1.0 exposes published-only CommunityRecords.', 'The workflow distinguishes New, Published, Flagged and Rejected states.', 'At the audited point, 24 published-only records were returned; this is a point-in-time system count, not a population statistic.']
      },
      discovery: {
        heading: 'The review decision is the core civic control',
        body: 'The system must make provenance and publication state visible. The Civic Department is responsible for human review and publication; downstream intelligence systems should consume published records rather than treat every submission as public evidence.',
        evidence: ['Submission, review, publication and response are distinct steps.', 'Published records can be consumed by the Observatory and Civic Brain.', 'The record count describes the system at an audit point, not the scale of community needs.']
      },
      architecture: {
        heading: 'A governed record lifecycle',
        body: 'The architecture separates intake from publication. Human review changes the record’s public status, and published-only interfaces prevent unreviewed submissions from being mistaken for public evidence.',
        decisions: [
          ['Published-only public API', 'Keeps raw or pending submissions outside public retrieval.'],
          ['Explicit review states', 'Makes the editorial and governance process inspectable.'],
          ['Civic Department ownership', 'Places publication authority inside the institution’s defined structure.'],
          ['Downstream evidence reuse', 'Allows published records to inform the Observatory and Civic Brain without duplicating the source record.']
        ]
      },
      contribution: {
        heading: 'What I designed and implemented',
        body: 'I shaped the civic record model and review-to-publication logic, connected the public record contract to the broader civic intelligence architecture, and documented the boundary between community testimony and verified evidence.',
        items: ['CommunityRecord public-only contract', 'Human review lifecycle and publication states', 'Civic Department review ownership', 'Mandate-to-Observatory and Civic Brain evidence path', 'Public language that avoids treating submissions as prevalence or proof']
      },
      validation: {
        heading: 'Contract checks and known limits',
        body: 'The repository contains contract checks and public-only API definitions, but the latest production smoke checks on 24 November 2026 found that the Community Observations and Evidence Vault endpoints returned HTTP 503 with diagnostic code NOTION_DATA_SOURCE_NOT_FOUND_OR_NOT_SHARED. These feeds are therefore unavailable at the audited point; they must not be described as operationally verified.',
        checks: ['Published-only API contract identified.', 'Review states and publication boundary documented.', 'Point-in-time count reconciled with the audited API response.'],
        limitations: ['The Community Observations and Evidence Vault production feeds currently return 503 because their Notion data source is unavailable or not shared.', 'A record count does not measure population prevalence.', 'Publication does not prove that an institution implemented a response.', 'End-to-end pagination and downstream reconciliation must be rechecked after the upstream source configuration is restored.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The current result is a defined, inspectable publication workflow and a public record contract. No claim is made that community concerns have been resolved or that institutional response rates have improved.',
        measures: ['Median time from submission to first human review', 'Share of submissions with a documented review outcome', 'Share of published records with a linked response status', 'Median time from published record to an evidenced institutional response']
      },
      links: [{label:'Open the public pilot',url:'https://2027-street-mandate.vercel.app'},{label:'Civic Mandate repository',url:'https://github.com/mrzulqarnainnadabo/2027-street-mandate'}],
      proof: [{label:'Live Community Observations check',detail:'24 Nov 2026 · HTTP 503 · Notion data source unavailable or not shared',url:'https://github.com/mrzulqarnainnadabo/2027-street-mandate/actions/runs/45466686943'},{label:'Live Evidence Vault check',detail:'24 Nov 2026 · HTTP 503 · Notion data source unavailable or not shared',url:'https://github.com/mrzulqarnainnadabo/2027-street-mandate/actions/runs/45470630727'}]
    },
  {
      slug: 'brain',
      number: '04',
      category: 'Evidence-grounded intelligence',
      title: 'Designing an AI system that can say what it does not know',
      subtitle: 'Civic Brain · Evidence-grounded question answering',
      stage: 'Working product · evolving',
      thesis: 'In civic information, a fluent answer can be more dangerous than no answer if it hides missing evidence. The system needs to retrieve authoritative records, explain the basis for its answer and make uncertainty visible.',
      problem: {
        heading: 'Fluency is not the same as grounded knowledge',
        body: 'A civic assistant may be asked about budgets, services, community reports or public institutions where evidence is fragmented, outdated or incomplete. A generic answer can blur the boundary between a source, an inference and an unknown.',
        evidence: ['Different departments need answers grounded in relevant evidence.', 'Community records and official datasets have different evidential status.', 'A source being present does not guarantee that it answers the question.']
      },
      investigation: {
        heading: 'Trace the source before shaping the answer',
        body: 'I examined the relationship between Civic Mandate records, Observatory evidence and the answer layer, with attention to source authority, fallback behaviour and concise explanation.',
        evidence: ['CommunityRecord is preferred as a source where relevant.', 'The API authority contract includes versioning and a fallback reason.', 'A prior audit found 24 Mandate-to-Brain records matching at that point in time.']
      },
      discovery: {
        heading: 'The answer needs an evidence boundary',
        body: 'The important product behaviour is not simply retrieval. It is the ability to state which evidence supports a claim, what that evidence cannot establish and when the system should qualify or decline to infer.',
        evidence: ['A community report cannot be silently converted into a general population claim.', 'An announcement is not proof of implementation.', 'Missing or mismatched evidence should remain visible rather than be filled with plausible language.']
      },
      architecture: {
        heading: 'A governed intelligence layer over source systems',
        body: 'Civic Brain is designed as an interpretation layer, not the authority for institutional records. Source systems retain their own provenance and permissions; the answer layer retrieves, interprets and qualifies evidence.',
        decisions: [
          ['Source-aware retrieval', 'Preserves the distinction between public records, datasets and other evidence.'],
          ['Authority and fallback metadata', 'Makes it possible to explain when the preferred source was unavailable.'],
          ['Concise answer structure', 'Prioritises the answer and its evidence boundary over generic exposition.'],
          ['No autonomous publication', 'Keeps interpretation separate from institutional decisions and public release.']
        ]
      },
      contribution: {
        heading: 'What I designed and implemented',
        body: 'I worked across the source relationship, authority contract and answer experience: defining how the system should use published CommunityRecords, how fallback should be disclosed and how answers should remain concise and evidence-qualified.',
        items: ['Civic intelligence source hierarchy', 'CommunityRecord preference and fallback reasoning', 'Evidence-qualified answer behaviour', 'Concise answer presentation direction', 'Cross-system relationship with Mandate and Observatory']
      },
      validation: {
        heading: 'What the checks establish',
        body: 'A live GitHub Actions integration check passed on 24 November 2026, verifying the published CommunityRecord feed and shared record IDs consumed by Civic Brain. This validates the integration contract at that point in time; it does not establish factual accuracy for every generated answer or prove that every source is complete and current.',
        checks: ['24 Nov 2026 live integration check passed for published records and shared IDs.', 'API authority contract version and fallback reason represented.', 'Concise evidence-response work recorded in the project history.'],
        limitations: ['Answer quality needs a maintained question-and-evidence evaluation set.', 'Source freshness and coverage vary by topic.', 'No autonomous verification or publication is claimed.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The result is a more explicit evidence contract between civic source systems and an AI interpretation layer. No accuracy percentage or user productivity gain is claimed without a repeatable evaluation.',
        measures: ['Evidence support rate across a representative question set', 'Correct abstention rate when evidence is insufficient', 'Unsupported-claim rate in reviewed answers', 'Median time to produce a cited, qualified answer']
      },
      links: [{label:'Open Civic Brain',url:'https://iseyc-civic-brain.vercel.app'},{label:'Civic Brain repository',url:'https://github.com/mrzulqarnainnadabo/iseyc-civic-brain'}],
      proof: [{label:'Live CommunityRecord integration check',detail:'24 Nov 2026 · published records and shared IDs verified',url:'https://github.com/mrzulqarnainnadabo/iseyc-civic-brain/actions/runs/45455839118'}]
    },
  {
      slug: 'observatory',
      number: '05',
      category: 'Spatial and civic research',
      title: 'Connecting public evidence to place, quality and accountability',
      subtitle: 'Civic Intelligence Observatory · Evidence infrastructure',
      stage: 'National evidence workspace · evolving',
      thesis: 'A map of indicators is not yet intelligence. A useful observatory must show where an observation came from, when it applies, how reliable it is and what it cannot tell us.',
      problem: {
        heading: 'Public evidence is fragmented and easy to misread',
        body: 'National and state-level questions often require information from multiple public institutions and research sources. Different dates, geographies, definitions and methods make direct comparison risky unless provenance and limitations travel with each observation.',
        evidence: ['Sources publish on different schedules and at different geographic levels.', 'A national figure may not support a state-level conclusion.', 'Unreconciled values should remain visibly unresolved.']
      },
      investigation: {
        heading: 'Build a source register before building conclusions',
        body: 'I examined the source registry, observation model, geographic coverage and known reconciliation issues. The work has included source coverage across states and FCT, and a growing set of observations linked to their provenance.',
        evidence: ['A 26-source registry was part of an earlier audited stage.', 'A later release candidate recorded 104 observations and a state-budget coverage register.', 'A subsequent unified observation set contained 91 observations; these are separate project snapshots, not additive totals.', 'A Lagos 2025 IGR discrepancy between BudgIT and Agora remained unreconciled and was not averaged into a synthetic figure.']
      },
      discovery: {
        heading: 'Evidence quality is part of the product',
        body: 'The observatory should not hide gaps to make the dashboard look complete. It must preserve differences in source, period, geographic coverage and method, and make unresolved conflicts visible.',
        evidence: ['Observation records need provenance and evidence periods.', 'National and pilot geographies must be labelled distinctly.', 'A source claim, implementation claim and independently verified outcome are not interchangeable.']
      },
      architecture: {
        heading: 'A provenance-first evidence workspace',
        body: 'The system is organised around observations and their source records, with geography and accountability questions as ways to explore the evidence. Briefs should be derived from traceable records rather than free-floating narrative.',
        decisions: [
          ['Source registry', 'Keeps publisher, method, date and limitations attached to the evidence.'],
          ['Observation layer', 'Separates a measured or reported value from the interpretation placed on it.'],
          ['Geographic coverage register', 'Makes missing state or subnational coverage visible.'],
          ['Unreconciled conflict states', 'Prevents contradictory values from being silently combined.']
        ]
      },
      contribution: {
        heading: 'What I designed and implemented',
        body: 'I shaped the evidence model and research workflow, assembled source and coverage structures, and developed the Observatory as the shared evidence engine for ISEYC’s departments and civic products.',
        items: ['Source and observation architecture', 'Geographic coverage and evidence-quality structure', 'Research and accountability views', 'Evidence brief direction and limitations language', 'Cross-system evidence role for Mandate and Civic Brain']
      },
      validation: {
        heading: 'Verification is ongoing and source-specific',
        body: 'The repository has passed multiple recorded test and build checkpoints, including an audited stage with 177 tests across 23 files. Passing software tests verifies implementation behaviour, not the truth or completeness of every source observation.',
        checks: ['Automated repository test and build checkpoints recorded.', 'Source-level discrepancies retained for reconciliation.', 'National coverage and pilot coverage treated separately.'],
        limitations: ['Source coverage and freshness vary.', 'Some observations require independent reconciliation.', 'Software tests do not independently validate source publishers or field conditions.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The current result is a structured evidence base with traceable source relationships and visible gaps. No claim is made that it has improved public services or changed government decisions.',
        measures: ['Share of published observations with complete provenance and period', 'Share of state-level questions with adequate geographic coverage', 'Number and age of unresolved source conflicts', 'Time required to assemble a traceable evidence brief']
      },
      links: [{label:'Observatory repository',url:'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory'},{label:'Civic intelligence architecture',url:'https://iseyc-civic-brain.vercel.app'}],
      proof: [{label:'Observatory quality gates',detail:'11 Nov 2026 · registry validation, tests and production build passed',url:'https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory/actions/runs/45131079487'}]
    },
  {
      slug: 'kaduna-south',
      number: '06',
      category: 'Grassroots governance',
      title: 'Designing a street-to-ward model of local responsibility',
      subtitle: 'Kaduna South · Community leadership framework',
      stage: 'Framework · Phase 1 pilot design',
      thesis: 'Grassroots representation needs a practical chain of responsibility, not just more titles. The framework explores how street-level concerns can be organised, coordinated and carried into ward-level action.',
      problem: {
        heading: 'Local concerns need a route to accountable coordination',
        body: 'Community issues are experienced at street level, but action often requires coordination across larger neighbourhood and ward structures. A framework must define who receives a concern, who coordinates it and how responsibility is followed through.',
        evidence: ['The proposed structure uses Street Representatives, Line Coordinators and Ward Coordinators.', 'The model is organised around seven responsibility pillars.', 'The work is at framework and Phase 1 pilot-design stage.']
      },
      investigation: {
        heading: 'Design the operating chain before scaling it',
        body: 'I approached the work as a governance and coordination design problem: define the smallest useful representation unit, create a line-level coordination role and establish a ward-level point of accountability.',
        evidence: ['Street-level representation is the entry point.', 'Line coordination links nearby streets and representatives.', 'Ward coordination provides a wider organising and escalation layer.']
      },
      discovery: {
        heading: 'The hand-off between levels is the critical mechanism',
        body: 'The value of the model depends on clear responsibility, not the number of representatives. Without defined hand-offs, reporting expectations and follow-up, the structure risks becoming a list of positions.',
        evidence: ['Each level needs a defined scope and escalation path.', 'The seven pillars need to translate into observable responsibilities.', 'A pilot is needed to test workload, participation and response capacity.']
      },
      architecture: {
        heading: 'A three-level coordination model',
        body: 'The proposed architecture connects street representation to line coordination and then ward coordination. The seven responsibility pillars provide a common frame for organising work across those levels.',
        decisions: [
          ['Street-level entry', 'Keeps issue discovery close to the people experiencing it.'],
          ['Line coordination', 'Creates a manageable bridge between individual streets and the ward.'],
          ['Ward coordination', 'Provides a point for consolidation, prioritisation and escalation.'],
          ['Pilot before expansion', 'Tests whether roles and reporting expectations are workable before wider adoption.']
        ]
      },
      contribution: {
        heading: 'What I designed',
        body: 'I developed the street-to-ward responsibility concept, defined its three coordination levels and organised the model around seven responsibility pillars. This is a framework design contribution; it is not evidence of an established or operating representative network.',
        items: ['Street Representative role concept', 'Line Coordinator role concept', 'Ward Coordinator role concept', 'Seven-pillar responsibility framework', 'Phase 1 pilot-design direction']
      },
      validation: {
        heading: 'The pilot is the validation step',
        body: 'The framework has not yet been validated through a completed field pilot. Its next test should assess whether people understand the roles, whether concerns can be handed between levels and whether follow-up can be evidenced.',
        checks: ['Three coordination levels are defined in the framework.', 'Pilot status is disclosed rather than presented as a live network.'],
        limitations: ['No active representative count is claimed.', 'No community outcome or response rate is claimed.', 'Field testing and participant feedback remain outstanding.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The current output is a proposed operating framework. Its impact cannot be established until a pilot is run and compared with a documented baseline.',
        measures: ['Share of pilot concerns assigned to a responsible role', 'Time from street-level report to ward-level acknowledgement', 'Share of concerns with a documented follow-up outcome', 'Role comprehension and participation retention during the pilot']
      },
      links: [{label:'Request the framework',url:'mailto:iseycglobal@gmail.com?subject=Kaduna%20South%20Grassroots%20Framework'}]
    },
  {
      slug: 'sigma-geo',
      number: '07',
      category: 'Research and model evaluation',
      title: 'Testing whether AI can recognise weak geographical evidence',
      subtitle: 'SIGMA-GEO · Spatial intelligence evaluation',
      stage: 'Research concept · benchmark not implemented',
      thesis: 'A model can produce a confident geographical answer from the wrong place, scale or source. Spatial intelligence evaluation should test whether the model recognises those failures—not only whether it can produce a plausible response.',
      problem: {
        heading: 'Geographical answers can be plausible and still be wrong',
        body: 'Spatial questions depend on location, scale, time and source fit. A model may confuse administrative areas, apply national evidence to a local question or overlook missing geographic coverage.',
        evidence: ['The evaluation focus extends beyond insecurity to broader spatial reasoning.', 'The work is framed around provenance, spatial fit and confidence.', 'The project is a research prototype with validation still pending.']
      },
      investigation: {
        heading: 'Evaluate the evidence chain, not just the final answer',
        body: 'I framed the work around spatial intelligence and grounded model assessment, drawing on Geography and Sustainability Studies. The evaluation concept asks whether a model can identify when evidence is weak, mismatched or insufficient for the requested geography.',
        evidence: ['Source provenance is a distinct evaluation dimension.', 'Spatial fit tests whether evidence matches the place and scale in the question.', 'Confidence should reflect evidence sufficiency, not linguistic certainty.']
      },
      discovery: {
        heading: 'Abstention can be a sign of spatial competence',
        body: 'A strong system should sometimes qualify or refuse a conclusion when the source does not support the requested geography. Evaluation therefore needs cases where the correct behaviour is to identify a mismatch or evidence gap.',
        evidence: ['A national statistic may not support a ward-level answer.', 'A place-name match does not establish geographic equivalence.', 'Uncertainty should be linked to a specific evidence limitation.']
      },
      architecture: {
        heading: 'A three-part evaluation lens',
        body: 'The current research frame separates provenance, spatial fit and confidence. Together, these dimensions can test whether an answer is supported by an appropriate source at an appropriate geographic level and whether the model communicates its limits.',
        decisions: [
          ['Provenance', 'Tests whether the model can identify and respect the source behind a claim.'],
          ['Spatial fit', 'Tests whether evidence geography and resolution match the question.'],
          ['Confidence', 'Tests whether certainty is calibrated to evidence sufficiency.'],
          ['Failure-aware cases', 'Include mismatched, incomplete and insufficient evidence—not only answerable prompts.']
        ]
      },
      contribution: {
        heading: 'What I developed',
        body: 'I developed the SIGMA-GEO evaluation direction and its spatial-evidence framing as part of a micro1 evaluation project. The public repository currently contains a short benchmark-scaffold README rather than an implemented test suite or published evaluation; this is a research direction, not a completed benchmark.',
        items: ['Spatial Intelligence & Grounded Model Assessment framing', 'Provenance, spatial-fit and confidence dimensions', 'Failure-aware evaluation concept', 'Research submission preparation']
      },
      validation: {
        heading: 'Validation is still pending',
        body: 'The evaluation design requires a reviewed test set, repeatable scoring criteria and independent assessment before any model-performance conclusion can be made.',
        checks: ['Evaluation dimensions are defined at the research-concept level.', 'Public repository currently documents a benchmark scaffold only.'],
        limitations: ['The public repository does not yet contain an implemented benchmark or repeatable test suite.', 'No benchmark score is claimed.', 'No model comparison result is claimed.', 'Mentor and peer review and repeatable evaluation remain outstanding.']
      },
      impact: {
        heading: 'Impact and the next measure',
        body: 'The current contribution is an evaluation framework direction that makes geographic evidence failure explicit. Its research value will depend on whether a reproducible test set can distinguish grounded spatial reasoning from plausible but unsupported answers.',
        measures: ['Accuracy on geographically matched evidence cases', 'Detection rate for spatially mismatched evidence', 'Correct abstention rate on insufficient evidence', 'Inter-rater agreement on provenance and spatial-fit scoring']
      },
      links: [{label:'SIGMA-GEO repository',url:'https://github.com/mrzulqarnainnadabo/SIGMA-GEO'}]
    }

]; 

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
