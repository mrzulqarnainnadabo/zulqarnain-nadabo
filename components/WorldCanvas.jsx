'use client';

import { useEffect, useRef } from 'react';

const land = [
  [[-168,72],[-145,70],[-128,55],[-124,43],[-117,32],[-106,24],[-97,18],[-84,10],[-78,8],[-80,25],[-91,30],[-96,42],[-110,52],[-125,60],[-145,66]],
  [[-81,12],[-69,9],[-58,-2],[-50,-8],[-44,-22],[-52,-36],[-65,-55],[-73,-48],[-77,-28],[-80,-8]],
  [[-10,72],[15,71],[35,62],[48,52],[42,42],[30,35],[22,28],[12,14],[4,5],[-8,5],[-17,15],[-16,30],[-9,39],[-17,52]],
  [[-17,35],[-2,37],[13,34],[28,31],[36,18],[42,4],[49,-12],[40,-25],[28,-34],[18,-35],[10,-22],[2,-6],[-8,6],[-15,18]],
  [[35,70],[58,68],[78,58],[95,55],[118,48],[137,52],[154,60],[169,55],[160,42],[143,35],[130,28],[120,18],[108,8],[98,10],[88,22],[78,8],[68,8],[58,22],[48,30],[40,42]],
  [[112,-11],[132,-10],[151,-22],[146,-38],[130,-43],[115,-32]],
  [[-25,65],[-14,65],[-18,55],[-27,58]],
  [[47,-13],[51,-17],[49,-25],[45,-22]]
];

const nodes = [
  {lat:6,lon:7,label:'NIGERIA'},
  {lat:30,lon:31,label:'EVIDENCE'},
  {lat:19,lon:78,label:'SYSTEMS'},
  {lat:-14,lon:-52,label:'FIELD'},
  {lat:35,lon:139,label:'SIGNAL'}
];

function project(lat, lon, rotation, cx, cy, radius) {
  const p = lat * Math.PI / 180;
  const l = (lon + rotation) * Math.PI / 180;
  const x = Math.cos(p) * Math.sin(l);
  const y = Math.sin(p);
  const z = Math.cos(p) * Math.cos(l);
  return { x: cx + radius * x, y: cy - radius * y, z };
}

export default function WorldCanvas() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0, height = 0, frame = 0, rotation = -22, drag = false, lastX = 0, inView = true;
    let pointer = {x:0,y:0,active:false};
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      draw();
    };

    const draw = (time = 0) => {
      ctx.clearRect(0,0,width,height);
      const compact = width < 560;
      const radius = Math.min(width * (compact ? .43 : .39), height * .43);
      const cx = width * .51;
      const cy = height * .51;
      const t = time * .00012;

      // Soft orbital field behind the planet.
      const halo = ctx.createRadialGradient(cx,cy,radius*.7,cx,cy,radius*1.55);
      halo.addColorStop(0,'rgba(94,112,255,.13)');
      halo.addColorStop(.58,'rgba(94,112,255,.045)');
      halo.addColorStop(1,'rgba(94,112,255,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0,0,width,height);

      // Fine coordinate ticks and quiet star points.
      ctx.save();
      ctx.strokeStyle = 'rgba(74,85,151,.16)';
      ctx.lineWidth = .6;
      for(let i=0;i<12;i++){
        const a=i*Math.PI/6;
        ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*(radius+18),cy+Math.sin(a)*(radius+18));
        ctx.lineTo(cx+Math.cos(a)*(radius+27),cy+Math.sin(a)*(radius+27));ctx.stroke();
      }
      for(let i=0;i<38;i++){
        const x=(i*127.7%width), y=(i*71.3%height);
        ctx.fillStyle = i%5===0?'rgba(237,116,88,.42)':'rgba(74,85,151,.24)';
        ctx.beginPath();ctx.arc(x,y,i%5===0?1.6:.8,0,Math.PI*2);ctx.fill();
      }
      ctx.restore();

      // Planet body and atmospheric rim.
      const sphere = ctx.createRadialGradient(cx-radius*.32,cy-radius*.4,radius*.05,cx,cy,radius*1.12);
      sphere.addColorStop(0,'#e8e8f2');
      sphere.addColorStop(.56,'#b9c0dd');
      sphere.addColorStop(.86,'#7d88b9');
      sphere.addColorStop(1,'#333d78');
      ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.fillStyle=sphere;ctx.fill();
      ctx.save();
      ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.clip();

      // Longitude and latitude lines.
      ctx.strokeStyle='rgba(44,56,112,.25)';ctx.lineWidth=.75;
      for(let lat=-60;lat<=60;lat+=20){
        ctx.beginPath();
        for(let lon=-180;lon<=180;lon+=3){
          const p=project(lat,lon,rotation,cx,cy,radius);
          if(p.z<0)continue;
          if(lon===-180)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
        }
        ctx.stroke();
      }
      for(let lon=-180;lon<180;lon+=20){
        ctx.beginPath();
        let started=false;
        for(let lat=-88;lat<=88;lat+=2){
          const p=project(lat,lon,rotation,cx,cy,radius);
          if(p.z<0){started=false;continue;}
          if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);
        }
        ctx.stroke();
      }

      // Continents, projected as simplified geographic silhouettes.
      land.forEach((poly,index)=>{
        ctx.beginPath();let started=false;
        poly.forEach(([lon,lat])=>{
          const p=project(lat,lon,rotation,cx,cy,radius);
          if(p.z<=-.08){started=false;return;}
          if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);
        });
        ctx.closePath();
        ctx.fillStyle=index%3===0?'rgba(237,116,88,.78)':'rgba(66,78,144,.58)';
        ctx.strokeStyle='rgba(247,244,255,.55)';ctx.lineWidth=.8;
        ctx.fill();ctx.stroke();
      });

      // Contour-like relief bands: animated curved lines clipped to the globe.
      for(let j=0;j<8;j++){
        const y=cy-radius*.72+j*radius*.2+Math.sin(t*2+j)*4;
        ctx.beginPath();
        for(let x=cx-radius;x<=cx+radius;x+=5){
          const dx=(x-cx)/radius;
          const curve=y+Math.sin(dx*5+j*.8)*7+dx*dx*radius*.1;
          if(x===cx-radius)ctx.moveTo(x,curve);else ctx.lineTo(x,curve);
        }
        ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=.8;ctx.stroke();
      }

      // Connection arcs and moving signal points.
      const routePairs=[[0,1],[0,2],[0,3],[2,4]];
      routePairs.forEach(([a,b],i)=>{
        const A=project(nodes[a].lat,nodes[a].lon,rotation,cx,cy,radius);
        const B=project(nodes[b].lat,nodes[b].lon,rotation,cx,cy,radius);
        if(A.z<0.05||B.z<0.05)return;
        const mx=(A.x+B.x)/2, my=(A.y+B.y)/2-radius*.2;
        ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.quadraticCurveTo(mx,my,B.x,B.y);
        ctx.strokeStyle='rgba(239,112,83,.65)';ctx.lineWidth=1.25;ctx.setLineDash([3,5]);ctx.stroke();ctx.setLineDash([]);
        const phase=(t*2+i*.24)%1;
        const px=(1-phase)*(1-phase)*A.x+2*(1-phase)*phase*mx+phase*phase*B.x;
        const py=(1-phase)*(1-phase)*A.y+2*(1-phase)*phase*my+phase*phase*B.y;
        ctx.beginPath();ctx.arc(px,py,2.5,0,Math.PI*2);ctx.fillStyle='#f0785d';ctx.fill();
      });
      nodes.forEach((node,i)=>{
        const p=project(node.lat,node.lon,rotation,cx,cy,radius);
        if(p.z<.1)return;
        ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fillStyle='#f0785d';ctx.fill();
        ctx.beginPath();ctx.arc(p.x,p.y,8+Math.sin(t*4+i)*1.5,0,Math.PI*2);ctx.strokeStyle='rgba(240,120,93,.48)';ctx.lineWidth=1;ctx.stroke();
      });
      ctx.restore();

      // Rim and floating longitude marker.
      ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1.1;ctx.stroke();
      const marker=project(6,7,rotation,cx,cy,radius);
      if(marker.z>0){
        ctx.beginPath();ctx.arc(marker.x,marker.y,12,0,Math.PI*2);ctx.strokeStyle='rgba(240,120,93,.8)';ctx.lineWidth=1;ctx.stroke();
      }
      if(pointer.active){
        ctx.beginPath();ctx.arc(pointer.x,pointer.y,18,0,Math.PI*2);ctx.strokeStyle='rgba(58,72,145,.35)';ctx.lineWidth=1;ctx.stroke();
      }
    };

    let lastTime=0;
    const animate=(time)=>{
      if(!drag && !reduce) rotation += .012;
      draw(time);
      lastTime=time;
      if(!reduce) frame=requestAnimationFrame(animate);
    };
    const onPointerDown=(e)=>{drag=true;lastX=e.clientX;canvas.setPointerCapture?.(e.pointerId);};
    const onPointerMove=(e)=>{
      const rect=canvas.getBoundingClientRect();
      pointer={x:e.clientX-rect.left,y:e.clientY-rect.top,active:true};
      if(drag){rotation+=(e.clientX-lastX)*.35;lastX=e.clientX;draw(lastTime);}
    };
    const onPointerUp=()=>{drag=false;};
    const onPointerLeave=()=>{pointer.active=false;};
    const observer=new ResizeObserver(resize);
    observer.observe(wrap);
    canvas.addEventListener('pointerdown',onPointerDown);
    canvas.addEventListener('pointermove',onPointerMove);
    canvas.addEventListener('pointerup',onPointerUp);
    canvas.addEventListener('pointercancel',onPointerUp);
    canvas.addEventListener('pointerleave',onPointerLeave);
    resize();
    if(!reduce)frame=requestAnimationFrame(animate);
    return ()=>{
      cancelAnimationFrame(frame);resizeObserver.disconnect();visibilityObserver.disconnect();document.removeEventListener('visibilitychange',onVisibilityChange);
      canvas.removeEventListener('pointerdown',onPointerDown);
      canvas.removeEventListener('pointermove',onPointerMove);
      canvas.removeEventListener('pointerup',onPointerUp);
      canvas.removeEventListener('pointercancel',onPointerUp);
      canvas.removeEventListener('pointerleave',onPointerLeave);\n      canvas.removeEventListener('keydown',onKeyDown);
    };
  }, []);

  return (
    <div className="world-stage" ref={wrapRef}>
      <canvas ref={canvasRef} className="world-canvas" tabIndex={0} aria-label="Conceptual interactive globe showing connected places and research signals. Drag to rotate the world, or use the left and right arrow keys." role="img" />
      <div className="world-coordinate world-coordinate-top"><span>CONCEPTUAL WORLD VIEW</span><span>NOT LIVE DATA</span></div>
      <div className="world-coordinate world-coordinate-bottom"><span>PEOPLE</span><span>PLACE</span><span>SYSTEMS</span></div>
      <div className="world-focus"><i /> <span>Drag to explore</span></div>
    </div>
  );
}
