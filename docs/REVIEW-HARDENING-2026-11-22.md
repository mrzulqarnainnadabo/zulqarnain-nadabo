# Quality review — unified operating system
Date: 22 November 2026 · Branch: feat/unified-personal-operating-system

## Atlas: inspected implementation and open research
The current map uses MapLibre GL JS 5.6.2 and OpenFreeMap Positron; NASA GIBS MODIS Terra Corrected Reflectance True Color daily composite (two-day UTC offset); EOxCloudless modified Copernicus Sentinel-2 2016 imagery; Mapterhorn raster DEM; and OpenStreetMap building polygons extruded only where source height attributes exist. Kaduna South is an approximate view/marker near 7.43 E, 10.45 N, not a surveyed boundary or verified neighbourhood polygon.

The map's native attribution control was disabled; the review branch restores it. The 2016 Sentinel-2 mosaic is historical, MODIS is a daily composite, Mapterhorn terrain is assembled from source datasets with source-specific licences, and OSM building-height coverage is incomplete. The map is not live video.

### Spatial research chapters
1. **The shape of settlement — Kaduna State.** GRID3 NGA Settlement Extents v4.1 (August 2026), CC BY-SA 4.0. Acquire and inspect the source, verify CRS and geometry, extract Kaduna, quantify attribute completeness, measure morphology in an appropriate local projected CRS and publish derived data under share-alike terms. This dataset does not establish population, occupancy or service access.
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

Integration decision: Agent Desk is the unified control surface; AI Platform runs behind a server-side adapter; Agent Phone contributes workflow concepts and candidate API contracts; WhatsApp Assistant is a channel adapter. No consequential execution until identity, resource ownership, approval integrity, idempotency and audit tests pass.

## Workspace boundary
The new /workspace route is a noindex design preview. Captures exist only in component state for the current session. No IDCC, AI Platform, Notion, Hubil or Autoverse data is connected. Do not represent it as authenticated private operations. Production requires individual sign-in, server-side sessions, resource-scoped authorization and domain-specific adapters. Keep commercial records isolated.

## Release boundary
Draft PR only. Netlify preview only. No Vercel access, production deployment, merge, external communication or consequential execution. Browser-level visual QA remains required before declaring design acceptance.
