import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../animations/variants';
import type { ReactNode } from 'react';
export function Reveal({children,className='',delay=0}:{children:ReactNode,className?:string,delay?:number}) { const reduced=useReducedMotion(); return <motion.div className={className} variants={reduced?{hidden:{opacity:0},visible:{opacity:1}}:fadeUp} initial="hidden" whileInView="visible" viewport={{once:true,amount:.15}} transition={{delay}}>{children}</motion.div>; }
