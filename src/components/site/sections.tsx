import { ArrowUpRight } from "lucide-react";
import { MaskHeading, Line, Photo, Reveal } from "./motion";
import { useLightbox } from "./Lightbox";
import { SocialIcon } from "./SocialIcon";
import { ELSEWHERE, PHOTOS, SOCIALS } from "@/lib/site";

export function SectionHead({ index, label, title, as = "h2" }: { index: string; label: string; title: string; as?: "h1" | "h2" }) {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal><p className="eyebrow">{index} / {label}</p></Reveal>
        <MaskHeading as={as} className="display mt-4 text-6xl md:text-8xl">{title}</MaskHeading>
      </div>
      <div className="md:col-span-4"><Line delay={0.2} /></div>
    </div>
  );
}

export function Photographs() {
  const open = useLightbox();
  const ps = [
    [PHOTOS.hero, "Jaden wearing a headset"], [PHOTOS.ch1a, "Jaden as a child on the stairs"], [PHOTOS.ch1b, "Jaden as a child in winter"],
    [PHOTOS.ch2, "Jaden as a child by the water"], [PHOTOS.ch3, "Jaden at his streaming setup"], [PHOTOS.ch4, "Jaden holding a PlayStation 5"],
    [PHOTOS.ch5a, "Jaden on screen"], [PHOTOS.ch5b, "Jaden taking a mirror selfie"], [PHOTOS.ch6b, "Jaden outdoors with a friend"],
    [PHOTOS.storyIntro, "Jaden"], [PHOTOS.early, "Jaden"],
  ] as const;
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10">
      <SectionHead index="02" label="Archive" title="Photographs." as="h1" />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {ps.map(([src, alt], i) => (
          <Photo key={src + i} src={src} alt={alt} ratio={i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-square"} className="break-inside-avoid" parallax onOpen={() => open(src)} />
        ))}
      </div>
    </section>
  );
}

export function Content() {
  const platforms = SOCIALS.filter((s) => ["Twitch", "YouTube", "TikTok", "Instagram"].includes(s.name));
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10">
      <SectionHead index="03" label="Watch" title="Content." as="h1" />
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

export function Elsewhere() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-36 md:px-10">
      <SectionHead index="04" label="Featured" title="Elsewhere." as="h1" />
      <div className="grid gap-6 md:grid-cols-2">
        {ELSEWHERE.map((e, i) => (
          <Reveal key={e.url} delay={i * 0.12} y={40}>
            <a href={e.url} target="_blank" rel="noreferrer" className="lux-row group block overflow-hidden">
              <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-surface">
                <img src={e.image} alt={`${e.name} emblem`} loading="lazy" className="h-1/2 w-auto object-contain transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-110" />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-line p-6">
                <div><p className="display text-4xl">{e.name}</p><p className="mt-2 text-sm text-subtle">{e.desc}</p></div>
                <ArrowUpRight className="lux-arrow h-5 w-5 text-muted-foreground" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FindMe() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-32 pt-36 md:grid-cols-12 md:px-10">
      <div className="md:col-span-5">
        <Reveal><p className="eyebrow">05 / Socials</p></Reveal>
        <MaskHeading as="h1" className="display mt-4 text-6xl md:text-8xl">Find me.</MaskHeading>
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

