import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import spinning from "@/assets/4tv-spinning.mp4.asset.json";
import { LOGO } from "@/lib/site";

export function SpinningLogo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    if (playing && !reduce) ref.current.play().catch(() => setPlaying(false));
    else ref.current.pause();
  }, [playing, reduce]);
  return <div className="relative w-40 shrink-0">
    {reduce ? <img src={LOGO} alt="4TV" className="mx-auto h-12 w-auto" /> : <>
      <video ref={ref} src={spinning.url} muted loop playsInline preload="metadata" aria-label="Spinning 4TV logo" className="aspect-[2.09/1] w-full object-contain mix-blend-screen" />
      <Button variant="ghost" size="icon" title={playing ? "Pause logo" : "Play logo"} aria-label={playing ? "Pause logo" : "Play logo"} onClick={() => setPlaying(!playing)} className="absolute bottom-0 right-0 h-7 w-7 text-subtle">{playing ? <Pause /> : <Play />}</Button>
    </>}
  </div>;
}