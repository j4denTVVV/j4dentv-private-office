import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar, Footer } from "@/components/site/Chrome";
import { EASE, Photo, Reveal } from "@/components/site/motion";
import { useLightbox } from "@/components/site/Lightbox";
import { SectionHead } from "@/components/site/sections";
import { SocialIcon } from "@/components/site/SocialIcon";
import { lux } from "@/components/ui/lux-button";
import { INTRO, PHOTOS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "J4denTV — Streamer & creator from Nottingham, UK" },
      { name: "description", content: "Jaden, known online as J4denTV, is a British streamer and content creator from Nottingham, England." },
      { property: "og:title", content: "J4denTV — Streamer & creator from Nottingham" },
      { property: "og:description", content: "Gaming, livestreams, reactions, challenges and moments beyond the stream." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const reduce = useReducedMotion();
  const open = useLightbox();
  const up = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay: d, ease: EASE } });
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-20 pt-32 md:px-10 lg:min-h-[92vh] lg:grid-cols-12 lg:items-center lg:pt-28">
      <div className="lg:col-span-7">
        <motion.p {...up(0.2)} className="eyebrow">J4DENTV / Nottingham, UK</motion.p>
        <span className="mt-6 block overflow-hidden">
          <motion.h1 initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.3, ease: EASE }} className="display text-[22vw] leading-[0.85] sm:text-[17vw] lg:text-[11.5rem] xl:text-[13.5rem]">
            J4DENTV.
          </motion.h1>
        </span>
        <motion.p {...up(0.55)} className="mt-8 max-w-xl text-xl leading-snug text-foreground md:text-2xl">
          Jaden is a British streamer and content creator from <span className="font-serif italic text-champagne">Nottingham</span>, England.
        </motion.p>
        <motion.p {...up(0.65)} className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Gaming, livestreams, reactions, challenges and moments beyond the stream.
        </motion.p>
        <div className="mt-10 flex flex-wrap gap-3">
          <motion.div {...up(0.75)}>
            <Link to="/story" className={lux({})}>Discover his story <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></Link>
          </motion.div>
          <motion.div {...up(0.83)}>
            <a href="https://www.twitch.tv/j4denTV" target="_blank" rel="noreferrer" className={lux({ variant: "ghost" })}>
              <SocialIcon name="Twitch" className="h-3.5 w-3.5" /> Twitch
            </a>
          </motion.div>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
        <motion.span
          aria-hidden
          className="absolute -right-3 -top-3 bottom-3 left-3 rounded-lg border border-champagne/50 md:-right-5 md:-top-5 md:bottom-5 md:left-5"
          initial={reduce ? false : { opacity: 0, x: -10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.1, delay: 1.0, ease: EASE }}
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, clipPath: "inset(10% 0 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="photo-zoom relative aspect-[4/5] rounded-lg bg-surface shadow-[var(--shadow-photo)] lg:max-h-[78vh]"
        >
          <button onClick={() => open(PHOTOS.hero)} className="h-full w-full cursor-zoom-in" aria-label="Open photograph">
            <img src={PHOTOS.hero} alt="Jaden" className="h-full w-full object-cover object-[50%_35%]" style={{ animation: reduce ? undefined : "kenburns 18s ease-in-out infinite alternate" }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function StoryTeaser() {
  const open = useLightbox();
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-10">
      <SectionHead index="01" label="The story" title="My story." />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Photo src={PHOTOS.storyIntro} alt="Jaden" ratio="aspect-[4/5]" parallax onOpen={() => open(PHOTOS.storyIntro)} />
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-10">
          <Reveal>
            <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">“{(INTRO[0] ?? "").split(". ")[0]}.”</p>
          </Reveal>
          {INTRO.slice(1).map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="mt-6 max-w-[62ch] leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-3 border-y border-line py-6">
              {[["2017", "First Xbox"], ["2023", "Going live"], ["2024", "J4denTV"]].map(([y, l]) => (
                <div key={y}><p className="display text-3xl">{y}</p><p className="mt-1 text-xs text-subtle">{l}</p></div>
              ))}
            </div>
            <Link to="/story" className="link-draw mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em]">Read the full story <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Explore() {
  const items = [
    { to: "/photographs" as const, n: "02", t: "Photographs" },
    { to: "/content" as const, n: "03", t: "Content" },
    { to: "/elsewhere" as const, n: "04", t: "Elsewhere" },
    { to: "/find-me" as const, n: "05", t: "Find me" },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-32 pt-12 md:px-10">
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.to} delay={i * 0.08} y={20}>
            <Link to={it.to} className="group flex h-full min-h-48 flex-col justify-between bg-background p-6 transition-colors duration-300 hover:bg-surface">
              <div className="flex items-center justify-between"><span className="eyebrow">{it.n}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-champagne" /></div>
              <p className="display text-5xl transition-transform duration-500 group-hover:translate-x-1">{it.t}.</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <StoryTeaser />
        <Explore />
      </main>
      <Footer />
    </div>
  );
}
