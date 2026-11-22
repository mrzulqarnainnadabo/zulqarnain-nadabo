#!/usr/bin/env python3
"""Reproducible Kaduna settlement-block screening from GRID3 v4.1.

This is a research aid, not an official population estimate, legal boundary,
or green-space accessibility assessment. It downloads public ArcGIS data,
records QA, and writes candidate blocks for human review.
"""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import geopandas as gpd
import pandas as pd
import requests
from shapely.ops import unary_union

SETTLEMENT_LAYER = (
    "https://services3.arcgis.com/BU6Aadhn6tbBEdyk/arcgis/rest/services/"
    "GRID3_NGA_settlement_extents_v4_1/FeatureServer/0"
)
STATE_BOUNDARY_LAYER = (
    "https://services3.arcgis.com/BU6Aadhn6tbBEdyk/arcgis/rest/services/"
    "NGA_State_Boundaries_V2/FeatureServer/0"
)
SETTLEMENT_FIELDS = ",".join(
    [
        "fid",
        "block_id",
        "block_area_sqm",
        "block_perimeter",
        "building_count",
        "building_area_percentage",
        "building_count_density",
        "gbuilding_mean_height",
        "ndvi_mean",
        "evi_mean",
        "extent_type",
        "composite_class",
    ]
)
MEASUREMENT_CRS = "EPSG:32632"  # WGS 84 / UTM zone 32N; Kaduna lies in zone 32N.
PAGE_SIZE = 2000


def fetch_features(
    session: requests.Session,
    layer_url: str,
    params: dict[str, Any],
    *,
    max_features: int,
) -> list[dict[str, Any]]:
    """Fetch a paginated ArcGIS FeatureServer GeoJSON query, failing on caps."""
    features: list[dict[str, Any]] = []
    offset = 0
    while True:
        query = {
            **params,
            "resultRecordCount": PAGE_SIZE,
            "resultOffset": offset,
            "f": "geojson",
        }
        response = session.get(f"{layer_url}/query", params=query, timeout=90)
        response.raise_for_status()
        payload = response.json()
        if payload.get("error"):
            raise RuntimeError(
                f"ArcGIS query error: {payload['error'].get('message', 'unknown error')}"
            )
        page = payload.get("features") or []
        if not page:
            break
        features.extend(page)
        if len(features) > max_features:
            raise RuntimeError(
                f"Query exceeded safety cap ({max_features:,} features). "
                "Narrow the study extent or explicitly raise --max-features."
            )
        offset += len(page)
        if len(page) < PAGE_SIZE and not payload.get("exceededTransferLimit"):
            break
    return features


def as_geodataframe(features: list[dict[str, Any]]) -> gpd.GeoDataFrame:
    if not features:
        return gpd.GeoDataFrame(geometry=[], crs="EPSG:4326")
    return gpd.GeoDataFrame.from_features(features, crs="EPSG:4326")


def repair_geometries(frame: gpd.GeoDataFrame) -> tuple[gpd.GeoDataFrame, dict[str, int]]:
    """Remove empty geometry and make invalid geometry valid, recording counts."""
    result = frame.copy()
    empty_count = int(result.geometry.isna().sum() + result.geometry.is_empty.sum())
    result = result.loc[result.geometry.notna() & ~result.geometry.is_empty].copy()
    invalid_count = int((~result.geometry.is_valid).sum())
    if invalid_count:
        try:
            from shapely import make_valid

            result.loc[~result.geometry.is_valid, "geometry"] = (
                result.loc[~result.geometry.is_valid, "geometry"].apply(make_valid)
            )
        except ImportError:
            result.loc[~result.geometry.is_valid, "geometry"] = (
                result.loc[~result.geometry.is_valid, "geometry"].buffer(0)
            )
    return result, {"empty_geometry": empty_count, "invalid_geometry_repaired": invalid_count}


def numeric(frame: gpd.GeoDataFrame, field: str) -> pd.Series:
    return pd.to_numeric(frame[field], errors="coerce")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=Path("outputs/atlas/kaduna-settlement-screening"),
        help="Output directory (ignored by Git by default).",
    )
    parser.add_argument(
        "--max-features",
        type=int,
        default=100_000,
        help="Safety cap for settlement-block features downloaded.",
    )
    parser.add_argument(
        "--include-source-extract",
        action="store_true",
        help="Also write the complete Kaduna block extract as GeoJSON.",
    )
    args = parser.parse_args()

    args.out_dir.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": "ZulqarnainAtlasResearch/0.1 (GRID3 source audit)"})

    # GRID3 state boundaries are operational reference geography (2020), not a
    # claim that the geometry is a gazetted legal boundary.
    state_features = fetch_features(
        session,
        STATE_BOUNDARY_LAYER,
        {
            "where": "statename = 'Kaduna'",
            "outFields": "statename,statecode,source",
            "returnGeometry": "true",
            "outSR": "4326",
        },
        max_features=100,
    )
    state = as_geodataframe(state_features)
    if state.empty:
        raise RuntimeError("The GRID3 operational boundary query returned no Kaduna feature.")
    state_name = state["statename"].astype(str).str.casefold()
    state = state.loc[state_name == "kaduna"].copy()
    if state.empty:
        raise RuntimeError("The returned state boundary did not identify Kaduna.")
    boundary = unary_union(state.geometry)
    west, south, east, north = boundary.bounds

    block_features = fetch_features(
        session,
        SETTLEMENT_LAYER,
        {
            "where": "1=1",
            "geometry": f"{west},{south},{east},{north}",
            "geometryType": "esriGeometryEnvelope",
            "inSR": "4326",
            "outSR": "4326",
            "spatialRel": "esriSpatialRelIntersects",
            "outFields": SETTLEMENT_FIELDS,
            "returnGeometry": "true",
            "orderByFields": "fid ASC",
        },
        max_features=args.max_features,
    )
    raw = as_geodataframe(block_features)
    if raw.empty:
        raise RuntimeError("The GRID3 settlement query returned no blocks in the Kaduna extent.")

    # A bbox query is only a candidate extract. Intersect against the actual
    # operational boundary polygon before calculating any Kaduna statistics.
    raw = raw.loc[raw.geometry.intersects(boundary)].copy()
    intersecting_count = len(raw)
    raw, geometry_qa = repair_geometries(raw)
    repaired_count = len(raw)
    duplicate_ids = int(raw["block_id"].duplicated(keep="first").sum())
    raw = raw.drop_duplicates(subset=["block_id"], keep="first").copy()

    if raw.empty:
        raise RuntimeError("No valid settlement blocks remained after boundary filtering.")

    # Compare the source area attribute with a projected geometry measurement.
    metric = raw.to_crs(MEASUREMENT_CRS)
    measured_area = metric.geometry.area
    source_area = numeric(raw, "block_area_sqm")
    valid_area = source_area.gt(0) & measured_area.gt(0)
    area_difference = ((measured_area[valid_area] - source_area[valid_area]).abs()
                       / source_area[valid_area]) * 100

    # Keep class exclusions explicit and inspectable. CIESIN's example screening
    # treats open space, airports and bd_low_ma_high as non-residential proxies.
    classes = raw["composite_class"].fillna("").astype(str).str.casefold()
    excluded_classes = {"open_space", "airport", "bd_low_ma_high"}
    excluded = classes.isin(excluded_classes)
    eligible = raw.loc[~excluded].copy()

    for field in (
        "building_area_percentage",
        "gbuilding_mean_height",
        "ndvi_mean",
        "evi_mean",
    ):
        eligible[field] = numeric(eligible, field)

    eligible["built_form_screening_score"] = (
        eligible["building_area_percentage"] * eligible["gbuilding_mean_height"]
    )
    scored = eligible.dropna(
        subset=[
            "built_form_screening_score",
            "ndvi_mean",
            "evi_mean",
        ]
    ).copy()
    if scored.empty:
        raise RuntimeError(
            "No blocks have complete built-form and vegetation fields for the screening."
        )

    built_threshold = float(scored["built_form_screening_score"].quantile(0.75))
    ndvi_threshold = float(scored["ndvi_mean"].quantile(0.25))
    evi_threshold = float(scored["evi_mean"].quantile(0.25))
    candidates = scored.loc[
        (scored["built_form_screening_score"] >= built_threshold)
        & (scored["ndvi_mean"] <= ndvi_threshold)
        & (scored["evi_mean"] <= evi_threshold)
    ].copy()

    # Centroids are calculated in the projected CRS, then transformed to WGS84.
    candidate_metric = candidates.to_crs(MEASUREMENT_CRS)
    centroids = gpd.GeoSeries(candidate_metric.geometry.centroid, crs=MEASUREMENT_CRS).to_crs(
        "EPSG:4326"
    )
    candidates["longitude"] = centroids.x.values
    candidates["latitude"] = centroids.y.values

    output_fields = [
        "block_id",
        "block_area_sqm",
        "building_count",
        "building_count_density",
        "building_area_percentage",
        "gbuilding_mean_height",
        "ndvi_mean",
        "evi_mean",
        "extent_type",
        "composite_class",
        "built_form_screening_score",
        "longitude",
        "latitude",
    ]
    candidates[output_fields].sort_values(
        ["built_form_screening_score", "ndvi_mean"], ascending=[False, True]
    ).to_csv(args.out_dir / "kaduna_screening_candidates.csv", index=False)

    candidate_geo = candidates.to_crs("EPSG:4326")
    candidate_geo_path = args.out_dir / "kaduna_screening_candidates.geojson"
    if candidate_geo.empty:
        candidate_geo_path.write_text(
            json.dumps({"type": "FeatureCollection", "features": []}) + "\n",
            encoding="utf-8",
        )
    else:
        candidate_geo[output_fields].to_file(candidate_geo_path, driver="GeoJSON")
    if args.include_source_extract:
        raw.to_crs("EPSG:4326").to_file(
            args.out_dir / "kaduna_source_blocks.geojson",
            driver="GeoJSON",
        )

    summary = {
        "retrieved_at_utc": datetime.now(timezone.utc).isoformat(),
        "study_area": "Kaduna State, Nigeria",
        "boundary": {
            "source": STATE_BOUNDARY_LAYER,
            "field": "statename",
            "name": "Kaduna",
            "reference_type": "GRID3 operational state boundary (released 2020)",
            "legal_boundary_claim": False,
        },
        "settlement_source": {
            "layer": SETTLEMENT_LAYER,
            "version": "GRID3 NGA Settlement Extents v4.1",
            "doi": "10.7916/73v5-mq06",
            "license": "CC BY-SA 4.0",
            "out_crs": "EPSG:4326",
        },
        "measurement": {
            "crs": MEASUREMENT_CRS,
            "source_area_comparison": {
                "valid_comparisons": int(valid_area.sum()),
                "median_absolute_difference_percent": (
                    float(area_difference.median()) if not area_difference.empty else None
                ),
                "p95_absolute_difference_percent": (
                    float(area_difference.quantile(0.95)) if not area_difference.empty else None
                ),
            },
        },
        "quality": {
            "bbox_features_downloaded": len(block_features),
            "intersecting_blocks_before_geometry_repair": intersecting_count,
            "blocks_after_geometry_repair_before_deduplication": repaired_count,
            "unique_blocks_after_repair": len(raw),
            "duplicate_block_ids_removed": duplicate_ids,
            **geometry_qa,
            "null_block_ids": int(raw["block_id"].isna().sum()),
            "null_building_area_percentage": int(raw["building_area_percentage"].isna().sum()),
            "null_mean_height": int(raw["gbuilding_mean_height"].isna().sum()),
            "null_ndvi": int(raw["ndvi_mean"].isna().sum()),
            "null_evi": int(raw["evi_mean"].isna().sum()),
            "excluded_screening_classes": int(excluded.sum()),
            "eligible_blocks": len(eligible),
            "scored_blocks": len(scored),
            "candidate_blocks": len(candidates),
        },
        "screening_thresholds": {
            "built_form_screening_score_q75": built_threshold,
            "ndvi_q25": ndvi_threshold,
            "evi_q25": evi_threshold,
            "rule": "top quartile built-form score AND bottom quartile NDVI AND bottom quartile EVI",
            "built_form_score": "building_area_percentage multiplied by mean building height; screening proxy only",
        },
        "interpretation_limits": [
            "Not a population estimate or household count.",
            "Not a direct measure of public green space, access, quality or ownership.",
            "Building counts are assigned by building centroid to settlement blocks.",
            "Mean building heights summarize Google Open Buildings 2.5D data for 2021–2023.",
            "NDVI and EVI are 2024 cloud-free median Sentinel-2 composites.",
            "Operational boundary is a working reference extent, not a gazetted legal boundary.",
            "Results require sensitivity review, visual inspection and local validation before publication.",
        ],
    }
    (args.out_dir / "qa_summary.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    print(f"\nOutputs written to: {args.out_dir.resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
