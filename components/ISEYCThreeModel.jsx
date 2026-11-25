'use client';

import { useEffect, useRef, useState } from 'react';

const THREE_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';

function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  return new Promise((resolve, reject) => {
    let script = document.querySelector('script[data-iseyc-three]');
    const loaded = () => window.THREE ? resolve(window.THREE) : reject(new Error('3D engine unavailable'));
    if (!script) {
      script = document.createElement('script');
      script.src = THREE_SCRIPT;
      script.async = true;
      script.dataset.iseycThree = 'true';
      script.addEventListener('load', () => { script.dataset.loaded = 'true'; loaded(); }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    } else if (script.dataset.loaded === 'true') loaded();
    else {
      script.addEventListener('load', loaded, { once: true });
      script.addEventListener('error', reject, { once: true });
    }
  });
}

function makeLabel(THREE, text, accent) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(20,42,30,.94)';
  ctx.fillRect(4, 8, 504, 112);
  ctx.fillStyle = accent || '#b9964d';
  ctx.fillRect(4, 8, 9, 112);
  ctx.fillStyle = '#f1eee5';
  ctx.font = '600 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.length > 24 ? text.slice(0, 22) + '…' : text, 260, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  return { texture, material };
}

export default function ISEYCThreeModel({ modules, selectedId, onSelect, onReady, onError }) {
  const host = useRef(null);
  const onSelectRef = useRef(onSelect);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const materialMap = useRef(new Map());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  onSelectRef.current = onSelect;
  onReadyRef.current = onReady;
  onErrorRef.current = onError;

  useEffect(() => {
    let disposed = false;
    let renderer;
    let scene;
    let camera;
    let root;
    let raf = 0;
    let observer;
    let raycaster;
    let pointer;
    let canvas;
    let drag = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let targetY = 0.3;
    let targetX = -0.05;
    const pickables = [];
    const textures = [];
    const materials = new Map();

    const start = (THREE) => {
      if (disposed || !host.current) return;
      const width = Math.max(320, host.current.clientWidth || 760);
      const height = Math.max(360, host.current.clientHeight || 560);
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#e8eee5');
      scene.fog = new THREE.Fog('#e8eee5', 28, 70);
      camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 120);
      camera.position.set(22, 18, 24);
      camera.lookAt(0, 1, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.className = 'ise-three-canvas';
      renderer.domElement.style.touchAction = 'none';
      renderer.domElement.setAttribute('aria-label', 'Interactive 3D ISEYC institutional model');
      host.current.appendChild(renderer.domElement);
      canvas = renderer.domElement;

      scene.add(new THREE.HemisphereLight('#fff8e8', '#647968', 2));
      const key = new THREE.DirectionalLight('#fff0d3', 2.2);
      key.position.set(-12, 22, 15);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      scene.add(key);
      const fill = new THREE.DirectionalLight('#d4e1d7', 0.8);
      fill.position.set(14, 9, -12);
      scene.add(fill);

      root = new THREE.Group();
      scene.add(root);
      materialMap.current = materials;

      const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: '#dce5d9', roughness: 1 }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.9;
      root.add(ground);

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(23.5, 0.55, 17.5), new THREE.MeshStandardMaterial({ color: '#415b49', roughness: 0.9 }));
      plinth.position.y = -0.36;
      plinth.castShadow = true;
      plinth.receiveShadow = true;
      root.add(plinth);
      const top = new THREE.Mesh(new THREE.BoxGeometry(23.1, 0.16, 17.1), new THREE.MeshStandardMaterial({ color: '#d7dfd3', roughness: 0.9 }));
      top.position.y = 0;
      top.receiveShadow = true;
      root.add(top);

      const pathMat = new THREE.MeshStandardMaterial({ color: '#b8c3b5', roughness: 1 });
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.035, 14.2), pathMat);
      spine.position.set(0, 0.1, 0);
      root.add(spine);
      const cross = new THREE.Mesh(new THREE.BoxGeometry(19, 0.035, 0.35), pathMat);
      cross.position.set(0, 0.1, 0);
      root.add(cross);

      const addSprite = (text, x, z, scale) => {
        const label = makeLabel(THREE, text, '#b9964d');
        textures.push(label.texture);
        const sprite = new THREE.Sprite(label.material);
        sprite.position.set(x, 0.55, z);
        sprite.scale.set(scale, 0.65, 1);
        root.add(sprite);
      };
      addSprite('GOVERNANCE', 0, -7.4, 3.3);
      addSprite('FOUR DEPARTMENTS', 0, -1.9, 4.0);
      addSprite('SHARED SYSTEMS', 0, 4.3, 3.4);

      const windowMat = new THREE.MeshStandardMaterial({ color: '#e9d9b6', emissive: '#8d744d', emissiveIntensity: 0.12 });
      const glassMat = new THREE.MeshStandardMaterial({ color: '#829b91', roughness: 0.35 });
      for (const item of modules) {
        const group = new THREE.Group();
        group.position.set(item.x, 0.08, item.z);
        root.add(group);

        const bodyMat = new THREE.MeshStandardMaterial({
          color: item.kind === 'office' ? '#d8c7a6' : item.kind === 'shared' ? '#849b8c' : '#a8b8a7',
          roughness: 0.88,
          emissive: '#000000',
          emissiveIntensity: 0
        });
        materials.set(item.id, bodyMat);
        const body = new THREE.Mesh(new THREE.BoxGeometry(item.w, item.h, item.d), bodyMat);
        body.position.y = item.h / 2 + 0.22;
        body.castShadow = true;
        body.receiveShadow = true;
        body.userData.moduleId = item.id;
        group.add(body);
        pickables.push(body);

        const baseMat = new THREE.MeshStandardMaterial({ color: item.kind === 'office' ? '#927b58' : item.kind === 'shared' ? '#536d5b' : '#718a75', roughness: 0.9 });
        const base = new THREE.Mesh(new THREE.BoxGeometry(item.w + 0.28, 0.22, item.d + 0.28), baseMat);
        base.position.y = 0.11;
        group.add(base);

        const roof = new THREE.Mesh(new THREE.BoxGeometry(item.w + 0.22, 0.18, item.d + 0.22), new THREE.MeshStandardMaterial({ color: '#eee9dc', roughness: 0.75 }));
        roof.position.y = item.h + 0.42;
        roof.userData.moduleId = item.id;
        roof.castShadow = true;
        group.add(roof);
        pickables.push(roof);

        const windows = Math.max(2, Math.floor(item.w / 0.8));
        const floors = item.kind === 'department' ? 3 : 2;
        for (let floor = 0; floor < floors; floor += 1) {
          for (let i = 0; i < windows; i += 1) {
            const wx = -item.w / 2 + 0.4 + i * ((item.w - 0.8) / Math.max(1, windows - 1));
            const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.04), windowMat);
            windowMesh.position.set(wx, 0.42 + floor * (item.h / floors), item.d / 2 + 0.025);
            group.add(windowMesh);
          }
        }
        const entrance = new THREE.Mesh(new THREE.BoxGeometry(0.48, Math.min(0.9, item.h * 0.55), 0.06), glassMat);
        entrance.position.set(0, 0.25 + Math.min(0.9, item.h * 0.55) / 2, item.d / 2 + 0.05);
        group.add(entrance);

        const label = makeLabel(THREE, item.short || item.label, item.accent);
        textures.push(label.texture);
        const sprite = new THREE.Sprite(label.material);
        sprite.position.set(0, item.h + 1.05, 0);
        sprite.scale.set(Math.max(2.4, item.w * 1.25), 0.58, 1);
        group.add(sprite);
      }

      const planterMat = new THREE.MeshStandardMaterial({ color: '#9aaa91' });
      const trunkMat = new THREE.MeshStandardMaterial({ color: '#8b785a' });
      const canopyMat = new THREE.MeshStandardMaterial({ color: '#718c72' });
      for (const pos of [[-10,-5],[-10,4],[10,-5],[10,4],[-8,7],[8,7]]) {
        const planter = new THREE.Mesh(new THREE.BoxGeometry(1.25,0.16,1.25),planterMat);
        planter.position.set(pos[0],0.11,pos[1]);
        root.add(planter);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.12,0.8,6),trunkMat);
        trunk.position.set(pos[0],0.6,pos[1]);
        root.add(trunk);
        const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.45,8,6),canopyMat);
        canopy.position.set(pos[0],1.1,pos[1]);
        root.add(canopy);
      }

      const gateMat = new THREE.MeshStandardMaterial({ color: '#b9964d', roughness: 0.7 });
      const gateA = new THREE.Mesh(new THREE.BoxGeometry(0.24,1.8,0.24),gateMat);
      gateA.position.set(-1.3,0.9,8.1);
      const gateB = gateA.clone();
      gateB.position.x = 1.3;
      const gateTop = new THREE.Mesh(new THREE.BoxGeometry(2.9,0.2,0.24),gateMat);
      gateTop.position.set(0,1.8,8.1);
      root.add(gateA,gateB,gateTop);

      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();

      const resize = () => {
        if (!host.current || !renderer) return;
        const w = Math.max(320, host.current.clientWidth);
        const h = Math.max(360, host.current.clientHeight);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w,h);
      };
      observer = new ResizeObserver(resize);
      observer.observe(host.current);

      const down = (event) => {
        drag = true;
        moved = false;
        startX = lastX = event.clientX;
        startY = lastY = event.clientY;
        canvas.setPointerCapture?.(event.pointerId);
      };
      const move = (event) => {
        if (!drag) return;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        if (Math.abs(event.clientX-startX)+Math.abs(event.clientY-startY)>5) moved = true;
        if (moved) {
          targetY += dx * 0.006;
          targetX = Math.max(-0.2,Math.min(0.2,targetX+dy*0.002));
        }
        lastX = event.clientX;
        lastY = event.clientY;
      };
      const up = (event) => {
        if (!drag) return;
        drag = false;
        if (!moved) {
          const rect = canvas.getBoundingClientRect();
          pointer.x = ((event.clientX-rect.left)/rect.width)*2-1;
          pointer.y = -((event.clientY-rect.top)/rect.height)*2+1;
          raycaster.setFromCamera(pointer,camera);
          const hit = raycaster.intersectObjects(pickables,false).find(x=>x.object.userData.moduleId);
          if (hit) onSelectRef.current?.(hit.object.userData.moduleId);
        }
      };
      const wheel = (event) => {
        event.preventDefault();
        const distance = camera.position.length();
        const next = Math.max(18,Math.min(42,distance*(1+Math.max(-0.08,Math.min(0.08,event.deltaY*0.0007))));
        camera.position.normalize().multiplyScalar(next);
      };
      canvas.addEventListener('pointerdown',down);
      canvas.addEventListener('pointermove',move);
      canvas.addEventListener('pointerup',up);
      canvas.addEventListener('pointercancel',up);
      canvas.addEventListener('wheel',wheel,{passive:false});

      const draw = () => {
        if (disposed) return;
        root.rotation.y += (targetY-root.rotation.y)*0.08;
        root.rotation.x += (targetX-root.rotation.x)*0.08;
        renderer.render(scene,camera);
        raf = requestAnimationFrame(draw);
      };
      draw();
      setReady(true);
      onReadyRef.current?.();

      return () => {
        canvas.removeEventListener('pointerdown',down);
        canvas.removeEventListener('pointermove',move);
        canvas.removeEventListener('pointerup',up);
        canvas.removeEventListener('pointercancel',up);
        canvas.removeEventListener('wheel',wheel);
      };
    };

    let removeListeners;
    loadThree().then(THREE => { if (!disposed) removeListeners = start(THREE); }).catch(() => {
      if (!disposed) { setFailed(true); onErrorRef.current?.(); }
    });

    return () => {
      disposed = true;
      removeListeners?.();
      observer?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (scene) scene.traverse(obj => {
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose?.());
        else obj.material?.dispose?.();
      });
      textures.forEach(t=>t.dispose());
      renderer?.dispose();
      if (renderer?.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      materials.clear();
    };
  }, [modules]);

  useEffect(() => {
    for (const [id, material] of materialMap.current.entries()) {
      if (material.emissive) {
        material.emissive.set(id === selectedId ? '#b9964d' : '#000000');
        material.emissiveIntensity = id === selectedId ? 0.25 : 0;
      }
    }
  }, [selectedId]);

  return (
    <div className={'ise-three-model ' + (ready ? 'is-ready ' : '') + (failed ? 'has-failed' : '')} ref={host}>
      {!ready && !failed && <span className="ise-three-loading">Preparing the interactive 3D model…</span>}
      {ready && <span className="ise-three-hint">DRAG TO ORBIT · SCROLL TO ZOOM · SELECT A BUILDING</span>}
    </div>
  );
}
