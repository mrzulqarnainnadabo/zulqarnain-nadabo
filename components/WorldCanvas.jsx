'use client';

import { useEffect, useRef, useState } from 'react';

const EARTH_TEXTURE='https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/world.200407.3x5400x2700.jpg';

function solarPosition(date){
  const start=Date.UTC(date.getUTCFullYear(),0,0);
  const day=Math.floor((Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate())-start)/86400000);
  const hour=date.getUTCHours()+date.getUTCMinutes()/60+date.getUTCSeconds()/3600;
  const declination=23.44*Math.sin((2*Math.PI*(284+day))/365.2422);
  const longitude=180-hour*15;
  const lat=declination*Math.PI/180,lon=longitude*Math.PI/180;
  return {x:Math.cos(lat)*Math.sin(lon),y:Math.sin(lat),z:Math.cos(lat)*Math.cos(lon)};
}

export default function WorldCanvas(){
 const host=useRef(null),controls=useRef({zoom:0,rotation:0,auto:true,focus:false});
 const [clock,setClock]=useState({date:'',time:'',zone:'',phase:''});
 const [status,setStatus]=useState('Preparing Earth imagery…');
 useEffect(()=>{
  const updateClock=()=>{
   const now=new Date(),hour=now.getHours();
   setClock({date:new Intl.DateTimeFormat(undefined,{weekday:'short',day:'2-digit',month:'short',year:'numeric'}).format(now),time:new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now),zone:Intl.DateTimeFormat().resolvedOptions().timeZone,phase:hour>=6&&hour<18?'LOCAL DAY':'LOCAL NIGHT'});
  };
  updateClock();const timer=setInterval(updateClock,1000);
  return()=>clearInterval(timer);
 },[]);
 useEffect(()=>{
  let renderer,scene,camera,earth,clouds,frame,observer,resizeObserver,disposed=false,THREE,texture;
  let pointer=null,lastX=0,lastY=0,rotationY=0,rotationX=0,zoom=0,auto=true;
  const el=host.current;if(!el)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanup=()=>{disposed=true;if(frame)cancelAnimationFrame(frame);observer?.disconnect();resizeObserver?.disconnect();if(renderer){renderer.dispose();renderer.domElement.remove();}if(texture)texture.dispose();};
  const init=async()=>{
   try{
    THREE=await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    if(disposed)return;
    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,4.1);
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000,0);
    renderer.domElement.className='earth-webgl';renderer.domElement.setAttribute('aria-label','Interactive three-dimensional Earth. Drag to rotate; use the controls to zoom, pause rotation, reset or focus on Africa.');
    el.prepend(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x8192c7,.52));
    const sun=new THREE.DirectionalLight(0xffffff,2.25);sun.position.set(4,1,3);scene.add(sun);
    const loader=new THREE.TextureLoader();loader.crossOrigin='anonymous';
    texture=await new Promise((resolve,reject)=>loader.load(EARTH_TEXTURE,resolve,undefined,reject));
    if(disposed){texture.dispose();return;}
    texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
    earth=new THREE.Mesh(new THREE.SphereGeometry(1,96,64),new THREE.MeshStandardMaterial({map:texture,roughness:1,metalness:0}));
    scene.add(earth);
    const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.018,96,64),new THREE.ShaderMaterial({vertexShader:'varying vec3 vNormal; varying vec3 vView; void main(){vNormal=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);vView=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',fragmentShader:'varying vec3 vNormal; varying vec3 vView; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),3.0);gl_FragColor=vec4(0.20,0.43,1.0,rim*0.48);}',transparent:true,blending:THREE.AdditiveBlending,side:THREE.BackSide,depthWrite:false}));
    scene.add(atmosphere);
    const stars=new THREE.BufferGeometry(),positions=[];
    for(let i=0;i<900;i++){const r=18+Math.random()*22,a=Math.random()*Math.PI*2,z=Math.random()*2-1,s=Math.sqrt(1-z*z);positions.push(r*s*Math.cos(a),r*z,r*s*Math.sin(a));}
    stars.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0x9eacd9,size:.045,transparent:true,opacity:.72,sizeAttenuation:true})));
    const onResize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
    resizeObserver=new ResizeObserver(onResize);resizeObserver.observe(el);onResize();
    const onDown=e=>{pointer=e.pointerId;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);auto=false;};
    const onMove=e=>{if(pointer!==e.pointerId)return;rotationY+=(e.clientX-lastX)*.006;rotationX=Math.max(-1.05,Math.min(1.05,rotationX+(e.clientY-lastY)*.004));lastX=e.clientX;lastY=e.clientY;};
    const onUp=e=>{if(pointer===e.pointerId)pointer=null;};
    const onWheel=e=>{e.preventDefault();zoom=Math.max(-1.4,Math.min(2.2,zoom-e.deltaY*.002));};
    renderer.domElement.addEventListener('pointerdown',onDown);renderer.domElement.addEventListener('pointermove',onMove);renderer.domElement.addEventListener('pointerup',onUp);renderer.domElement.addEventListener('pointercancel',onUp);renderer.domElement.addEventListener('wheel',onWheel,{passive:false});
    const animate=()=>{
      frame=requestAnimationFrame(animate);
      const now=new Date(),sunDir=solarPosition(now);
      sun.position.set(sunDir.x*8,sunDir.y*8,sunDir.z*8);
      if(earth){if(auto&&!reduced)rotationY+=.00042;earth.rotation.set(rotationX,rotationY,0);atmosphere.rotation.copy(earth.rotation);}
      camera.position.z=4.1-zoom;
      renderer.render(scene,camera);
    };
    setStatus('Earth online · NASA global mosaic');
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else if(!frame)animate();};
    document.addEventListener('visibilitychange',visibility);
    observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){if(!frame)animate();}else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:.02});observer.observe(el);
    animate();
    return()=>{document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointermove',onMove);renderer.domElement.removeEventListener('pointerup',onUp);renderer.domElement.removeEventListener('pointercancel',onUp);renderer.domElement.removeEventListener('wheel',onWheel);};
   }catch(error){if(!disposed)setStatus('Earth imagery could not load · check connection');}
  };
  let removeEvents;init().then(fn=>{removeEvents=fn;});
  return()=>{removeEvents?.();cleanup();};
 },[]);
 const command=(name)=>{
  const canvas=host.current?.querySelector('canvas');if(!canvas)return;
  if(name==='zoom-in')canvas.dispatchEvent(new WheelEvent('wheel',{deltaY:-220,cancelable:true}));
  if(name==='zoom-out')canvas.dispatchEvent(new WheelEvent('wheel',{deltaY:220,cancelable:true}));
  if(name==='pause')controls.current.auto=!controls.current.auto;
  if(name==='reset'){canvas.dispatchEvent(new PointerEvent('pointercancel',{pointerId:1}));}
  if(name==='africa'){canvas.focus();canvas.dispatchEvent(new KeyboardEvent('keydown',{key:'a'}));}
 };
 return <section className="earth-experience" aria-label="Live Earth experience">
  <div className="earth-topline"><span>EARTH / REAL-TIME SUN POSITION</span><span>{clock.phase||'CALCULATING'}</span></div>
  <div className="earth-loader">{status}</div>
  <div className="earth-bottomline"><span>{clock.date}</span><span>{clock.time} {clock.zone}</span><span>NASA BLUE MARBLE</span></div>
  <div className="earth-controls" aria-label="Earth controls">
   <button type="button" aria-label="Zoom in" onClick={()=>command('zoom-in')}>+</button>
   <button type="button" aria-label="Zoom out" onClick={()=>command('zoom-out')}>−</button>
   <button type="button" aria-label="Pause or resume rotation" onClick={()=>{const c=host.current?.querySelector('canvas');if(c){c.dispatchEvent(new KeyboardEvent('keydown',{key:' ' }));}}}>Ⅱ</button>
   <button type="button" aria-label="Reset Earth view" onClick={()=>command('reset')}>↺</button>
  </div>
  <p className="earth-source">Global surface imagery: NASA Blue Marble · not live satellite imagery</p>
  <div className="earth-canvas-host" ref={host}/>
 </section>;
}
