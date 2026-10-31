import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { Navbar, Footer } from "@/components/site/Chrome";
import { EASE, Line, MaskHeading, Photo, Reveal } from "@/components/site/motion";
import { useLightbox } from "@/components/site/Lightbox";
import { SocialIcon } from "@/components/site/SocialIcon";
import { lux } from "@/components/ui/lux-button";
import { ELSEWHERE, INTRO, PHOTOS, SOCIALS } from "@/lib/site";

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

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal><p className="eyebrow">{index} / {label}</p></Reveal>
        <MaskHeading className="display mt-4 text-6xl md:text-8xl">{title}</MaskHeading>
      </div>
      <div className="md:col-span-4"><Line delay={0.2} /></div>
    </div>
  );
}

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
            <img src={PHOTOS.hero} alt="Jaden" className="h-full w-full object-cover object-[50%_35%]" />
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
            <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">“{INTRO[0].split(". ")[0]}.”</p>
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

function Photographs() {
  const open = useLightbox();
  const ps = [PHOTOS.beyond, PHOTOS.live, PHOTOS.becoming];
  return (
    <section id="photographs" className="scroll-mt-20 mx-auto max-w-[1440px] px-6 py-24 md:px-10">
      <SectionHead index="02" label="Archive" title="Photographs." />
      <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
        <Photo src={ps[0]} alt="" ratio="aspect-[619/573] md:aspect-auto md:h-full" className="md:col-span-7 md:row-span-2" onOpen={() => open(ps[0])} />
        <Photo src={ps[1]} alt="" ratio="aspect-[4/5]" className="md:col-span-5 md:aspect-[16/11]" onOpen={() => open(ps[1])} />
        <Photo src={ps[2]} alt="" ratio="aspect-[4/5]" className="md:col-span-5 md:aspect-[16/11]" onOpen={() => open(ps[2])} />
      </div>
    </section>
  );
}

function Content() {
  const platforms = SOCIALS.filter((s) => ["Twitch", "YouTube", "TikTok", "Instagram"].includes(s.name));
  return (
    <section id="content" className="scroll-mt-20 mx-auto max-w-[1440px] px-6 py-24 md:px-10">
      <SectionHead index="03" label="Watch" title="Content." />
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {platforms.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07} y={12}>
            <a href={p.url} target="_blank" rel="noreferrer" className="group flex h-full min-h-56 flex-col justify-between bg-background p-6 transition-colors duration-200 hover:bg-surface">
              <div className="flex items-center justify-between text-muted-foreground">
                <SocialIcon name={p.name} className="h-5 w-5 transition-colors group-hover:text-foreground" />
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne" />
              </div>
              <div>
                <p className="display text-4xl">{p.name}</p>
                <p className="mt-2 text-sm text-subtle">{p.name === "Twitch" ? "Live streams" : p.name === "YouTube" ? "Videos & Shorts" : p.name === "TikTok" ? "Short-form clips" : "Reels"}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Rows({ items }: { items: { icon: React.ReactNode; name: string; desc: string; url: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((it, i) => (
        <Reveal key={it.url} delay={i * 0.06} y={10}>
          <a href={it.url} target="_blank" rel="noreferrer" className="lux-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 px-5 py-5">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted-foreground">{it.icon}</span>
            <span className="min-w-0">
              <span className="block truncate text-lg">{it.name}</span>
              <span className="block truncate text-sm text-subtle">{it.desc}</span>
            </span>
            <ArrowUpRight className="lux-arrow h-4 w-4 text-muted-foreground" />
          </a>
        </Reveal>
      ))}
    </div>
  );
}

function Elsewhere() {
  return (
    <section id="elsewhere" className="scroll-mt-20 mx-auto grid max-w-[1440px] gap-12 px-6 py-24 md:grid-cols-12 md:px-10">
      <div className="md:col-span-5">
        <Reveal><p className="eyebrow">04 / Featured</p></Reveal>
        <MaskHeading className="display mt-4 text-6xl md:text-7xl">Elsewhere.</MaskHeading>
      </div>
      <div className="md:col-span-7">
        <Rows items={ELSEWHERE.map((e) => ({ ...e, icon: <Globe className="h-4 w-4" /> }))} />
      </div>
    </section>
  );
}

function FindMe() {
  return (
    <section id="find-me" className="scroll-mt-20 mx-auto grid max-w-[1440px] gap-12 px-6 pb-32 pt-24 md:grid-cols-12 md:px-10">
      <div className="md:col-span-5">
        <Reveal><p className="eyebrow">05 / Socials</p></Reveal>
        <MaskHeading className="display mt-4 text-6xl md:text-7xl">Find me.</MaskHeading>
        <Reveal delay={0.15}><p className="mt-6 max-w-sm font-serif text-2xl italic text-muted-foreground">Live on Twitch, everywhere else in between.</p></Reveal>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 md:col-span-7">
        {SOCIALS.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05} y={10}>
            <a href={s.url} target="_blank" rel="noreferrer" className="lux-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4">
              <SocialIcon name={s.name} className="h-5 w-5 text-foreground" />
              <span className="min-w-0"><span className="block text-sm">{s.name}</span><span className="block truncate text-xs text-subtle">{s.handle}</span></span>
              <ArrowUpRight className="lux-arrow h-4 w-4 text-muted-foreground" />
            </a>
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
        <Photographs />
        <Content />
        <Elsewhere />
        <FindMe />
      </main>
      <Footer />
    </div>
  );
}
