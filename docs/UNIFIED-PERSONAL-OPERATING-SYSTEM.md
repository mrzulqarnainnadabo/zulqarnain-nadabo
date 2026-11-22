# Unified Personal Operating System

**Product direction:** One operating system for Zulqarnain's work, research, projects, spatial intelligence, institutional architecture and AI-assisted execution.  
**Primary interface:** This portfolio repository, evolved into one coherent public and private experience.  
**Status:** Architecture baseline for review; implementation is phased.  
**Production policy:** No Vercel access, production deployment, merge or release without explicit approval. Review previews use Netlify only.

## 1. The product decision

Stop designing the portfolio, Earth explorer, ISEYC visual, agent control room, research workspace and opportunity tracker as separate products that require the user to move between platforms.

Build one product with one navigation model, one visual language, one personal workspace and connected domain services.

The experience has two trust zones:

- **Public profile:** the professional front door: identity, selected work, spatial atlas, institutional architecture, research and collaboration.
- **Private workspace:** the user's operating environment: projects, research, tasks, agent runs, evidence, opportunities, contacts, drafts and approvals.

They are two modes of the same product, not two unrelated websites. Public content is intentionally published; private work is private by default.

## 2. Product structure

Use one global shell and a small number of meaningful destinations.

### Public

1. **Overview** — professional identity, current focus and selected work.
2. **Atlas** — the geographical experience and spatial research.
3. **ISEYC** — an explorable institutional architecture, grounded in actual departments, programmes, evidence and governance.
4. **Work** — projects and research with honest maturity and evidence labels.
5. **Connect** — collaboration, professional enquiries and contact.

### Private workspace

1. **Today** — concise personal operating brief, priorities, deadlines and decisions waiting for the user.
2. **Projects** — one portfolio of active work across personal research, ISEYC, Hubil and approved commercial projects.
3. **Atlas Studio** — spatial projects, source catalogue, map layers, provenance and analysis notes.
4. **Institution Studio** — ISEYC departments, programmes, workplans, meetings, actions and approved evidence, filtered by the user's actual authority.
5. **Research** — questions, sources, notes, briefs, evidence checks and publications.
6. **Agent Desk** — task orchestration, specialist agents, run history, handoffs and a single approval inbox.
7. **Opportunities** — partnerships, fellowships, commissions, grants and qualified leads.
8. **Library** — reusable documents, methods, references and assets.

The private workspace must be useful on mobile first, then scale to tablet and desktop. Avoid a dense admin dashboard. The default Today view should show only what needs attention.

## 3. One interface does not mean one database

Keep domain systems of record and security boundaries intact. The unified product is the user experience and orchestration layer, not a data vacuum.

| Domain | Source of truth | Unified product integration |
|---|---|---|
| Personal portfolio and public work | This Next.js repository and approved content | Native pages and public modules |
| Spatial atlas and evidence | Observatory, curated geospatial data and reproducible analysis artefacts | Atlas UI, source catalogue and validated read APIs |
| ISEYC institutional operations | Private IDCC repository and its authorised backend/records | Role-scoped read/draft actions only |
| Civic public intelligence | Published Observatory, Mandate and Civic Brain contracts | Public evidence and advisory views only |
| Agent runtime and policy | AI Platform | Authenticated task, model, capability and audit APIs |
| Human agent control | Agent Phone concepts and components | Rebuild/adapt as Agent Desk inside the unified shell; do not require a second app |
| Messaging | WhatsApp Assistant | Optional channel adapter to the same tasks and approvals |
| Hubil business operations | Hubil FirstLine and authorised business records | Separate workspace/data scope |
| Autoverse | Autoverse commercial system | Separate tenant and explicit opt-in integration; no shared customer data |

Use narrow API adapters and stable contracts. Avoid direct cross-database reads. Do not duplicate private institutional or commercial records in the portfolio database.

## 4. The Atlas is a primary experience, not decoration

The Earth/map work is a central differentiator and must be rebuilt with geographic integrity, not visual tricks.

### Experience model

- The globe is the **planetary index and orientation layer**.
- The 2D projection-aware map is the primary surface for local navigation and spatial evidence.
- A 3D terrain view is an optional way to understand landform and context, not a claim of photorealistic city reconstruction.
- Evidence pages and project narratives explain what the map supports, how it was derived and what remains unknown.

### Scale ladder

Planet → Africa / West Africa → Nigeria → Kaduna State → Kaduna South → validated local study area.

At each scale, the interface should change its data and interaction appropriately. Do not imply that a national statistic can be inspected at ward or street scale.

### Data and visual integrity

- Every layer has source, licence, retrieval date, reference period, CRS, resolution/scale, method, evidence nature (observed, administrative, derived or modelled), accuracy and known limitations.
- Use a projection appropriate to the task. Web-map projection is for navigation; local measurements and analysis must use an appropriate projected CRS (for Kaduna work, evaluate UTM zone 32N / EPSG:32632 and legacy datum transformations as relevant).
- Copernicus DEM GLO-30 is a surface model, not bare-earth terrain.
- OSM completeness and building-height coverage vary. Never fabricate heights or imply photogrammetric facades.
- Historical satellite mosaics and daily composites must be dated and labelled. Neither is live video.
- Modelled population surfaces must look and read as modelled estimates, not census observations.
- Missing evidence is shown as missing, not filled with invented geometry.
- No private community coordinates or personally identifying records appear on public maps.

### Engine decision

Do not migrate engines just because one is more impressive. The current MapLibre implementation is a review candidate, not an accepted final map. Evaluate the globe/index, local analytical map, terrain, data provenance, mobile performance and accessibility against a repeatable test set. If Cesium proves necessary for a specific geospatial capability, isolate it to that view; do not introduce two renderers without a demonstrated benefit.

### First map chapters

Ship three well-validated chapters rather than a large layer catalogue:

1. A global-to-Nigeria orientation experience with clear imagery dates and scale.
2. A Kaduna landscape / land-cover chapter using correctly licensed, dated Earth-observation sources.
3. One original, reproducible Kaduna spatial analysis with documented method, validation and limitations.

Do not publish a local analysis until source quality, CRS, nodata, topology and ground-truth limitations have been checked.

## 5. ISEYC visual architecture is the second primary experience

The ISEYC section should let a visitor understand the institution by exploring its real structure and how work moves through it. It is not a decorative 3D office tour and must not invent an approved organogram.

### Official departments

- Education & Capacity Building
- Health & Well-being
- Software & Technology
- Civic Department

### Institutional layers to visualise

1. **Governance and leadership** — National President, Council and Secretariat, with actual appointment and authority status.
2. **Departments** — the four official departments, each with its mandate, leadership only where confirmed, programmes and evidence.
3. **Shared intelligence and operations** — Observatory evidence, Civic Brain advisory support and IDCC workflows, represented as shared enabling capabilities rather than invented departments.
4. **Programmes and public engagement** — approved programmes, community participation and partner relationships.
5. **Evidence and accountability** — intended outcomes, source evidence, review status and limitations.

Interactions should show real relationships: programme → responsible department → accountable role → evidence → review → public outcome. The Civic Department owns the Civic Mandate review/publish workflow; all departments can use Observatory evidence.

The visual may use a spatial/architectural metaphor, but its content must be generated from approved IDCC structures and actual permission-aware data. Do not expose restricted officer records, meeting details, disciplinary material or private community submissions.

## 6. Agent system: invisible workforce, one control surface

Agents should make the operating system more productive without becoming another platform to manage.

### Shared task lifecycle

Request → scope → plan → specialist work → independent review → approval (if needed) → execution → result → audit.

The workflow engine is deterministic application logic. Agents do not grant themselves permissions or approve each other.

### Initial specialist roles

- Chief of Staff / Orchestrator — understands priorities, creates tasks and tracks progress.
- Research Analyst — gathers sources and drafts research.
- Evidence Reviewer — checks claims, citations, calculations and uncertainty independently.
- Project Operator — prepares code, issues, documents and project updates.
- Communications Drafter — prepares messages and proposals; does not send without approval.

Agent Phone's existing mobile-first controls and approval concepts should inform the Agent Desk, but its current shared-token prototype must not be connected to consequential tools until individual identity, tenant/resource scoping, ownership checks and approval integrity are fixed.

### First workflow

**Research-to-Delivery:** submit a goal → gather cited evidence → independently review → present a concise brief and action plan → on approval, create a GitHub issue or draft PR in the assigned repository → run checks → return the result to the same task.

The same task should be accessible from the unified workspace and, later, WhatsApp. WhatsApp is a channel, not a separate brain or approval authority.

## 7. Security and authority model

- One sign-in experience may serve multiple workspaces, but permissions remain domain- and resource-specific.
- Personal workspace identity is not proof of ISEYC appointment or institutional authority.
- A staff session, email address or role label is not sufficient to approve restricted institutional actions.
- AI output is draft/advisory by default.
- No autonomous officer appointment, financial commitment, disciplinary action, public institutional statement, evidence verification, external message, public publication, merge or deployment.
- Approval binds to the exact action, payload, target resource, actor, task and expiry. Any payload change invalidates it.
- Re-authorise at execution time; approvals are single-use and auditable.
- Fail closed when identity or policy configuration is missing.
- Keep Autoverse customer/dealer data and Hubil commercial records isolated from personal and ISEYC contexts.
- Never send confidential or personal records to a third-party model unless a specific lawful, authorised data-processing arrangement exists.

## 8. Visual and interaction principles

- One coherent visual language, but different content atmospheres where the subject calls for them.
- Editorial typography, meaningful diagrams, strong spatial composition and purposeful motion.
- Avoid generic SaaS cards, excessive panels, decorative metrics, fake live feeds, gradients as decoration and stock AI imagery.
- The map should feel like a serious geographical instrument; ISEYC should feel like an institution that can be understood; Agent Desk should feel quiet and efficient.
- Use progressive disclosure: visual overview first, short labels always available, detailed evidence on demand.
- Accessibility, keyboard navigation, reduced motion, responsive touch targets and low-bandwidth behaviour are release criteria.
- The default interface should not force the user to switch between multiple apps to see what needs attention.

## 9. Delivery sequence

### Phase 1 — unify the product structure
- Establish one global navigation, design tokens and responsive shell.
- Preserve the current public portfolio and Living Atlas work as the base.
- Define the public/private boundary and authentication architecture.
- Add the workspace information architecture and route map.
- Keep all existing services in place; no risky data migration.

**Exit:** a visitor sees one coherent public product; the user has one clearly defined private workspace architecture.

### Phase 2 — finish the Atlas properly
- Audit the current Earth and MapLibre implementation against geographic and mobile acceptance tests.
- Fix inaccurate or misleading behaviour; no automatic geolocation prompt by default.
- Add a provenance catalogue and the first validated map chapter.
- Retain the globe as an orientation experience and use a projection-aware map for local evidence.
- Do not add a 3D feature unless it improves a real task.

**Exit:** one credible, responsive Atlas chapter with visible provenance and honest limitations.

### Phase 3 — build the ISEYC institutional experience
- Read actual IDCC schema, public/private boundaries, department and programme records.
- Produce a data-backed visual model.
- Show governance, four departments, shared intelligence and programme/evidence relationships.
- Validate every label and link against the institution's actual structure.

**Exit:** visitors can understand ISEYC's actual architecture without exposing restricted records or inventing authority.

### Phase 4 — consolidate the agent desk
- Resolve Agent Phone authentication and approval blockers.
- Connect the Agent Desk to AI Platform task/run APIs.
- Implement the first Research-to-Delivery workflow and audit trail.
- Add WhatsApp only as a channel adapter after the unified workflow works.

**Exit:** one workspace task view and approval inbox; no separate agent app required for normal use.

### Phase 5 — connect work, opportunities and publishing
- Bring project status, research notes, opportunity pipeline, contacts and editorial work into the private workspace.
- Connect Hubil only through scoped capabilities.
- Keep Autoverse separately permissioned.
- Measure time saved and deliverables shipped before adding more automation.

**Exit:** the operating system helps turn research and ideas into completed work and credible professional opportunities.

## 10. Quality gates

A phase is not complete because the UI renders.

- Functional acceptance tests for every interaction.
- Mobile tests on constrained devices and network conditions.
- Keyboard and screen-reader review; reduced-motion support.
- Evidence/source and licence audit for every spatial layer.
- Claims and maturity review for every public project.
- Tenant, role and resource permission tests for every private integration.
- Failure states, retries, rate limits and cost controls for agent workflows.
- Independent review of the map methodology and ISEYC structure.
- Netlify preview for review only. No Vercel actions. No production deploy, merge or release without explicit approval.

## 11. Product success

Measure whether the operating system helps the user:

- move from research question to reviewed deliverable faster;
- understand spatial evidence with fewer unsupported assumptions;
- explain ISEYC's real architecture clearly;
- complete more meaningful project work with less coordination overhead;
- identify and follow up credible partnership and commission opportunities;
- maintain a trustworthy public record of work without overstating credentials or outcomes.

**The product is not a collection of AI features. It is a reliable environment for thinking, researching, designing, coordinating and delivering work.**
