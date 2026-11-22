# The Living Atlas — no-cost implementation plan

**Status:** Proposed implementation baseline for PR #5  
**Constraint:** No paid APIs, subscriptions, billing-enabled cloud services, or paid map providers.  
**Production:** Must remain untouched until explicit approval.

## Product direction

The Living Atlas should connect three experiences:

1. **Explore** — an interactive Earth and geographic map.
2. **Understand** — evidence attached to places, with provenance and limitations.
3. **Ask** — an optional Gemini-powered assistant that interprets only retrieved, published evidence.

The portfolio must remain useful if every third-party AI or map service is unavailable.

## Recommended no-cost stack

| Need | Choice | Cost / constraint |
|---|---|---|
| Existing 3D Earth | Keep current Three.js globe and NASA Blue Marble texture | No paid API; global mosaic, not live imagery |
| Interactive geographic map | MapLibre GL JS | Open-source BSD-3-Clause library |
| Vector basemap | OpenFreeMap public tiles | No API key or registration; free public instance, best-effort and no SLA |
| Geographic base data | OpenStreetMap / OpenMapTiles | Show required attribution; do not use OSMF standard tile server for production traffic |
| Earth-observation imagery | NASA GIBS / Worldview services | Public Earth-science imagery; layer update frequency and spatial resolution vary |
| Location hand-off | Google Earth Web search link | Free external experience; not embedded Google Maps Platform |
| AI research companion | Gemini Developer API free tier, optional | Limited model/rate availability; free-tier content may be used to improve Google products |
| Evidence retrieval | Curated public JSON / existing published project sources | No AI required for retrieval; preserve source URLs, dates and scope |

### Why not Google Maps Platform 3D Tiles?

Google's Photorealistic 3D Tiles require a billing-enabled Google Cloud project and API credentials. They are excluded from this phase because the user has explicitly said no paid services or billing setup.

### Important distinction

OpenFreeMap provides an attractive, interactive vector map based on OpenStreetMap. It is **not** a drop-in replacement for Google's photorealistic satellite imagery, Street View or detailed 3D city meshes. The current NASA globe remains the planetary visual; the new map is for navigation and geographic context. A clearly labelled “Open in Google Earth” link can hand visitors to Google's free Earth web experience without integrating its paid APIs.

## Proposed experience

### A. Planetary view

- Keep the existing NASA Blue Marble globe.
- Preserve rotation, zoom, day/night lighting, local clock and reduced-motion behaviour.
- Label the image honestly as a NASA global mosaic, not a live satellite feed.
- Keep all existing controls keyboard-accessible where possible.

### B. Geographic explorer

- Load MapLibre only when the visitor opens the geographic explorer.
- Use OpenFreeMap's public vector style, initially a restrained light style.
- Start with a broad Kaduna South / Kaduna State focus; use approximate area navigation, not a personal home location or street-level pin.
- Provide quick navigation for Kaduna South, Kaduna State, Nigeria and Africa.
- Include visible “© OpenStreetMap contributors · OpenFreeMap” attribution.
- Add a link to open the selected place in Google Earth Web.
- Do not promise 3D buildings, satellite detail or street imagery where the source does not provide them.
- Provide a graceful error/fallback state if map tiles are unavailable.

### C. Evidence explorer

Every evidence item should carry:
- title and source organisation;
- source URL;
- publication / observation date and period;
- geographic scope and level (national, state, LGA, community);
- evidence type (official statistic, administrative record, research, community report, imagery);
- limitations and verification status.

Rules:
- Community submissions are not population prevalence.
- Announcements are not proof of implementation.
- Never infer a boundary, statistic or project location without a source.
- Never publish private or personally identifying community data.
- If no reliable evidence is available, say so.

### D. Gemini companion (optional, free tier only)

Gemini should be an interpretation layer, not the source of truth.

A server-side route may call the Gemini Developer API only when a valid `GEMINI_API_KEY` is configured. The key must never enter client-side JavaScript.

The assistant should:
1. retrieve only approved, public evidence from the portfolio's curated evidence catalogue;
2. send the relevant excerpts and metadata to Gemini;
3. require a structured response with findings, source references, uncertainty and missing evidence;
4. validate returned source IDs against the retrieved catalogue before displaying citations;
5. refuse to invent facts or claim to have inspected satellite imagery when it has not.

**Free-tier privacy condition:** Google's published Gemini API pricing says free-tier content may be used to improve its products. Therefore send only public, non-sensitive portfolio material. Never send private community submissions, unpublished personal information, credentials or confidential records. Do not enable paid-tier billing or paid-only grounding features.

If the key is missing or free quota is exhausted, the assistant should explain that AI is unavailable and still show deterministic, source-backed evidence summaries. No fake AI responses.

## Data sources to prioritise

1. Existing ISEYC Civic Intelligence Observatory published evidence and its source registry.
2. Official Nigerian statistical and administrative sources already referenced by the Observatory.
3. OpenStreetMap for map features, with required attribution.
4. NASA GIBS / Worldview for selected Earth-observation layers, with NASA acknowledgement and each layer's date/resolution clearly stated.
5. Natural Earth for low-resolution global context where appropriate.

Do not scrape Google Earth imagery or use Google's map content as input to Gemini or another model.

## Delivery sequence

### Phase 1 — no-key geographic explorer
- Add a separate, lazy-loaded MapLibre component.
- Connect OpenFreeMap.
- Add the four geographic presets and Google Earth Web hand-off.
- Add attribution, loading/error states and responsive controls.
- Preserve the current Three.js globe.

### Phase 2 — evidence layer
- Create a small, curated, source-attributed evidence catalogue.
- Map only validated geographic scopes.
- Add a side panel with source, date, scope and limitations.
- Start with one verified Kaduna South framework location and national project coverage labels; do not fabricate point coordinates for national projects.

### Phase 3 — Gemini free-tier integration
- Add a server-side API route and structured response schema.
- Keep the API key in deployment environment variables only.
- Add a visible AI/data-use notice.
- Add rate limits and request-size limits.
- Test quota exhaustion and missing-key fallback.
- Do not enable billing or paid-tier services.

### Phase 4 — NASA imagery layers
- Prototype one suitable NASA GIBS layer.
- Confirm the exact product, projection, temporal availability, attribution and mobile performance before exposing it.
- Keep scientific imagery distinct from street maps and project evidence.

### Phase 5 — review and release
- Test on low-bandwidth mobile and desktop.
- Check attribution, keyboard access, reduced motion and error states.
- Verify every mapped location and every displayed source.
- Keep the feature on the existing review branch until approved.
- Do not merge or deploy to production without explicit approval.

## Acceptance criteria

- No paid API, paid map provider, billing account or subscription is required.
- The existing globe continues to work independently.
- Geographic explorer works without an API key.
- Google Earth is an optional external hand-off, not a paid API integration.
- Every map source is attributed.
- Every evidence item has provenance and scope.
- Gemini is clearly labelled as AI, uses only public retrieved evidence and validates citations.
- Missing API keys, service outages and exhausted free quotas produce honest fallback states.
- No personal home address or private community information is exposed.
- Production remains unchanged pending user review.
