'use client';

import { useEffect, useRef, useState } from 'react';

const THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';
const EARTH_TEXTURE = 'https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/world.200407.3x5400x2700.jpg';

export default function WorldCanvas() {
  const hostRef = useRef(null);
  const [mode,setMode] = useState('Earth');
  const [ready,setReady] = useState(false);
  const [error,setError] = useState(false);

  useEffect(() => {
    let renderer, frame, observer, disposed=false, cleanup=()=>{};
    const host=hostRef.current;
    if(!host)return;
    const loadThree=()=>new Promise((resolve,reject)=>{
      if(window.THREE)return resolve(window.THREE);
      let script=document.querySelector('script[data-three-earth]');
      if(script){script.addEventListener('load',()=>resolve(window.THREE),{once:true});script.addEventListener('error',reject,{once:true});return;}
      script=document.createElement('script');script.src=THREE_SRC;script.async=true;script.dataset.threeEarth='true';
      script.onload=()=>resolve(window.THREE);script.onerror=reject;document.head.appendChild(script);
    });
    let scene,camera,earth,clouds,stars,drag=false,lastX=0,lastY=0,autoRotate=true,zoom=4.2,downX=0,downY=0;
    const start=async()=>{
      try{
        const THREE=await loadThree();if(disposed)return;
        scene=new THREE.Scene();
        camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,zoom);
        renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
        renderer.setSize(host.clientWidth,host.clientHeight);
        renderer.outputColorSpace=THREE.SRGBColorSpace;
        renderer.toneMapping=THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure=1.1;
        renderer.domElement.className='earth-webgl';
        renderer.domElement.setAttribute('aria-label','Interactive three-dimensional Earth. Drag to rotate and use the controls to zoom.');
        renderer.domElement.setAttribute('role','img');
        host.prepend(renderer.domElement);
        scene.add(new THREE.AmbientLight(0x8d9bc9,.55));
        const sun=new THREE.DirectionalLight(0xffffff,2.15);sun.position.set(-4,2,5);scene.add(sun);
        const loader=new THREE.TextureLoader();loader.crossOrigin='anonymous';
        const texture=await new Promise((resolve,reject)=>loader.load(EARTH_TEXTURE,resolve,undefined,reject));
        if(disposed)return;
        texture.colorSpace=THREE.SRGBColorSpace;
        const sphere=new THREE.SphereGeometry(1,96,64);
        const material=new THREE.MeshStandardMaterial({map:texture,roughness:1,metalness:0});
        earth=new THREE.Mesh(sphere,material);earth.rotation.z=THREE.MathUtils.degToRad(8);scene.add(earth);
        const cloudMaterial=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.17,depthWrite:false});
        clouds=new THREE.Mesh(new THREE.SphereGeometry(1.009,72,48),cloudMaterial);scene.add(clouds);
        const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.035,64,48),new THREE.ShaderMaterial({
          vertexShader:'varying vec3 vNormal; varying vec3 vView; void main(){vNormal=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vView=normalize(-mv.xyz); gl_Position=projectionMatrix*mv;}',
          fragmentShader:'varying vec3 vNormal; varying vec3 vView; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),3.2); gl_FragColor=vec4(0.24,0.48,1.0,rim*0.52);}',
          blending:THREE.AdditiveBlending,transparent:true,side:THREE.BackSide,depthWrite:false
        }));scene.add(atmosphere);
        const starGeometry=new THREE.BufferGeometry(),positions=[];
        for(let i=0;i<1100;i++){const v=new THREE.Vector3().randomDirection().multiplyScalar(18+Math.random()*18);positions.push(v.x,v.y,v.z);}
        starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
        stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0x9ba8d8,size:.055,transparent:true,opacity:.65}));scene.add(stars);
        const resize=()=>{if(!renderer)return;const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();renderer.setSize(w,h);};
        const down=e=>{drag=true;autoRotate=false;lastX=e.clientX;lastY=e.clientY;downX=e.clientX;downY=e.clientY;renderer.domElement.setPointerCapture?.(e.pointerId);};
        const move=e=>{if(!drag)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;earth.rotation.y+=dx*.005;earth.rotation.x=Math.max(-1.15,Math.min(1.15,earth.rotation.x+dy*.004));clouds.rotation.copy(earth.rotation);lastX=e.clientX;lastY=e.clientY;};
        const up=()=>{drag=false;};
        const wheel=e=>{e.preventDefault();zoom=Math.max(2.35,Math.min(7.2,zoom+e.deltaY*.003));camera.position.z=zoom;};
        const key=e=>{if(e.key==='ArrowLeft')earth.rotation.y-=.12;if(e.key==='ArrowRight')earth.rotation.y+=.12;if(e.key==='ArrowUp')earth.rotation.x=Math.min(1.15,earth.rotation.x+.1);if(e.key==='ArrowDown')earth.rotation.x=Math.max(-1.15,earth.rotation.x-.1);};
        const canvas=renderer.domElement;
        canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('wheel',wheel,{passive:false});canvas.addEventListener('keydown',key);canvas.tabIndex=0;
        observer=new ResizeObserver(resize);observer.observe(host);
        const animate=()=>{if(disposed)return;frame=requestAnimationFrame(animate);if(autoRotate&&!drag){earth.rotation.y+=.00065;clouds.rotation.y+=.00078;}renderer.render(scene,camera);};
        animate();setReady(true);
        cleanup=()=>{cancelAnimationFrame(frame);observer?.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('wheel',wheel);canvas.removeEventListener('keydown',key);renderer?.dispose();sphere.dispose();texture.dispose();};
      }catch(e){setError(true);}
    };
    start();
    return()=>{disposed=true;cleanup();renderer?.dispose();};
  },[]);

  return (
    <div className="world-stage earth-experience" ref={hostRef}>
      <div className="earth-topline"><span>EARTH / 01</span><span>{ready?'INTERACTIVE GLOBE':'LOADING PLANET'}</span></div>
      <div className="earth-loader">{error?'The 3D globe could not load. Check your connection.':'Preparing the planet…'}</div>
      <div className="earth-controls">
        <button type="button" onClick={()=>{const c=hostRef.current?.querySelector('canvas');if(c)c.dispatchEvent(new WheelEvent('wheel',{deltaY:-350,cancelable:true}));}}>＋</button>
        <button type="button" onClick={()=>{const c=hostRef.current?.querySelector('canvas');if(c)c.dispatchEvent(new WheelEvent('wheel',{deltaY:350,cancelable:true}));}}>−</button>
        <button type="button" onClick={()=>{const c=hostRef.current?.querySelector('canvas');if(c){c.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight'}));}}}>↻</button>
      </div>
      <div className="earth-bottomline"><span>DRAG TO ROTATE</span><span>SCROLL TO EXPLORE</span><span>NASA BLUE MARBLE</span></div>
      {error&&<a className="earth-source" href="https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/" target="_blank" rel="noreferrer">Texture source & credits ↗</a>}
    </div>
  );
}
