# Kaduna settlement-block screening

This workflow applies a transparent, provisional screening method to GRID3 NGA Settlement Extents v4.1 for Kaduna State. It downloads the GRID3 operational state boundary and settlement-block features, validates geometry and source fields, and produces a candidate layer for human review.

It does **not** publish results, estimate population, measure access to public green space, or establish a legal administrative boundary.

## Run

Python 3.11+ is recommended.

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r scripts/atlas/requirements.txt
python scripts/atlas/kaduna_settlement_screening.py
```

Optional full source extract:

```bash
python scripts/atlas/kaduna_settlement_screening.py --include-source-extract
```

Optional feature safety cap:

```bash
python scripts/atlas/kaduna_settlement_screening.py --max-features 150000
```

Outputs are written to `outputs/atlas/kaduna-settlement-screening/` (ignored by Git):
- `qa_summary.json` — sources, retrieval time, geometry/attribute QA, measurement checks, thresholds and interpretation limits
- `kaduna_screening_candidates.csv` — candidate attributes and WGS84 centroid coordinates
- `kaduna_screening_candidates.geojson` — candidate block geometries
- `kaduna_source_blocks.geojson` — optional full source extract

## Method

1. Query GRID3's operational Kaduna state boundary (released 2020). It is a working study extent, not a claim about a gazetted legal boundary.
2. Query GRID3 NGA Settlement Extents v4.1 by the boundary bounding box, then intersect features with the state geometry.
3. Repair invalid geometries while recording how many were repaired; remove empty geometries and duplicate block IDs.
4. Reproject to WGS 84 / UTM zone 32N (EPSG:32632) for metric area checks. Compare geometry area with the source `block_area_sqm` field.
5. Exclude the `open_space`, `airport` and `bd_low_ma_high` screening classes, following the CIESIN settlement-block analysis guide. These are analytical exclusions, not verified land-use classifications.
6. Calculate a relative built-form screening score as `building_area_percentage × gbuilding_mean_height`. Select the top quartile, then intersect with the bottom quartile of both NDVI and EVI.

The resulting candidate set is a **screening heuristic** for blocks combining relatively high built form with relatively low vegetation-index values. It is not a population estimate, a direct measurement of green-space area, or a recommendation to intervene without local validation.

## Field interpretation

- `building_count`: buildings whose centroids fall within the block
- `building_count_density`: centroid-based building count per hectare
- `building_area_percentage`: building area within the block divided by block area, expressed as a percentage
- `gbuilding_mean_height`: mean building height derived from Google Open Buildings 2.5D data, averaged across 2021–2023
- `ndvi_mean` and `evi_mean`: block-level averages from cloud-free median Sentinel-2 Surface Reflectance composites for 2024

## Important limitations

- Building footprints and their centroid assignment are incomplete and may vary by place.
- A high built-form score is not a population or occupancy measure.
- NDVI/EVI are vegetation signals, not direct measures of public green-space access, ownership, quality or safety.
- The 2024 vegetation composite and 2021–2023 height summaries refer to different observation periods.
- Class exclusions, quantile thresholds and the operational boundary require sensitivity analysis.
- Inspect outliers, missingness, boundary-edge blocks and candidate geometry before interpreting or publishing.
- Derived or redistributed GRID3 data must comply with CC BY-SA 4.0 attribution and share-alike terms.

## Sources

- GRID3 NGA Settlement Extents v4.1: https://services3.arcgis.com/BU6Aadhn6tbBEdyk/arcgis/rest/services/GRID3_NGA_settlement_extents_v4_1/FeatureServer/0
- Dataset DOI: https://doi.org/10.7916/73v5-mq06
- GRID3 operational state boundaries: https://services3.arcgis.com/BU6Aadhn6tbBEdyk/arcgis/rest/services/NGA_State_Boundaries_V2/FeatureServer/0
- CIESIN settlement-block analysis guide: https://guides.ciesin.columbia.edu/pages/analysis/Nigeria_Settlement_Block_GreenSpace_Analysis
