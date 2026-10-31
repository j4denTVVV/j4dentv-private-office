import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskHeading({ children, className, delay = 0, as = "h2" }: { children: ReactNode; className?: string; delay?: number; as?: "h1" | "h2" | "h3" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <Tag
        className={className}
        initial={reduce ? false : { y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </Tag>
    </span>
  );
}

export function Line({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.span
      className={`block h-px origin-left bg-champagne ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: EASE }}
    />
  );
}

export function Photo({ src, alt, className = "", ratio = "aspect-[4/5]", parallax = false, onOpen }: { src: string; alt: string; className?: string; ratio?: string; parallax?: boolean; onOpen?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax && !reduce ? ["-4%", "4%"] : ["0%", "0%"]);
  return (
    <motion.div
      ref={ref}
      className={`photo-zoom relative rounded-lg bg-surface ${ratio} ${className}`}
      initial={reduce ? false : { clipPath: "inset(12% 0 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.05, ease: EASE }}
    >
      <button type="button" onClick={onOpen} className="absolute inset-0 block h-full w-full cursor-zoom-in" aria-label="Open photograph">
        <motion.img style={{ y, scale: parallax ? 1.1 : 1 }} src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </button>
    </motion.div>
  );
}
