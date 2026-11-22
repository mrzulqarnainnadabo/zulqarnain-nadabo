'use client';

import { useEffect, useRef, useState } from 'react';

const MAP_SCRIPT = 'https://unpkg.com/maplibre-gl@5.6.2/dist/maplibre-gl.js';
const MAP_STYLE = 'https://tiles.openfreemap.org/styles/positron';

const VIEWS = [
  { id: 'world', label: 'World', center: [12, 20], zoom: 1.55, earth: 'Earth', note: 'Global view' },
  { id: 'kaduna-south', label: 'Kaduna South', center: [7.43, 10.45], zoom: 10.2, earth: 'Kaduna South, Kaduna, Nigeria', note: 'Phase 1 framework geography · approximate area view' },
  { id: 'kaduna', label: 'Kaduna State', center: [7.43, 10.52], zoom: 7.6, earth: 'Kaduna State, Nigeria', note: 'State-level context' },
  { id: 'nigeria', label: 'Nigeria', center: [8.5, 9.1], zoom: 5.1, earth: 'Nigeria', note: 'National project context' },
  { id: 'africa', label: 'Africa', center: [20, 1], zoom: 2.6, earth: 'Africa', note: 'Continental context' },
];

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
  const [activeView, setActiveView] = useState('world');
  const [status, setStatus] = useState('Preparing the world map…');
  const [failed, setFailed] = useState(false);
  const [locationMessage, setLocationMessage] = useState('Select the location control on the map to find your position.');
  const current = VIEWS.find((view) => view.id === activeView) || VIEWS[0];

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
        maxPitch: 55,
        maxZoom: 19,
      });
      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'bottom-right');
      map.addControl(new maplibregl.ScaleControl({ maxWidth: 110, unit: 'metric' }), 'bottom-left');
      const locate = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
        trackUserLocation: false,
        showUserLocation: true,
        showAccuracyCircle: true,
        fitBoundsOptions: { maxZoom: 14 },
      });
      map.addControl(locate, 'top-right');
      locate.on('geolocate', () => {
        if (!disposed) {
          setLocationMessage('Your location is shown on this map only. It is not published or saved by this portfolio.');
          setActiveView('world');
        }
      });
      locate.on('error', (event) => {
        if (!disposed) {
          const message = event?.message || 'Location could not be determined.';
          setLocationMessage(message.includes('denied') ? 'Location permission was declined. You can enable it in your browser settings and try again.' : 'Could not find your location. Check your device location settings and try again.');
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
        if (!disposed) setStatus('World map ready');
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
  }, []);

  function selectView(view) {
    setActiveView(view.id);
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: view.center, zoom: view.zoom, pitch: 0, bearing: 0, duration: 1450, essential: false });
    const markerElement = map.getContainer().querySelector('.atlas-map-marker');
    if (markerElement) markerElement.style.display = view.id === 'kaduna-south' ? 'block' : 'none';
  }

  return (
    <section id="living-atlas" className="atlas-section" aria-labelledby="atlas-title">
      <div className="atlas-heading">
        <div>
          <p className="atlas-kicker">A geographic lens · 01</p>
          <h2 id="atlas-title">The <em>Living Atlas.</em></h2>
          <p className="atlas-intro">Start anywhere on Earth. Explore the places behind the work, or find your own position on the map.</p>
        </div>
        <a className="atlas-earth-link" href={`https://earth.google.com/web/search/${encodeURIComponent(current.earth)}`} target="_blank" rel="noreferrer">
          Explore in Google Earth <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="atlas-map-frame">
        <div ref={mapHost} className="atlas-map" role="region" aria-label="Interactive world map with optional visitor geolocation. Use the location control to find your position, or choose a region below." />
        {failed && (
          <div className="atlas-map-fallback" role="status">
            <span>Geographic view unavailable</span>
            <p>{status} The Earth experience above remains available.</p>
            <a href={`https://earth.google.com/web/search/${encodeURIComponent(current.earth)}`} target="_blank" rel="noreferrer">Continue in Google Earth ↗</a>
          </div>
        )}
        {!failed && status !== 'World map ready' && <div className="atlas-map-loading" role="status">{status}</div>}
        <div className="atlas-map-caption">
          <span>GLOBAL MAP · LOCATION BY PERMISSION</span>
          <span>© OpenStreetMap contributors · OpenFreeMap</span>
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
        <p>{locationMessage}</p>
      </div>
      <p className="atlas-disclosure">This is an interactive global street and place map. Your browser asks before sharing your location; your coordinates are not published or saved by this portfolio. Map data © OpenStreetMap contributors, rendered by OpenFreeMap.</p>
    </section>
  );
}
