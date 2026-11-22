# Quality review — unified operating system
Date: 22 November 2026 · Branch: feat/unified-personal-operating-system

## Atlas: inspected implementation and open research
The Atlas now combines the NASA Blue Marble global mosaic Earth with a live local clock and a calculated daylight/night indicator for the approximate Kaduna/Nigeria region, plus MapLibre GL JS 5.6.2 and OpenFreeMap Positron; NASA GIBS MODIS Terra Corrected Reflectance True Color daily composite (two-day UTC offset); EOxCloudless modified Copernicus Sentinel-2 2016 imagery; Mapterhorn raster DEM; and OpenStreetMap building polygons extruded only where source height attributes exist. Earth WebGL and texture loading are deferred until the Earth enters the viewport. Kaduna South is an approximate view/marker near 7.43 E, 10.45 N, not a surveyed boundary or verified neighbourhood polygon.

The map's native attribution control was disabled; the review branch restores it. The 2016 Sentinel-2 mosaic is historical, MODIS is a daily composite, Mapterhorn terrain is assembled from source datasets with source-specific licences, and OSM building-height coverage is incomplete. The map is not live video.

### Spatial research chapters
1. **The shape of settlement — Kaduna State.** GRID3 NGA Settlement Extents v4.1 (August 2026), CC BY-SA 4.0, exposed as FeatureServer layer 0. Its fields include block area/perimeter, building counts and density, building-area measures and vegetation indices. Acquire/query the source, verify CRS and geometry, extract Kaduna, quantify attribute completeness, measure morphology in an appropriate local projected CRS and publish derived data under share-alike terms. This dataset does not establish population, occupancy or service access.
2. **A changing Kaduna landscape.** KADGIS describes multi-year land-cover data in GeoTIFF/SHP. The actual data, licence, reference years, legend, resolution and method must be acquired and reconciled before comparison.
3. **Service access, not just proximity — Kaduna South.** Requires a dated facility register, verified coordinates, operational status and a routable road network. The Observatory readiness note states that facility-level PHC observations have not yet been ingested. No access result is claimed.

### Atlas acceptance tests
Verify source, attribution, licence, reference date and zoom limits; test UTC date edge cases; test basemap and imagery failures independently; measure mobile GPU/low-bandwidth performance; test touch and reduced motion; ensure location is opt-in and not persisted; validate CRS, nodata, topology, positional accuracy and scale before analytical claims.

## ISEYC: model based on IDCC
Official department IDs/labels: education — Education & Capacity Building; health — Health & Well-being; digital-systems — Software & Technology; civic-affairs — Civic Department. IDCC defines department mandates, boundaries, functions, strategic priorities, coordination partners, programme records, work-plan records, reports and shared registers. The new visual maps these real record types without inventing programme instances, officer appointments, outcomes or an approved organogram.

Civic Mandate's review/publish path belongs to the Civic Department. Published records feed the Observatory, whose evidence can support all four departments. Civic Brain remains advisory. IDCC remains the private operational system of record. The portfolio model is explanatory, not a live feed; restricted officer, meeting, disciplinary, partner and community-submission data are not exposed.

## Agent integration findings
AI Platform's README and integration guide describe a provider-neutral runtime with trusted Supabase JWT authorization, deterministic capabilities and server-side provider keys. Consumer applications retain authentication and domain rules. It is the model/capability substrate, not yet the full orchestrator.

Agent Phone main v0.8 uses a shared APP_AUTH_TOKEN. Its helper returns success if the token is empty, and its records do not include user/tenant ownership. Approval endpoints update a record by ID and do not demonstrate exact-payload binding or execution-time reauthorization. Do not connect this branch to consequential tools.

Agent Phone draft PR #2 describes password-based owner sessions, signed cookies, revocation, rate limiting, approval payload hashes/expiry/single-use consumption and allowlisted read-only GitHub tools. It explicitly leaves XSS/session-storage review, provider cost accounting and coordinated API/frontend migration for review. Candidate only; not production-ready.

The Agent Desk design now accounts for Agent Phone's existing control concepts: projects/tasks/checkpoints, agent profiles and permissions, goals and handoffs, approval queue, usage, tool audit and read-only GitHub inspection. These are design mappings, not live controls.

Integration decision: Agent Desk is the unified control surface; AI Platform runs behind a server-side adapter; Agent Phone contributes workflow concepts and candidate API contracts; WhatsApp Assistant is a channel adapter. No consequential execution until identity, resource ownership, approval integrity, idempotency and audit tests pass.

## Workspace boundary
The new /workspace route is a noindex design preview. Captures exist only in component state for the current session. No IDCC, AI Platform, Notion, Hubil or Autoverse data is connected. Do not represent it as authenticated private operations. Production requires individual sign-in, server-side sessions, resource-scoped authorization and domain-specific adapters. Keep commercial records isolated.

## Opportunity and relationship records: verified Notion structures
The connected Notion workspace already contains three relevant IDCC data sources:
- **DCC — Partner Organisations**: canonical organisation directory. Fields include organisation type, department scope, relationship status (Prospect, Under review, Engaged, Active collaborator, Paused, Declined, Former collaborator), verification status/source/date, due-diligence notes, relationship owner and official channels. Its description explicitly says an organisation record does not imply an active partnership.
- **DCC — External Contacts**: named contacts related to partner organisations. Fields include official role, contact preference, consent/contact basis, contact status (including Do not contact), source URL and verification. Its description explicitly classifies contact data as private operational information requiring access control.
- **IDCC — Programmes & Work Register**: programme/project/work records with department, status, accountable role, priority, risk, budget requested/approved/actual, dates, acceptance criteria and evidence/deliverable link. It explicitly separates planned activity, delivered outputs and verified outcomes.

The opportunity workflow in the workspace preview reflects those structures: research signal → organisation prospect → due diligence → verified contact → concept note → proposal → delivery. A read-only count query against each of the three data sources returned zero rows at the time of review. The first-wave outreach page contains a draft prospect queue, but it is marked unverified and is not a CRM record. These sources are not wired into the portfolio; the preview contains no live records. Actual sending requires an authenticated mail connector. The integration must preserve the organisation-versus-contact distinction, contact restrictions, verification state and ISEYC resource-level authority. The integration must preserve the organisation-versus-contact distinction, contact restrictions, verification state and ISEYC resource-level authority.

## Release boundary
Draft PR only. Netlify preview only. No Vercel access, production deployment, merge, external communication or consequential execution. Browser-level visual QA remains required before declaring design acceptance.


## Local Atlas layer — GRID3 settlement blocks
The map now includes an opt-in **GRID3 v4.1 blocks** layer. It queries the public CIESIN/GRID3 ArcGIS FeatureServer only after the visitor selects the layer, and only for the current map extent. Requests return GeoJSON in EPSG:4326 and request block ID, block area, building count, building-count density, mean NDVI and extent type. Results are paged at 1,000 records with a 4,000-feature client cap; the UI states when that cap is reached. Clicking a feature reveals only those source attributes. No density class, population estimate, service-access score or administrative boundary is inferred.

The source layer metadata reports polygon geometry, Web Mercator source extent, 2,000 maximum records per request, and a published scale range. The map limits display to zoom 13.5 and above. The data is not a gazetted boundary, occupancy count or population surface. Known limitations include sensitivity to roads/railways/rivers completeness, possible industrial-block misclassification, dependence on building-footprint availability for descriptive metrics, and NDVI/EVI compositing windows. The source is licensed CC BY-SA 4.0; any redistributed derived layer must preserve the share-alike terms.

The local layer is an inspection aid, not a completed research result. The settlement-morphology chapter still requires a reproducible Kaduna-wide extract, geometry/topology and CRS validation, completeness audit, projected measurement method, sensitivity tests and a dated research note before any conclusions are published.

### Map imagery and terrain attribution
- EOxCloudless 2016 mosaic attribution is displayed as required by EOX: EOxCloudless by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 & 2017). The 2016 vintage is CC BY 4.0; later vintages have different licensing and are not used here.
- Mapterhorn terrain attribution links to its regional source catalogue. Its source datasets and resolutions vary by region; do not describe all terrain tiles as a single uniform bare-earth DTM.
- Native MapLibre attribution remains enabled. The custom source credit line is additional, not a replacement.
