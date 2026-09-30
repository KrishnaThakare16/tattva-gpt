import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
export function PremiumCursor(){
  const x=useMotionValue(-100),y=useMotionValue(-100);
  const sx=useSpring(x,{stiffness:420,damping:36}),sy=useSpring(y,{stiffness:420,damping:36});
  const [active,setActive]=useState(false),[visible,setVisible]=useState(false);
  const reduced=useReducedMotion();
  useEffect(()=>{
    const query=matchMedia('(pointer:fine) and (hover:hover)');
    if(reduced||!query.matches)return;
    const move=(e:PointerEvent)=>{x.set(e.clientX);y.set(e.clientY);setVisible(true);setActive(!!(e.target as Element).closest('a,button,input,textarea'));};
    const leave=()=>setVisible(false);
    window.addEventListener('pointermove',move);document.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);
    return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);};
  },[reduced,x,y]);
  if(reduced)return null;
  return <motion.div aria-hidden="true" className="premium-cursor" style={{left:sx,top:sy}} animate={{opacity:visible?1:0,scale:active?1.65:1}} transition={{duration:.22}}/>;
}
