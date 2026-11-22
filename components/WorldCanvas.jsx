'use client';
import {useEffect,useRef,useState} from 'react';

const EARTH_TEXTURE='https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/world.200407.3x5400x2700.jpg';
const NIGERIA={lat:10.5,lon:7.4};

function solarPosition(date){
  const start=Date.UTC(date.getUTCFullYear(),0,0);
  const day=(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate())-start)/86400000;
  const hour=date.getUTCHours()+date.getUTCMinutes()/60+date.getUTCSeconds()/3600;
  const declination=23.44*Math.sin(2*Math.PI*(284+day)/365.2422)*Math.PI/180;
  const longitude=(180-hour*15)*Math.PI/180;
  return [Math.cos(declination)*Math.sin(longitude),Math.sin(declination),Math.cos(declination)*Math.cos(longitude),declination,longitude];
}
function nigeriaDaylight(date){
  const [, , ,declination]=solarPosition(date);
  const lat=NIGERIA.lat*Math.PI/180;
  const hourAngle=((date.getUTCHours()+date.getUTCMinutes()/60+NIGERIA.lon/15-12)*15)*Math.PI/180;
  const altitude=Math.sin(lat)*Math.sin(declination)+Math.cos(lat)*Math.cos(declination)*Math.cos(hourAngle);
  return altitude>0?'DAYLIGHT':'NIGHT';
}
function loadThree(){
  if(window.THREE)return Promise.resolve(window.THREE);
  return new Promise((resolve,reject)=>{
    let script=document.querySelector('script[data-three-earth]');
    if(script?.dataset.loaded==='true'&&window.THREE){resolve(window.THREE);return;}
    const finish=()=>window.THREE?resolve(window.THREE):reject(new Error('Three.js failed to initialise'));
    const fail=()=>reject(new Error('Three.js could not be loaded'));
    if(!script){
      script=document.createElement('script');
      script.src='https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
      script.async=true;
      script.dataset.threeEarth='1';
      script.addEventListener('load',()=>{script.dataset.loaded='true';finish();},{once:true});
      script.addEventListener('error',fail,{once:true});
      document.head.appendChild(script);
    }else{
      script.addEventListener('load',finish,{once:true});
      script.addEventListener('error',fail,{once:true});
      if(script.dataset.loaded==='true')finish();
    }
    window.setTimeout(()=>{if(!window.THREE)fail();},12000);
  });
}

export default function WorldCanvas(){
  const host=useRef(null),api=useRef(null);
  const [clock,setClock]=useState({date:'',time:'',zone:'UTC',light:'NIGHT'});
  const [status,setStatus]=useState('Preparing the Earth…');
  const [motion,setMotion]=useState('AUTO');
  useEffect(()=>{
    const tick=()=>{
      const now=new Date();
      setClock({
        date:new Intl.DateTimeFormat(undefined,{weekday:'short',day:'2-digit',month:'short',year:'numeric'}).format(now),
        time:new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now),
        zone:Intl.DateTimeFormat().resolvedOptions().timeZone||'Local time',
        light:nigeriaDaylight(now)
      });
    };
    tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer);
  },[]);
  useEffect(()=>{
    let renderer,scene,camera,globe,atmosphere,texture,raf=0,resizeObserver,intersectionObserver,disposed=false,active=false,THREE;
    let rx=0,ry=0,zoom=0,drag=null,auto=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const node=host.current;if(!node)return;
    const stopFrames=()=>{if(raf)cancelAnimationFrame(raf);raf=0;};
    const renderFrame=()=>{
      raf=0;
      if(disposed||!active||document.hidden)return;
      const sun=solarPosition(new Date());
      scene.userData.sun.position.set(sun[0]*9,sun[1]*9,sun[2]*9);
      if(auto)ry+=.00028;
      globe.rotation.set(rx,ry,0);
      atmosphere.rotation.copy(globe.rotation);
      camera.position.z=4.05-zoom;
      renderer.render(scene,camera);
      raf=requestAnimationFrame(renderFrame);
    };
    let visible=false;
    const onVisibility=()=>{active=visible&&!document.hidden;if(active&&!raf)raf=requestAnimationFrame(renderFrame);else stopFrames();};
    const cleanup=()=>{
      disposed=true;stopFrames();document.removeEventListener('visibilitychange',onVisibility);
      intersectionObserver?.disconnect();resizeObserver?.disconnect();
      if(renderer){renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointercancel',up);renderer.domElement.removeEventListener('wheel',wheel);renderer.dispose();renderer.domElement.remove();}
      texture?.dispose();api.current=null;
    };
    const down=e=>{if(!renderer)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};auto=false;setMotion('PAUSED');renderer.domElement.setPointerCapture?.(e.pointerId);};
    const move=e=>{if(!drag||drag.id!==e.pointerId)return;ry+=(e.clientX-drag.x)*.006;rx=Math.max(-1.15,Math.min(1.15,rx+(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;};
    const up=e=>{if(drag?.id===e.pointerId)drag=null;};
    const wheel=e=>{e.preventDefault();zoom=Math.max(-1.1,Math.min(1.8,zoom-e.deltaY*.0018));};
    const start=async()=>{
      try{
        THREE=await loadThree();if(disposed)return;
        scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(34,1,.1,80);camera.position.z=4.05;
        renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
        renderer.setSize(Math.max(node.clientWidth,1),Math.max(node.clientHeight,1));
        renderer.setClearColor(0,0);renderer.domElement.className='earth-webgl';
        renderer.domElement.setAttribute('role','img');
        renderer.domElement.setAttribute('aria-label','Interactive Earth. Drag to rotate, use the controls to zoom, pause or focus on Africa.');
        node.prepend(renderer.domElement);
        scene.add(new THREE.AmbientLight(0x536080,.12));
        const sunLight=new THREE.DirectionalLight(0xffffff,2.35);scene.add(sunLight);scene.userData.sun=sunLight;
        const loader=new THREE.TextureLoader();loader.crossOrigin='anonymous';
        texture=await new Promise((resolve,reject)=>loader.load(EARTH_TEXTURE,resolve,undefined,reject));
        if(disposed){texture.dispose();return;}
        texture.encoding=THREE.sRGBEncoding;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
        globe=new THREE.Mesh(new THREE.SphereGeometry(1,112,80),new THREE.MeshPhongMaterial({map:texture,shininess:2,specular:0x0a1024}));scene.add(globe);
        atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.022,96,64),new THREE.ShaderMaterial({
          vertexShader:'varying vec3 n; varying vec3 v; void main(){n=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',
          fragmentShader:'varying vec3 n; varying vec3 v; void main(){float rim=pow(1.-max(dot(normalize(n),normalize(v)),0.),3.);gl_FragColor=vec4(.24,.48,1.,rim*.52);}',
          transparent:true,blending:THREE.AdditiveBlending,side:THREE.BackSide,depthWrite:false
        }));scene.add(atmosphere);
        const starGeometry=new THREE.BufferGeometry(),stars=[];
        for(let i=0;i<850;i++){const r=18+Math.random()*22,a=Math.random()*Math.PI*2,z=Math.random()*2-1,q=Math.sqrt(1-z*z);stars.push(r*q*Math.cos(a),r*z,r*q*Math.sin(a));}
        starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
        scene.add(new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xb9c5f5,size:.035,transparent:true,opacity:.72})));
        resizeObserver=new ResizeObserver(()=>{
          const w=node.clientWidth,h=node.clientHeight;if(!w||!h)return;
          renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
        });resizeObserver.observe(node);
        renderer.domElement.addEventListener('pointerdown',down);
        renderer.domElement.addEventListener('pointermove',move);
        renderer.domElement.addEventListener('pointerup',up);
        renderer.domElement.addEventListener('pointercancel',up);
        renderer.domElement.addEventListener('wheel',wheel,{passive:false});
        api.current={
          in:()=>zoom=Math.min(1.8,zoom+.38),
          out:()=>zoom=Math.max(-1.1,zoom-.38),
          toggle:()=>{auto=!auto;setMotion(auto?'AUTO':'PAUSED');},
          reset:()=>{rx=0;ry=0;zoom=0;auto=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;setMotion(auto?'AUTO':'PAUSED');},
          africa:()=>{rx=-.12;ry=-.16;zoom=.32;}
        };
        intersectionObserver=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;onVisibility();},{threshold:.02});
        intersectionObserver.observe(node);document.addEventListener('visibilitychange',onVisibility);
        setStatus('EARTH ONLINE');onVisibility();
      }catch(error){if(!disposed)setStatus('EARTH UNAVAILABLE · CHECK CONNECTION');}
    };
    start();
    return cleanup;
  },[]);
  const act=key=>api.current?.[key]?.();
  return <section className="earth-experience" aria-label="Interactive Earth and live solar clock">
    <div className="earth-topline"><span>EARTH / LIVE SOLAR MODEL</span><span>DRAG TO EXPLORE · SCROLL TO ZOOM</span></div>
    <div className="earth-canvas-host" ref={host}/>
    <div className={status==='EARTH ONLINE'?"earth-loader earth-loader-ready":"earth-loader"} role="status">{status}</div>
    <div className="earth-readout" aria-live="polite"><span className="earth-readout-label">NIGERIA / KADUNA REGION</span><strong>{clock.light==='DAYLIGHT'?'IN DAYLIGHT':'AFTER DARK'}</strong><span>{clock.date} · {clock.time} {clock.zone}</span></div>
    <div className="earth-controls" aria-label="Earth controls">
      <button type="button" aria-label="Zoom in" onClick={()=>act('in')}>+</button>
      <button type="button" aria-label="Zoom out" onClick={()=>act('out')}>−</button>
      <button type="button" aria-label={motion==='AUTO'?'Pause rotation':'Resume rotation'} onClick={()=>act('toggle')}>{motion==='AUTO'?'Ⅱ':'▶'}</button>
      <button type="button" aria-label="Reset Earth" onClick={()=>act('reset')}>↺</button>
      <button type="button" aria-label="Focus on Africa" onClick={()=>act('africa')}>AF</button>
    </div>
    <div className="earth-bottomline"><span>DAY / NIGHT TERMINATOR</span><span>NASA BLUE MARBLE · GLOBAL MOSAIC</span></div>
    <p className="earth-source">Solar position is calculated live · Surface imagery is not live satellite data</p>
  </section>;
}
