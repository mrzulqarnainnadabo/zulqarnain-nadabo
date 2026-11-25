'use client';

import { useEffect, useRef, useState } from 'react';

const MAP_SCRIPT = 'https://unpkg.com/maplibre-gl@5.6.2/dist/maplibre-gl.js';
const MAP_STYLE = 'https://tiles.openfreemap.org/styles/positron';
const NASA_ATTRIBUTION = 'NASA GIBS / NASA Earthdata';
const SATELLITE_LAYER = 'atlas-satellite-layer';
const SATELLITE_SOURCE = 'atlas-satellite-source';
const EOX_LAYER = 'atlas-eox-imagery-layer';
const EOX_SOURCE = 'atlas-eox-imagery-source';
const TERRAIN_SOURCE = 'atlas-terrain-source';
const BUILDINGS_LAYER = 'atlas-osm-3d-buildings';
const SETTLEMENT_SOURCE = 'atlas-grid3-settlement-source';
const SETTLEMENT_FILL_LAYER = 'atlas-grid3-settlement-fill';
const SETTLEMENT_LINE_LAYER = 'atlas-grid3-settlement-line';
const GRID3_QUERY_URL = 'https://services3.arcgis.com/BU6Aadhn6tbBEdyk/arcgis/rest/services/GRID3_NGA_settlement_extents_v4_1/FeatureServer/0/query';

const VIEWS = [
  { id: 'world', label: 'World', center: [12, 20], zoom: 1.55, earth: 'Earth', note: 'Global view' },
  { id: 'kaduna-south', label: 'Kaduna South', center: [7.43, 10.45], zoom: 13.5, earth: 'Kaduna South, Kaduna, Nigeria', note: 'Phase 1 framework geography · approximate area view' },
  { id: 'kaduna', label: 'Kaduna State', center: [7.43, 10.52], zoom: 7.6, earth: 'Kaduna State, Nigeria', note: 'State-level context' },
  { id: 'nigeria', label: 'Nigeria', center: [8.5, 9.1], zoom: 5.1, earth: 'Nigeria', note: 'National project context' },
  { id: 'africa', label: 'Africa', center: [20, 1], zoom: 2.6, earth: 'Africa', note: 'Continental context' },
];

function getSatelliteDate() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 2);
  return date.toISOString().slice(0, 10);
}

async function fetchGrid3SettlementBlocks(bounds, signal) {
  const [[west, south], [east, north]] = bounds.toArray();
  const url = new URL(GRID3_QUERY_URL);
  const params = {
    where: '1=1',
    geometry: [west, south, east, north].join(','),
    geometryType: 'esriGeometryEnvelope',
    inSR: '4326',
    outSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: 'block_id,block_area_sqm,building_count,building_count_density,building_area_percentage,gbuilding_mean_height,ndvi_mean,evi_mean,extent_type,composite_class',
    returnGeometry: 'true',
    resultRecordCount: '1000',
    orderByFields: 'fid ASC',
    f: 'geojson',
  };
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const features = [];
  let truncated = false;
  for (let offset = 0; offset < 4000; offset += 1000) {
    url.searchParams.set('resultOffset', String(offset));
    const response = await fetch(url.toString(), { signal, headers: { Accept: 'application/geo+json, application/json' } });
    if (!response.ok) throw new Error('GRID3 request failed (' + response.status + ').');
    const page = await response.json();
    if (page.error) throw new Error(page.error.message || 'GRID3 returned a query error.');
    const rows = Array.isArray(page.features) ? page.features : [];
    features.push(...rows);
    if (!page.exceededTransferLimit || rows.length === 0) break;
    if (offset === 3000) truncated = true;
  }
  return { type: 'FeatureCollection', features, truncated };
}

function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  return new Promise((resolve, reject) => {
    let script = document.querySelector('script[data-atlas-maplibre]');
    const finish = () => window.maplibregl ? resolve(window.maplibregl) : reject(new Error('MapLibre did not initialise.'));
    const fail = () => reject(new Error('The map library could not be loaded.'));
    if (!document.querySelector('link[data-atlas-maplibre-css]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/maplibre-gl@5.6.2/dist/maplibre-gl.css';
      link.dataset.atlasMaplibreCss = 'true';
      document.head.appendChild(link);
    }
    if (!script) {
      script = document.createElement('script');
      script.src = MAP_SCRIPT;
      script.async = true;
      script.dataset.atlasMaplibre = 'true';
      script.addEventListener('load', finish, { once: true });
      script.addEventListener('error', fail, { once: true });
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', finish, { once: true });
      script.addEventListener('error', fail, { once: true });
      if (window.maplibregl) finish();
    }
  });
}

function getGeographicLens(center, zoom) {
  const [longitude, latitude] = center.toArray();
  const inKaduna = longitude >= 6.5 && longitude <= 8.5 && latitude >= 9.5 && latitude <= 11.8;
  const nearKadunaSouth = Math.abs(longitude - 7.43) <= 0.28 && Math.abs(latitude - 10.45) <= 0.28;
  if (inKaduna && nearKadunaSouth && zoom >= 12) return 'kaduna-south';
  if (inKaduna && zoom >= 6 && zoom < 12) return 'kaduna';
  const inNigeria = longitude >= 2.5 && longitude <= 15 && latitude >= 4 && latitude <= 14;
  if (inNigeria && zoom >= 4.2 && zoom < 6) return 'nigeria';
  const inAfrica = longitude >= -20 && longitude <= 55 && latitude >= -36 && latitude <= 38;
  if (inAfrica && zoom >= 2.1 && zoom < 4.2) return 'africa';
  if (zoom >= 10) return 'local';
  if (zoom >= 4) return 'regional';
  return 'world';
}

export default function AtlasExplorer() {
  const mapHost = useRef(null);
  const mapRef = useRef(null);
  const modeRef = useRef('road');
  const sceneRef = useRef('earth');
  const [activeView, setActiveView] = useState('world');
  const [mapMode, setMapMode] = useState('road');
  const [sceneMode, setSceneMode] = useState('earth');
  const [status, setStatus] = useState('Preparing the world map…');
  const [failed, setFailed] = useState(false);
  const [locationMessage, setLocationMessage] = useState('Location sharing is off. Use the map control only if you want to share your position.');
  const [satelliteDate] = useState(getSatelliteDate);
  const [settlementVisible, setSettlementVisible] = useState(false);
  const [settlementStatus, setSettlementStatus] = useState('Layer off');
  const settlementEnabledRef = useRef(false);
  const settlementAbortRef = useRef(null);
  const settlementBoundsRef = useRef('');
  const current = VIEWS.find((view) => view.id === activeView) || VIEWS[0];

  async function refreshSettlementBlocks(force = false) {
    const map = mapRef.current;
    if (!map || !map.getSource(SETTLEMENT_SOURCE)) return;
    if (map.getZoom() < 13.5) {
      settlementAbortRef.current?.abort();
      settlementBoundsRef.current = '';
      map.getSource(SETTLEMENT_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });
      setSettlementStatus('Zoom in to level 13.5 to inspect individual settlement blocks.');
      return;
    }
    const [[west, south], [east, north]] = map.getBounds().toArray();
    const boundsKey = [west, south, east, north].map(value => value.toFixed(3)).join(',');
    if (!force && boundsKey === settlementBoundsRef.current) return;
    settlementBoundsRef.current = boundsKey;
    settlementAbortRef.current?.abort();
    const controller = new AbortController();
    settlementAbortRef.current = controller;
    setSettlementStatus('Loading GRID3 settlement blocks…');
    map.getSource(SETTLEMENT_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });
    try {
      const collection = await fetchGrid3SettlementBlocks(map.getBounds(), controller.signal);
      if (controller.signal.aborted) return;
      const source = map.getSource(SETTLEMENT_SOURCE);
      if (source) source.setData(collection);
      const count = collection.features.length.toLocaleString();
      setSettlementStatus(count + ' blocks in view' + (collection.truncated ? ' · first 4,000 shown' : ''));
    } catch (error) {
      if (error?.name !== 'AbortError') { settlementBoundsRef.current = ''; setSettlementStatus('GRID3 data could not be loaded. The base map remains available.'); }
    }
  }

  function toggleSettlementBlocks() {
    const next = !settlementEnabledRef.current;
    settlementEnabledRef.current = next;
    setSettlementVisible(next);
    const map = mapRef.current;
    if (!next) {
      settlementAbortRef.current?.abort();
      settlementBoundsRef.current = '';
      const source = map?.getSource(SETTLEMENT_SOURCE);
      if (source) source.setData({ type: 'FeatureCollection', features: [] });
      if (map?.getLayer(SETTLEMENT_FILL_LAYER)) map.setLayoutProperty(SETTLEMENT_FILL_LAYER, 'visibility', 'none');
      if (map?.getLayer(SETTLEMENT_LINE_LAYER)) map.setLayoutProperty(SETTLEMENT_LINE_LAYER, 'visibility', 'none');
      setSettlementStatus('Layer off');
      return;
    }
    if (map?.getLayer(SETTLEMENT_FILL_LAYER)) map.setLayoutProperty(SETTLEMENT_FILL_LAYER, 'visibility', 'visible');
    if (map?.getLayer(SETTLEMENT_LINE_LAYER)) map.setLayoutProperty(SETTLEMENT_LINE_LAYER, 'visibility', 'visible');
    refreshSettlementBlocks(true);
    setSettlementStatus(map ? 'Preparing GRID3 data…' : 'Waiting for the map to load…');
  }

  function applyMapLayers(map, mode, scene) {
    if (map.getLayer(SATELLITE_LAYER)) {
      map.setLayoutProperty(SATELLITE_LAYER, 'visibility', mode === 'satellite' && scene === 'map' ? 'visible' : 'none');
    }
    if (map.getLayer(EOX_LAYER)) {
      map.setLayoutProperty(EOX_LAYER, 'visibility', mode === 'satellite' && scene === 'earth' ? 'visible' : 'none');
    }
    if (map.getLayer(BUILDINGS_LAYER)) {
      map.setLayoutProperty(BUILDINGS_LAYER, 'visibility', scene === 'earth' ? 'visible' : 'none');
    }
  }

  function changeMapMode(mode) {
    modeRef.current = mode;
    setMapMode(mode);
    const map = mapRef.current;
    if (map) applyMapLayers(map, mode, sceneRef.current);
  }

  function changeSceneMode(scene) {
    sceneRef.current = scene;
    const nextMapMode = modeRef.current;
    modeRef.current = nextMapMode;
    setMapMode(nextMapMode);
    setSceneMode(scene);
    const map = mapRef.current;
    if (!map) return;
    const applyScene = () => {
      if (sceneRef.current !== scene) return;
      // Changing projection should not change the place or scale the user is examining.
      if (scene === 'earth') {
        map.setProjection({ type: 'globe' });
        map.setTerrain({ source: TERRAIN_SOURCE, exaggeration: 1.08 });
        // MapLibre uses the style sky API for globe atmosphere (not Mapbox's setFog API).
        map.setSky({
          'sky-color': '#07111f',
          'horizon-color': '#16334b',
          'atmosphere-blend': 0.92,
        });
      } else {
        map.setTerrain(null);
        map.setProjection({ type: 'mercator' });
        map.setSky(undefined);
      }
      applyMapLayers(map, modeRef.current, scene);
    };
    const applyWhenReady = () => {
      if (sceneRef.current !== scene) {
        map.off('styledata', applyWhenReady);
        map.off('idle', applyWhenReady);
        return;
      }
      if (!map.isStyleLoaded() || !map.getSource(TERRAIN_SOURCE) || !map.getLayer(EOX_LAYER)) return;
      map.off('styledata', applyWhenReady);
      map.off('idle', applyWhenReady);
      applyScene();
    };
    if (map.isStyleLoaded() && map.getSource(TERRAIN_SOURCE) && map.getLayer(EOX_LAYER)) {
      applyScene();
    } else {
      // The map's one-time load event may already have fired while tile/style
      // work is still in progress. Listen for readiness instead of missing it.
      map.on('styledata', applyWhenReady);
      map.on('idle', applyWhenReady);
      applyWhenReady();
    }
  }

  useEffect(() => {
    let disposed = false;
    let map;
    let marker;
    let refreshOnMove;
    let syncLensOnMove;
    const host = mapHost.current;
    if (!host) return undefined;

    loadMapLibre().then((maplibregl) => {
      if (disposed) return;
      map = new maplibregl.Map({
        container: host,
        style: MAP_STYLE,
        center: VIEWS[0].center,
        zoom: VIEWS[0].zoom,
        pitch: 0,
        attributionControl: { compact: true },
        cooperativeGestures: true,
        maxPitch: 65,
        maxZoom: 19,
      });
      mapRef.current = map;
      syncLensOnMove = () => setActiveView(getGeographicLens(map.getCenter(), map.getZoom()));
      map.on('moveend', syncLensOnMove);
      map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'bottom-right');
      map.addControl(new maplibregl.ScaleControl({ maxWidth: 110, unit: 'metric' }), 'bottom-left');

      const locate = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
        trackUserLocation: false,
        showUserLocation: true,
        showAccuracyCircle: true,
        fitBoundsOptions: { maxZoom: 13 },
      });
      map.addControl(locate, 'top-right');
      const labelLocationMarkers = () => {
        const dot = map.getContainer().querySelector('.maplibregl-user-location-dot');
        const accuracy = map.getContainer().querySelector('.maplibregl-user-location-accuracy-circle');
        if (dot) {
          dot.setAttribute('role', 'img');
          dot.setAttribute('aria-label', 'Your approximate location');
        }
        if (accuracy) {
          accuracy.setAttribute('role', 'img');
          accuracy.setAttribute('aria-label', 'Location accuracy area');
        }
      };
      locate.on('geolocate', () => {
        if (!disposed) {
          labelLocationMarkers();
          window.requestAnimationFrame(labelLocationMarkers);
          setLocationMessage('Your position is shown for this visit only. It is not saved by this portfolio.');
          setActiveView('world');
        }
      });
      locate.on('error', (event) => {
        if (!disposed) {
          const message = event?.message || '';
          setLocationMessage(message.toLowerCase().includes('denied')
            ? 'Location permission was declined. The global map remains available; you can enable permission in your browser settings.'
            : 'Your location could not be determined. Check device location settings or use the map manually.');
        }
      });

      const markerNode = document.createElement('div');
      markerNode.className = 'atlas-map-marker';
      markerNode.setAttribute('role', 'img');
      markerNode.setAttribute('aria-label', 'Approximate Kaduna South area focus');
      markerNode.style.display = 'none';
      marker = new maplibregl.Marker({ element: markerNode, anchor: 'center' })
        .setLngLat([7.43, 10.45])
        .addTo(map);

      map.once('load', () => {
        if (disposed) return;
        const firstSymbolLayer = map.getStyle().layers.find((layer) => layer.type === 'symbol')?.id;
        map.addSource(SATELLITE_SOURCE, {
          type: 'raster',
          tiles: [`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${satelliteDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`],
          tileSize: 256,
          maxzoom: 9,
          attribution: NASA_ATTRIBUTION,
        });
        map.addLayer({
          id: SATELLITE_LAYER,
          type: 'raster',
          source: SATELLITE_SOURCE,
          layout: { visibility: modeRef.current === 'satellite' && sceneRef.current === 'map' ? 'visible' : 'none' },
          paint: { 'raster-opacity': 1, 'raster-fade-duration': 250 },
        }, firstSymbolLayer);

        // Higher-detail, globally available Sentinel-2 mosaic (2016 vintage, CC BY 4.0).
        map.addSource(EOX_SOURCE, {
          type: 'raster',
          tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'],
          tileSize: 256,
          maxzoom: 14,
          attribution: '<a href="https://cloudless.eox.at" target="_blank" rel="noopener noreferrer">EOxCloudless</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 &amp; 2017)',
        });
        map.addLayer({
          id: EOX_LAYER,
          type: 'raster',
          source: EOX_SOURCE,
          layout: { visibility: modeRef.current === 'satellite' && sceneRef.current === 'earth' ? 'visible' : 'none' },
          paint: { 'raster-opacity': 1, 'raster-fade-duration': 300 },
        }, firstSymbolLayer);

        // Open global DEM tiles: 30 m worldwide, with higher-resolution open
        // national data in some regions. No Cesium ion or Google credentials.
        map.addSource(TERRAIN_SOURCE, {
          type: 'raster-dem',
          url: 'https://tiles.mapterhorn.com/tilejson.json',
          tileSize: 512,
          encoding: 'terrarium',
          attribution: '<a href="https://mapterhorn.com/attribution/" target="_blank" rel="noopener noreferrer">Terrain © Mapterhorn · regional source catalogue</a>',
        });
        // The atlas opens as a 3D geographic workspace. The road/vector layer
        // remains the default so the first view does not imply current imagery.
        if (sceneRef.current === 'earth') {
          map.setProjection({ type: 'globe' });
          map.setTerrain({ source: TERRAIN_SOURCE, exaggeration: 1.08 });
          map.setSky({
            'sky-color': '#07111f',
            'horizon-color': '#16334b',
            'atmosphere-blend': 0.92,
          });
        }

        // Extrude mapped OSM building footprints where the vector source has
        // height attributes. This is mapped geometry, not photogrammetry.
        const vectorSourceId = Object.entries(map.getStyle().sources)
          .find(([, source]) => source.type === 'vector')?.[0];
        if (vectorSourceId) {
          map.addLayer({
            id: BUILDINGS_LAYER,
            type: 'fill-extrusion',
            source: vectorSourceId,
            'source-layer': 'building',
            filter: ['any', ['has', 'render_height'], ['has', 'height']],
            minzoom: 13,
            layout: { visibility: sceneRef.current === 'earth' ? 'visible' : 'none' },
            paint: {
              'fill-extrusion-color': '#b7c3c3',
              'fill-extrusion-height': ['to-number', ['coalesce', ['get', 'render_height'], ['get', 'height'], 0]],
              'fill-extrusion-base': ['to-number', ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0]],
              'fill-extrusion-opacity': 0.9,
            },
          }, firstSymbolLayer);
        }

        map.addSource(SETTLEMENT_SOURCE, {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
          promoteId: 'block_id',
          attribution: '<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">GRID3 / CIESIN settlement blocks · CC BY-SA 4.0</a>',
        });
        map.addLayer({
          id: SETTLEMENT_FILL_LAYER,
          type: 'fill',
          source: SETTLEMENT_SOURCE,
          minzoom: 13.5,
          layout: { visibility: settlementEnabledRef.current ? 'visible' : 'none' },
          paint: { 'fill-color': '#d5ad72', 'fill-opacity': 0.2 },
        });
        map.addLayer({
          id: SETTLEMENT_LINE_LAYER,
          type: 'line',
          source: SETTLEMENT_SOURCE,
          minzoom: 13.5,
          layout: { visibility: settlementEnabledRef.current ? 'visible' : 'none' },
          paint: { 'line-color': '#9a7547', 'line-width': ['interpolate', ['linear'], ['zoom'], 13.5, 0.45, 16, 1.25], 'line-opacity': 0.78 },
        });
        map.on('click', SETTLEMENT_FILL_LAYER, (event) => {
          const feature = event.features?.[0];
          if (!feature) return;
          const properties = feature.properties || {};
          const popup = document.createElement('div');
          popup.className = 'atlas-settlement-popup';
          const heading = document.createElement('strong');
          heading.textContent = properties.block_id || 'GRID3 settlement block';
          popup.appendChild(heading);
          const fields = [
            ['Buildings (centroid in block)', properties.building_count],
            ['Block area', properties.block_area_sqm == null ? null : Number(properties.block_area_sqm).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' m²'],
            ['Building-count density', properties.building_count_density == null ? null : Number(properties.building_count_density).toFixed(1) + ' per hectare'],
            ['Building area share', properties.building_area_percentage == null ? null : Number(properties.building_area_percentage).toFixed(1) + '%'],
            ['Mean building height', properties.gbuilding_mean_height == null ? null : Number(properties.gbuilding_mean_height).toFixed(1) + ' m · 2021–23 source'],
            ['Mean NDVI', properties.ndvi_mean == null ? null : Number(properties.ndvi_mean).toFixed(3) + ' · 2024 composite'],
            ['Mean EVI', properties.evi_mean == null ? null : Number(properties.evi_mean).toFixed(3) + ' · 2024 composite'],
            ['Extent type', properties.extent_type],
            ['Composite class', properties.composite_class],
          ];
          fields.forEach(([label, value]) => {
            if (value == null || value === '') return;
            const line = document.createElement('p');
            const name = document.createElement('span');
            name.textContent = label + ': ';
            const data = document.createElement('b');
            data.textContent = String(value);
            line.append(name, data);
            popup.appendChild(line);
          });
          new maplibregl.Popup({ closeButton: true, maxWidth: '260px' }).setLngLat(event.lngLat).setDOMContent(popup).addTo(map);
        });
        map.on('mouseenter', SETTLEMENT_FILL_LAYER, () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', SETTLEMENT_FILL_LAYER, () => { map.getCanvas().style.cursor = ''; });
        refreshOnMove = () => {
          if (settlementEnabledRef.current) refreshSettlementBlocks();
        };
        map.on('moveend', refreshOnMove);
        if (settlementEnabledRef.current) refreshSettlementBlocks(true);
        setStatus('World map ready');
        setLocationMessage('Location sharing is off. Use the location control only if you want to centre the map on yourself.');
      });
      map.on('error', (event) => {
        if (!disposed && !map.isStyleLoaded() && event?.error) {
          setFailed(true);
          setStatus('Map tiles are temporarily unavailable.');
        }
      });
    }).catch((error) => {
      if (!disposed) {
        setFailed(true);
        setStatus(error.message || 'The geographic view could not be loaded.');
      }
    });

    return () => {
      disposed = true;
      marker?.remove();
      settlementAbortRef.current?.abort();
      if (map && refreshOnMove) map.off('moveend', refreshOnMove);
      if (map && syncLensOnMove) map.off('moveend', syncLensOnMove);
      map?.remove();
      mapRef.current = null;
    };
  }, [satelliteDate]);

  function selectView(view) {
    setActiveView(view.id);
    const map = mapRef.current;
    if (!map) return;
    const isEarth = sceneRef.current === 'earth';
    const pitch = isEarth && view.id === 'kaduna-south' ? 55 : 0;
    const zoom = isEarth && view.id === 'kaduna-south' ? 14.0 : view.zoom;
    map.flyTo({ center: view.center, zoom, pitch, bearing: isEarth ? -12 : 0, duration: 1450, essential: false });
    const markerElement = map.getContainer().querySelector('.atlas-map-marker');
    if (markerElement) markerElement.style.display = view.id === 'kaduna-south' ? 'block' : 'none';
  }

  return (
    <section id="living-atlas" className="atlas-section" aria-labelledby="atlas-title">
      <div className="atlas-heading">
        <div>
          <p className="atlas-kicker">SPATIAL INTELLIGENCE / 01</p>
          <h2 id="atlas-title">Geography is how I <em>read the world.</em></h2>
          <p className="atlas-intro">Move from global context to local evidence. Explore the world, then examine the places where geography helps explain real problems.</p>
        </div>
        <a className="atlas-earth-link" href={`https://earth.google.com/web/search/${encodeURIComponent(current.earth)}`} target="_blank" rel="noreferrer">
          Explore in Google Earth <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className={`atlas-map-frame atlas-map-frame--${mapMode} atlas-map-frame--${sceneMode}`}>
        <div ref={mapHost} className="atlas-map" role="region" aria-label="Interactive global map with road, satellite and 3D Earth views. Location sharing is optional and starts only when you choose the location control." />
        <div className="atlas-scene-switch" role="group" aria-label="Choose map dimension">
          <button type="button" onClick={() => changeSceneMode('map')} aria-pressed={sceneMode === 'map'}>2D Map</button>
          <button type="button" onClick={() => changeSceneMode('earth')} aria-pressed={sceneMode === 'earth'}>3D Earth</button>
        </div>
        <div className="atlas-map-style-switch" role="group" aria-label="Map presentation">
          <button type="button" onClick={() => changeMapMode('road')} aria-pressed={mapMode === 'road'}>Road</button>
          <button type="button" onClick={() => changeMapMode('satellite')} aria-pressed={mapMode === 'satellite'}>Satellite</button>
        </div>
        {mapMode === 'satellite' && (
          <div className="atlas-imagery-stamp">
            {sceneMode === 'earth' ? 'SENTINEL-2 · 2016 MOSAIC · 10 M' : `NASA MODIS · ${satelliteDate} · 250 M`}
          </div>
        )}
        {failed && (
          <div className="atlas-map-fallback" role="status">
            <span>Geographic view unavailable</span>
            <p>{status} The Earth experience above remains available.</p>
            <a href={`https://earth.google.com/web/search/${encodeURIComponent(current.earth)}`} target="_blank" rel="noreferrer">Continue in Google Earth ↗</a>
          </div>
        )}
        {!failed && status !== 'World map ready' && <div className="atlas-map-loading" role="status">{status}</div>}
        <div className="atlas-map-purpose" aria-live="polite">
          <span>GEOGRAPHIC LENS / {activeView.toUpperCase().replace('-', ' ')}</span>
          <strong>{activeView==='world'?'Scale changes what a map can explain.':activeView==='africa'?'Regional patterns need local context.':activeView==='nigeria'?'National evidence can hide state-level differences.':activeView==='kaduna'?'How do settlement form and vegetation vary across Kaduna?':activeView==='kaduna-south'?'What can a street-to-ward view reveal—and what evidence is still missing?':activeView==='local'?'What is happening at this place—and what local evidence can support it?':activeView==='regional'?'Which patterns hold across this region, and where do they break?':'What can a street-to-ward view reveal—and what evidence is still missing?'}</strong>
          <small>{activeView==='kaduna'?'GRID3 settlement layer available · analysis and validation pending':activeView==='kaduna-south'?'Phase 1 framework geography · service-access evidence not yet verified':activeView==='local'?'Local scale · check source coverage, date and spatial fit before drawing conclusions.':activeView==='regional'?'Regional scale · compare places without assuming the same conditions everywhere.':'Explore the relationship between place, scale and the evidence available.'}</small>
        </div>
        <div className="atlas-map-caption">
          <span>GLOBAL ATLAS · {sceneMode === 'earth' ? '3D TERRAIN + MAPPED BUILDINGS' : mapMode === 'satellite' ? 'NASA SATELLITE COMPOSITE' : 'OPEN STREET MAP'}</span>
          <span>© OpenStreetMap · OpenFreeMap {mapMode === 'satellite' && sceneMode === 'map' ? '· NASA GIBS' : ''} {settlementVisible ? '· GRID3 / CIESIN' : ''}</span>
          {sceneMode === 'earth' && <span><a href="https://mapterhorn.com/attribution/" target="_blank" rel="noreferrer">Terrain © Mapterhorn · regional sources ↗</a></span>}
          {sceneMode === 'earth' && mapMode === 'satellite' && <span><a href="https://cloudless.eox.at" target="_blank" rel="noreferrer">EOxCloudless by EOX IT Services GmbH · Contains modified Copernicus Sentinel data 2016 &amp; 2017 ↗</a></span>}
          {settlementVisible && <span><a href="https://doi.org/10.7916/73v5-mq06" target="_blank" rel="noreferrer">GRID3 NGA Settlement Extents v4.1 · CIESIN / GRID3 · CC BY-SA 4.0 ↗</a></span>}
        </div>
      </div>

      <div className="atlas-map-footer">
        <div className="atlas-view-switch" role="group" aria-label="Choose geographic view">
          {VIEWS.map((view) => (
            <button key={view.id} type="button" onClick={() => selectView(view)} aria-pressed={activeView === view.id} className={activeView === view.id ? 'is-active' : ''}>
              {view.label}
            </button>
          ))}
          <button type="button" className="atlas-settlement-toggle" onClick={toggleSettlementBlocks} aria-pressed={settlementVisible}>GRID3 v4.1 blocks</button>
        </div>
        <p role="status">{locationMessage}<span className="atlas-settlement-status">{settlementStatus}</span></p>
        {settlementVisible && <div className="atlas-active-study"><span>ACTIVE SPATIAL LENS</span><strong>Kaduna · Settlement form & vegetation</strong><small>GRID3 v4.1 source layer · research QA pending</small><a href="https://guides.ciesin.columbia.edu/pages/analysis/Nigeria_Settlement_Block_GreenSpace_Analysis" target="_blank" rel="noreferrer">Method reference ↗</a></div>}
      </div>
      <p className="atlas-disclosure">
        Location sharing is optional and begins only when you choose the map location control. Your position is used to centre the map for this visit; this portfolio does not store your coordinates or send them to its own server. Map providers receive tile requests for the areas you view. The 2D satellite layer uses a dated NASA daily composite. 3D Earth uses a 2016 EOxCloudless Sentinel-2 mosaic, Mapterhorn terrain tiles with region-dependent source data, and mapped OpenStreetMap building shapes. The optional GRID3 NGA Settlement Extents v4.1 layer loads only when selected, at its published local display scale, and only for the visible map extent; settlement blocks are not official administrative boundaries or population counts. Buildings are extruded only where OpenStreetMap height attributes exist; other footprints remain flat. This is not photogrammetric 3D scanning, and coverage varies by place. These are maps and imagery, not live video.
      </p>
      {settlementVisible && (
        <p className="atlas-data-credit atlas-grid3-credit">
          Settlement blocks: <a href="https://guides.ciesin.columbia.edu/pages/analysis/Nigeria_Settlement_Block_GreenSpace_Analysis" target="_blank" rel="noreferrer">GRID3 / CIESIN Settlement Extents v4.1</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>. Building counts, density and area are source-derived indicators, not population or occupancy. NDVI/EVI are 2024 composites; building-height summaries cover 2021–2023. Not an official administrative boundary.
        </p>
      )}
      {sceneMode === 'earth' && (
        <p className="atlas-data-credit">
          Terrain: <a href="https://mapterhorn.com/attribution" target="_blank" rel="noreferrer">Mapterhorn source attribution</a> · Buildings and map data: © OpenStreetMap contributors {mapMode === 'satellite' ? <> · Imagery: <a href="https://cloudless.eox.at/" target="_blank" rel="noreferrer">EOxCloudless</a> (Contains modified Copernicus Sentinel data 2016 &amp; 2017)</> : null}
        </p>
      )}
    </section>
  );
}
