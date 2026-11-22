# Kaduna settlement-block screening

A reproducible research workflow is available at `scripts/atlas/kaduna_settlement_screening.py`. Read `scripts/atlas/README.md` for setup, method and output definitions.

## Data and method

- Study extent: GRID3 operational Kaduna state boundary (released 2020). This is a working research extent, not a claim about a gazetted legal boundary.
- Settlement data: GRID3 NGA Settlement Extents v4.1, August 2026, DOI 10.7916/73v5-mq06, CC BY-SA 4.0.
- Geometry: query candidate blocks by the state bounding box, then intersect with the boundary polygon.
- Measurement: compare source area with projected geometry area in WGS 84 / UTM zone 32N (EPSG:32632).
- Screening: exclude open-space, airport and `bd_low_ma_high` classes as provisional non-residential proxies; calculate `building_area_percentage × gbuilding_mean_height`; identify the upper quartile of this proxy that also falls in the lower quartile of both NDVI and EVI.

CIESIN's published field definitions state that building counts are assigned by centroid to blocks, building-count density is per hectare, building-area percentage is a share of block area, mean building height summarizes 2021–2023, and NDVI/EVI summarize 2024 Sentinel-2 composites.

## Interpretation boundary

The screening score is a relative built-form proxy. It is not a population or occupancy estimate, and NDVI/EVI are not direct measures of public green-space access, quality, ownership or safety. Exclusions and quartile thresholds require sensitivity review. Candidate blocks require visual inspection and local validation before publication.

## Run

```bash
python -m pip install -r scripts/atlas/requirements.txt
python scripts/atlas/kaduna_settlement_screening.py
```

The script writes a QA summary, candidate CSV and candidate GeoJSON under `outputs/atlas/kaduna-settlement-screening/`. It has not yet been run against the live service; no Kaduna findings or candidate counts are claimed.
