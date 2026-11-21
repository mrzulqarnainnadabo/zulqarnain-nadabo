'use client';
import {useEffect,useRef,useState} from 'react';
const EARTH_TEXTURE='https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/world.200407.3x5400x2700.jpg';
function subsolar(date){const n=(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate())-Date.UTC(date.getUTCFullYear(),0,0))/86400000;const h=date.getUTCHours()+date.getUTCMinutes()/60+date.getUTCSeconds()/3600;const dec=23.44*Math.sin(2*Math.PI*(284+n)/365.2422)*Math.PI/180;const lon=(180-h*15)*Math.PI/180;return [Math.cos(dec)*Math.sin(lon),Math.sin(dec),Math.cos(dec)*Math.cos(lon)];}
export default function WorldCanvas(){
 const host=useRef(null),api=useRef(null);
 const [clock,setClock]=useState({date:'',time:'',zone:'UTC'}),[status,setStatus]=useState('Loading Earth surface…');
 useEffect(()=>{const tick=()=>{const d=new Date();setClock({date:new Intl.DateTimeFormat(undefined,{weekday:'short',day:'2-digit',month:'short',year:'numeric'}).format(d),time:new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(d),zone:Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'});};tick();const t=setInterval(tick,1000);return()=>clearInterval(t);},[]);
 useEffect(()=>{
  let renderer,scene,camera,globe,atmosphere,raf=0,resize,disposed=false,THREE,texture,observer;
  let rx=0,ry=0,zoom=0,drag=null,auto=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const node=host.current;if(!node)return;
  const stop=()=>{disposed=true;cancelAnimationFrame(raf);observer?.disconnect();resize?.disconnect();if(texture)texture.dispose();if(renderer){renderer.dispose();renderer.domElement.remove();}};
  const start=async()=>{
   try{
    if(window.THREE)THREE=window.THREE;
    else THREE=await new Promise((resolve,reject)=>{let script=document.querySelector('script[data-three-earth]');if(script&&window.THREE){resolve(window.THREE);return;}if(!script){script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';script.async=true;script.dataset.threeEarth='1';document.head.appendChild(script);}script.addEventListener('load',()=>window.THREE?resolve(window.THREE):reject(new Error('Three.js unavailable')),{once:true});script.addEventListener('error',reject,{once:true});});
    if(disposed)return;
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(34,1,.1,80);camera.position.z=4.1;
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.setSize(node.clientWidth,node.clientHeight);renderer.setClearColor(0,0);renderer.domElement.className='earth-webgl';renderer.domElement.setAttribute('aria-label','Interactive Earth. Drag to rotate, scroll or use controls to zoom.');node.prepend(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x7180ad,.24));
    const sun=new THREE.DirectionalLight(0xffffff,2.15);scene.add(sun);
    const loader=new THREE.TextureLoader();loader.crossOrigin='anonymous';
    texture=await new Promise((resolve,reject)=>loader.load(EARTH_TEXTURE,resolve,undefined,reject));
    if(disposed){texture.dispose();return;}
    texture.encoding=THREE.sRGBEncoding;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
    globe=new THREE.Mesh(new THREE.SphereGeometry(1,96,64),new THREE.MeshPhongMaterial({map:texture,shininess:3,specular:0x101827}));scene.add(globe);
    atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.018,96,64),new THREE.ShaderMaterial({vertexShader:'varying vec3 n; varying vec3 v; void main(){n=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 n; varying vec3 v; void main(){float rim=pow(1.-max(dot(normalize(n),normalize(v)),0.),3.);gl_FragColor=vec4(.20,.43,1.,rim*.45);}',transparent:true,blending:THREE.AdditiveBlending,side:THREE.BackSide,depthWrite:false}));scene.add(atmosphere);
    const starsGeo=new THREE.BufferGeometry(),stars=[];for(let i=0;i<750;i++){const r=18+Math.random()*22,a=Math.random()*Math.PI*2,z=Math.random()*2-1,q=Math.sqrt(1-z*z);stars.push(r*q*Math.cos(a),r*z,r*q*Math.sin(a));}starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));scene.add(new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xa8b5e0,size:.04,transparent:true,opacity:.7})));
    resize= new ResizeObserver(()=>{const w=node.clientWidth,h=node.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();});resize.observe(node);
    const down=e=>{drag={id:e.pointerId,x:e.clientX,y:e.clientY};auto=false;renderer.domElement.setPointerCapture(e.pointerId);};
    const move=e=>{if(!drag||drag.id!==e.pointerId)return;ry+=(e.clientX-drag.x)*.006;rx=Math.max(-1.1,Math.min(1.1,rx+(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;};
    const up=e=>{if(drag?.id===e.pointerId)drag=null;};
    const wheel=e=>{e.preventDefault();zoom=Math.max(-1.2,Math.min(2,zoom-e.deltaY*.002));};
    renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up);renderer.domElement.addEventListener('wheel',wheel,{passive:false});
    api.current={in:()=>zoom=Math.min(2,zoom+.45),out:()=>zoom=Math.max(-1.2,zoom-.45),toggle:()=>auto=!auto,reset:()=>{rx=0;ry=0;zoom=0;auto=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;},africa:()=>{rx=-.12;ry=-.16;zoom=.35;}};
    const draw=()=>{if(disposed||document.hidden)return;raf=requestAnimationFrame(draw);const sunVector=subsolar(new Date());sun.position.set(sunVector[0]*9,sunVector[1]*9,sunVector[2]*9);if(auto)ry+=.00035;globe.rotation.set(rx,ry,0);atmosphere.rotation.copy(globe.rotation);camera.position.z=4.1-zoom;renderer.render(scene,camera);};
    const visibility=()=>{if(document.hidden)cancelAnimationFrame(raf);else if(!raf)draw();};document.addEventListener('visibilitychange',visibility);
    observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){if(!raf)draw();}else{cancelAnimationFrame(raf);raf=0;}},{threshold:.02});observer.observe(node);draw();setStatus('Earth online · NASA Blue Marble');
    return()=>{document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointercancel',up);renderer.domElement.removeEventListener('wheel',wheel);};
   }catch(e){if(!disposed)setStatus('Earth could not load · check your connection');}
  };
  let remove;start().then(fn=>remove=fn);return()=>{api.current=null;remove?.();stop();};
 },[]);
 const act=k=>api.current?.[k]?.();
 return <section className="earth-experience" aria-label="Interactive Earth"><div className="earth-topline"><span>EARTH / LIVE SUN POSITION</span><span>DAYLIGHT & NIGHT SHOWN BY SOLAR LIGHT</span></div><div className="earth-loader">{status}</div><div className="earth-bottomline"><span>{clock.date}</span><span>{clock.time} · {clock.zone}</span><span>NASA BLUE MARBLE</span></div><div className="earth-controls" aria-label="Earth controls"><button type="button" aria-label="Zoom in" onClick={()=>act('in')}>+</button><button type="button" aria-label="Zoom out" onClick={()=>act('out')}>−</button><button type="button" aria-label="Pause or resume rotation" onClick={()=>act('toggle')}>Ⅱ</button><button type="button" aria-label="Reset globe" onClick={()=>act('reset')}>↺</button><button type="button" aria-label="Focus on Africa" onClick={()=>act('africa')}>AF</button></div><p className="earth-source">NASA Blue Marble global mosaic · surface image is not live satellite data</p><div className="earth-canvas-host" ref={host}/></section>;
}
