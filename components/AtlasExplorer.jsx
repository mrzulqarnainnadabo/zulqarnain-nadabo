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

const VIEWS = [
  { id: 'world', label: 'World', center: [12, 20], zoom: 1.55, earth: 'Earth', note: 'Global view' },
  { id: 'kaduna-south', label: 'Kaduna South', center: [7.43, 10.45], zoom: 10.2, earth: 'Kaduna South, Kaduna, Nigeria', note: 'Phase 1 framework geography · approximate area view' },
  { id: 'kaduna', label: 'Kaduna State', center: [7.43, 10.52], zoom: 7.6, earth: 'Kaduna State, Nigeria', note: 'State-level context' },
  { id: 'nigeria', label: 'Nigeria', center: [8.5, 9.1], zoom: 5.1, earth: 'Nigeria', note: 'National project context' },
  { id: 'africa', label: 'Africa', center: [20, 1], zoom: 2.6, earth: 'Africa', note: 'Continental context' },
];

function getSatelliteDate() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 2);
  return date.toISOString().slice(0, 10);
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

export default function AtlasExplorer() {
  const mapHost = useRef(null);
  const mapRef = useRef(null);
  const modeRef = useRef('road');
  const sceneRef = useRef('map');
  const [activeView, setActiveView] = useState('world');
  const [mapMode, setMapMode] = useState('road');
  const [sceneMode, setSceneMode] = useState('map');
  const [status, setStatus] = useState('Preparing the world map…');
  const [failed, setFailed] = useState(false);
  const [locationMessage, setLocationMessage] = useState('Requesting your location permission…');
  const [satelliteDate] = useState(getSatelliteDate);
  const current = VIEWS.find((view) => view.id === activeView) || VIEWS[0];

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
    const nextMapMode = scene === 'earth' ? 'satellite' : 'road';
    modeRef.current = nextMapMode;
    setMapMode(nextMapMode);
    setSceneMode(scene);
    const map = mapRef.current;
    if (!map) return;
    const applyScene = () => {
      if (scene === 'earth') {
        map.setProjection({ type: 'globe' });
        map.setTerrain({ source: TERRAIN_SOURCE, exaggeration: 1.08 });
        // MapLibre uses the style sky API for globe atmosphere (not Mapbox's setFog API).
        map.setSky({
          'sky-color': '#07111f',
          'horizon-color': '#16334b',
          'atmosphere-blend': 0.92,
        });
        map.easeTo({ center: [12, 20], zoom: 2.25, pitch: 0, bearing: 0, duration: 1100 });
      } else {
        map.setTerrain(null);
        map.setProjection({ type: 'mercator' });
        map.setSky(undefined);
        map.easeTo({ center: current.center, zoom: current.zoom, pitch: 0, bearing: 0, duration: 900 });
      }
      applyMapLayers(map, modeRef.current, scene);
    };
    if (map.isStyleLoaded()) applyScene();
    else map.once('load', applyScene);
  }

  useEffect(() => {
    let disposed = false;
    let map;
    let marker;
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
        attributionControl: false,
        cooperativeGestures: true,
        maxPitch: 65,
        maxZoom: 19,
      });
      mapRef.current = map;
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
      locate.on('geolocate', () => {
        if (!disposed) {
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
          attribution: 'EOxCloudless by EOX IT Services GmbH · modified Copernicus Sentinel data 2016',
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
        });

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
            minzoom: 13,
            layout: { visibility: sceneRef.current === 'earth' ? 'visible' : 'none' },
            paint: {
              'fill-extrusion-color': '#b7c3c3',
              'fill-extrusion-height': ['max', 3, ['to-number', ['coalesce', ['get', 'render_height'], ['get', 'height'], 6]]],
              'fill-extrusion-base': ['max', 0, ['to-number', ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0]]],
              'fill-extrusion-opacity': 0.86,
            },
          }, firstSymbolLayer);
        }

        // Keep labels above imagery and building geometry.
        map.getStyle().layers
          .filter((layer) => layer.type === 'symbol')
          .forEach((layer) => map.moveLayer(layer.id));
        setStatus('World map ready');
        setLocationMessage('Checking whether your browser can share your location…');
        try {
          if (typeof navigator !== 'undefined' && navigator.geolocation) {
            locate.trigger();
          } else {
            setLocationMessage('This browser does not support location sharing. You can still explore the world map.');
          }
        } catch {
          setLocationMessage('Automatic location is unavailable here. Use the map manually or try the location control.');
        }
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
    const zoom = isEarth && view.id === 'kaduna-south' ? 13.1 : view.zoom;
    map.flyTo({ center: view.center, zoom, pitch, bearing: isEarth ? -12 : 0, duration: 1450, essential: false });
    const markerElement = map.getContainer().querySelector('.atlas-map-marker');
    if (markerElement) markerElement.style.display = view.id === 'kaduna-south' ? 'block' : 'none';
  }

  return (
    <section id="living-atlas" className="atlas-section" aria-labelledby="atlas-title">
      <div className="atlas-heading">
        <div>
          <p className="atlas-kicker">A geographic lens · 01</p>
          <h2 id="atlas-title">The <em>Living Atlas.</em></h2>
          <p className="atlas-intro">A global view of place, evidence and the work in progress. Begin anywhere on Earth.</p>
        </div>
        <a className="atlas-earth-link" href={`https://earth.google.com/web/search/${encodeURIComponent(current.earth)}`} target="_blank" rel="noreferrer">
          Explore in Google Earth <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className={`atlas-map-frame atlas-map-frame--${mapMode} atlas-map-frame--${sceneMode}`}>
        <div ref={mapHost} className="atlas-map" role="region" aria-label="Interactive global map with road, satellite and 3D Earth views. Browser location is requested once on entry." />
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
        <div className="atlas-map-caption">
          <span>GLOBAL ATLAS · {sceneMode === 'earth' ? '3D TERRAIN + MAPPED BUILDINGS' : mapMode === 'satellite' ? 'NASA SATELLITE COMPOSITE' : 'OPEN STREET MAP'}</span>
          <span>© OpenStreetMap · OpenFreeMap {mapMode === 'satellite' && sceneMode === 'map' ? '· NASA GIBS' : ''}</span>
        </div>
      </div>

      <div className="atlas-map-footer">
        <div className="atlas-view-switch" role="group" aria-label="Choose geographic view">
          {VIEWS.map((view) => (
            <button key={view.id} type="button" onClick={() => selectView(view)} aria-pressed={activeView === view.id} className={activeView === view.id ? 'is-active' : ''}>
              {view.label}
            </button>
          ))}
        </div>
        <p role="status">{locationMessage}</p>
      </div>
      <p className="atlas-disclosure">
        Location is requested once by your browser and used only to centre this map for your visit. This portfolio does not store your coordinates or send them to its own server; map providers receive tile requests for the area you view. The 2D satellite layer uses a dated NASA daily composite. 3D Earth uses a 2016 Sentinel-2 cloudless mosaic, open elevation data and mapped OpenStreetMap building shapes. Buildings are extruded from mapped footprints, not photogrammetric 3D scans; imagery and building coverage vary by place. These are maps and imagery, not live video.
      </p>
      {sceneMode === 'earth' && mapMode === 'satellite' && (
        <p className="atlas-data-credit">
          Imagery: <a href="https://cloudless.eox.at/" target="_blank" rel="noreferrer">EOxCloudless</a> by EOX IT Services GmbH (contains modified Copernicus Sentinel data 2016) · Terrain: <a href="https://mapterhorn.com/attribution" target="_blank" rel="noreferrer">Mapterhorn</a> · Buildings and map data: © OpenStreetMap contributors
        </p>
      )}
    </section>
  );
}
