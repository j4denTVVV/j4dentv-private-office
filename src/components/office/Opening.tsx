import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { LOGO } from '@/lib/site';
import video from '@/assets/4tv-spinning.mp4.asset.json';
import { EASE } from '@/components/site/motion';
export function Opening({close}:{close:()=>void}) {
 const reduce=useReducedMotion();
 useEffect(()=>{const t=setTimeout(close,reduce?300:2900);return()=>clearTimeout(t)},[close,reduce]);
 return <motion.div role="dialog" aria-label="Office opening" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background" initial={{opacity:1}} exit={{opacity:0,scale:1.025}} transition={{duration:.35}}>
 <motion.div className="absolute inset-0 flex items-center justify-center" animate={{opacity:[0,1,1,0],scale:[.95,1,1,1]}} transition={{duration:1,times:[0,.2,.65,1]}}>{reduce?<img src={LOGO} alt="4TV" className="w-32"/>:<video src={video.url} autoPlay muted playsInline className="h-52 w-52 object-contain"/>}</motion.div>
 <div className="w-full max-w-4xl overflow-hidden px-6 text-center">
 {['PLAN.','CREATE.','EXECUTE.'].map((word,i)=><motion.p key={word} className="font-serif text-6xl leading-tight sm:text-8xl" initial={reduce?false:{x:i===0?-800:i===1?800:0,y:i===2?400:0,opacity:0,scale:.94,filter:'blur(7px)'}} animate={{x:0,y:0,opacity:1,scale:1,filter:'blur(0px)'}} transition={{duration:.65,delay:.65+i*.18,ease:EASE}}>{word}</motion.p>)}
 <motion.div className="mx-auto mt-6 h-px max-w-sm bg-champagne" initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:1.8,duration:.45,ease:EASE}}/>
 <motion.p className="mt-5 text-sm text-champagne" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}>THE PRIVATE OFFICE</motion.p>
 </div><Button variant="ghost" onClick={close} className="absolute bottom-8 text-muted-foreground">Skip Intro</Button>
 </motion.div>
}
