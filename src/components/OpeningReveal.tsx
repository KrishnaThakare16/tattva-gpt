import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
const ease = [.22, 1, .36, 1] as const;
export function OpeningReveal({onComplete}:{onComplete:()=>void}) {
  const reduced=useReducedMotion();
  const [visible,setVisible]=useState(true);
  useEffect(()=>{
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const timer=window.setTimeout(()=>setVisible(false),reduced?100:1900);
    return()=>{clearTimeout(timer);document.body.style.overflow=previous;};
  },[reduced]);
  const finish=()=>{document.body.style.overflow='';onComplete();};
  return <AnimatePresence onExitComplete={finish}>{visible&&<motion.div className="opening-reveal" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?.15:1.25,delay:reduced?0:.18,ease}} aria-label="Welcome to Tattva Advertising Solution">
    <motion.div className="loader-halo" aria-hidden="true" exit={{opacity:0,scale:1.15}} transition={{duration:1.15,ease}}/>
    <motion.img src="/assets/loader-emblem.png" alt="Tattva Advertising Solution" width="1254" height="1254" initial={{opacity:0,scale:reduced?1:.94,y:reduced?0:15}} animate={{opacity:1,scale:1,y:0}} exit={reduced?{opacity:0}:{y:-100,scale:.94,opacity:0}} transition={{duration:1.25,ease}}/>
    <motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,y:reduced?0:-25}} transition={{duration:.8,ease}}>ADVERTISING REDEFINED</motion.span>
  </motion.div>}</AnimatePresence>;
}
