import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LOGO } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const WELCOME_INTRO_KEY = "hasSeenPrisonStreamIntro";
const ease = [0.22, 1, 0.36, 1] as const;

export function WelcomeIntro() {
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(WELCOME_INTRO_KEY)) return;
      sessionStorage.setItem(WELCOME_INTRO_KEY, "1");
    } catch {
      // Storage can be unavailable in privacy mode; still allow dismissal.
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const exit = window.setTimeout(() => setExiting(true), 2900);
    const finish = window.setTimeout(() => setActive(false), 3600);
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(false);
    };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (preference.matches) setActive(false); };
    preference.addEventListener("change", reduce);
    window.addEventListener("keydown", dismiss);
    return () => {
      window.clearTimeout(exit);
      window.clearTimeout(finish);
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.removeEventListener("keydown", dismiss);
      preference.removeEventListener("change", reduce);
    };
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      role="dialog"
      aria-label="Privae Office welcome"
      aria-modal="true"
      className="welcome-intro fixed inset-0 z-[100] isolate flex cursor-pointer items-center justify-center overflow-hidden bg-background"
      onClick={() => setActive(false)}
      initial={{ opacity: 0 }}
      animate={exiting ? { opacity: 0, scale: 1.06, filter: "blur(8px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: exiting ? 0.7 : 0.25, ease }}
    >
      <motion.div aria-hidden className="welcome-spotlight pointer-events-none absolute inset-0" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease }} />
      <div className="relative flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.img
          src={LOGO}
          alt="4TV"
          className="welcome-logo mb-12 h-auto w-56 object-contain sm:w-80"
          initial={{ opacity: 0, scale: 0.6, y: 28, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.85, ease }}
        />
        <motion.p className="text-[10px] font-medium uppercase text-muted-foreground sm:text-xs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.55, ease }}>
          WELCOME TO
        </motion.p>
        <motion.h1 className="welcome-title mt-5 font-display text-5xl uppercase leading-none sm:text-7xl md:text-8xl" initial={{ opacity: 0, y: 38, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 1.25, duration: 0.65, ease }}>
          Privae Office
        </motion.h1>
        <motion.div aria-hidden className="welcome-divider mt-8 h-px w-40 sm:w-64" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6, duration: 0.65, ease }} />
      </div>
      <Button autoFocus variant="ghost" onClick={() => setActive(false)} className="welcome-skip absolute bottom-10 text-xs font-normal text-muted-foreground hover:bg-transparent hover:text-foreground">
        Tap anywhere to skip
      </Button>
    </motion.div>
  );
}