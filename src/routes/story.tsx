import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar, Footer, Eye } from "@/components/site/Chrome";
import { Line, MaskHeading, Photo, Reveal } from "@/components/site/motion";
import { useLightbox } from "@/components/site/Lightbox";
import { CHAPTERS, INTRO, PHOTOS } from "@/lib/site";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "My Story — J4denTV" },
      { name: "description", content: "The story of Jaden, the Nottingham streamer and content creator known online as J4denTV." },
      { property: "og:title", content: "My Story — J4denTV" },
      { property: "og:description", content: "From a first Xbox in 2017 to streaming on Twitch as J4denTV." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Body({ paras }: { paras: string[] }) {
  return (
    <>
      {paras.map((p, i) => (
        <Reveal key={i} delay={0.1 + i * 0.08}>
          <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-muted-foreground first:mt-0">{p}</p>
        </Reveal>
      ))}
    </>
  );
}

function ChapterHead({ n, title, big = false }: { n: string; title: string; big?: boolean }) {
  return (
    <>
      <Reveal><p className="eyebrow text-champagne">Chapter {n}</p></Reveal>
      <MaskHeading as="h3" className={`display mt-3 ${big ? "text-6xl md:text-8xl" : "text-5xl md:text-6xl"}`}>{title}</MaskHeading>
      <Line className="mb-8 mt-6 w-16" delay={0.2} />
    </>
  );
}

function ChapterIndex() {
  const [active, setActive] = useState("ch-01");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    CHAPTERS.forEach((c) => { const el = document.getElementById(`ch-${c.n}`); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Chapters" className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 min-[1600px]:flex">
      {CHAPTERS.map((c) => (
        <a key={c.n} href={`#ch-${c.n}`} className={`group flex items-center gap-3 text-[11px] tracking-[0.2em] transition-colors duration-200 ${active === `ch-${c.n}` ? "text-foreground" : "text-subtle hover:text-muted-foreground"}`}>
          <span className={`h-px transition-all duration-300 ${active === `ch-${c.n}` ? "w-8 bg-champagne" : "w-4 bg-line-strong group-hover:w-6"}`} />
          {c.n}
        </a>
      ))}
    </nav>
  );
}

function Story() {
  const open = useLightbox();
  const [c1, c2, c3, c4, c5, c6] = CHAPTERS as unknown as [typeof CHAPTERS[number], typeof CHAPTERS[number], typeof CHAPTERS[number], typeof CHAPTERS[number], typeof CHAPTERS[number], typeof CHAPTERS[number]];
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <ChapterIndex />
      <main className="mx-auto max-w-[1440px] px-6 md:px-10">
        <header className="grid gap-12 pb-24 pt-36 md:grid-cols-12">
          <div className="md:col-span-12">
            <Reveal><Link to="/" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-foreground"><ArrowLeft className="h-3 w-3" /> Home</Link></Reveal>
            <Reveal delay={0.05}><p className="eyebrow mt-10">01 / The story</p></Reveal>
            <MaskHeading as="h1" className="display mt-4 text-[18vw] md:text-[10rem]">My story.</MaskHeading>
            <Line className="mt-6 max-w-md" delay={0.3} />
          </div>
          <div className="md:col-span-5">
            <Photo src={PHOTOS.storyIntro} alt="Jaden" parallax onOpen={() => open(PHOTOS.storyIntro)} />
          </div>
          <div className="md:col-span-6 md:col-start-7 md:self-center">
            <Reveal><p className="font-serif text-3xl leading-tight md:text-[2.1rem]">{INTRO[0] ?? ""}</p></Reveal>
            <div className="mt-8"><Body paras={INTRO.slice(1)} /></div>
          </div>
        </header>

        {/* 01 — narrow number, wide text, tall photo */}
        <section id={`ch-${c1.n}`} className="grid scroll-mt-24 gap-10 border-t border-line py-24 md:grid-cols-12">
          <Reveal className="md:col-span-2" y={60}><p className="display text-8xl text-elevated">{c1.n}</p></Reveal>
          <div className="md:col-span-5"><ChapterHead n={c1.n} title={c1.title} /><Body paras={c1.body} /></div>
          <div className="grid grid-cols-2 gap-4 md:col-span-5 md:col-start-8">
            <Photo src={PHOTOS.ch1a} alt="Jaden as a child on the stairs" ratio="aspect-[3/4]" parallax onOpen={() => open(PHOTOS.ch1a)} />
            <Photo src={PHOTOS.ch1b} alt="Jaden as a child outdoors in winter" ratio="aspect-[3/4]" className="mt-16" parallax onOpen={() => open(PHOTOS.ch1b)} />
          </div>
        </section>

        {/* 02 — large heading, text, two photos */}
        <section id={`ch-${c2.n}`} className="scroll-mt-24 border-t border-line py-24">
          <ChapterHead n={c2.n} title={c2.title} big />
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5"><Body paras={c2.body} /></div>
            <div className="md:col-span-5 md:col-start-8">
              <Photo src={PHOTOS.ch2} alt="Jaden as a child by the water" ratio="aspect-[4/5]" parallax onOpen={() => open(PHOTOS.ch2)} />
            </div>
          </div>
        </section>

        {/* 03 — full-width photographic transition */}
        <section id={`ch-${c3.n}`} className="scroll-mt-24 border-t border-line py-24">
          <Photo src={PHOTOS.ch3} alt="Jaden at his streaming setup" ratio="aspect-[4/5] md:aspect-[16/10]" position="object-[50%_30%]" onOpen={() => open(PHOTOS.ch3)} />
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4"><ChapterHead n={c3.n} title={c3.title} /></div>
            <div className="md:col-span-6 md:col-start-6"><Body paras={c3.body} /></div>
          </div>
        </section>

        {/* 04 — balanced columns */}
        <section id={`ch-${c4.n}`} className="grid scroll-mt-24 gap-12 border-t border-line py-24 md:grid-cols-2 md:items-center">
          <Photo src={PHOTOS.ch4} alt="Jaden holding a PlayStation 5" ratio="aspect-[4/5]" parallax onOpen={() => open(PHOTOS.ch4)} />
          <div><ChapterHead n={c4.n} title={c4.title} big /><Body paras={c4.body} /></div>
        </section>

        {/* 05 — comfortable reading column */}
        <section id={`ch-${c5.n}`} className="scroll-mt-24 border-t border-line py-28">
          <div className="mx-auto max-w-2xl">
            <ChapterHead n={c5.n} title={c5.title} />
            <Body paras={c5.body} />
            <div className="mt-12 grid grid-cols-2 gap-4">
              <Photo src={PHOTOS.ch5a} alt="Jaden on screen in a streaming setup" ratio="aspect-[3/4]" parallax onOpen={() => open(PHOTOS.ch5a)} />
              <Photo src={PHOTOS.ch5b} alt="Jaden taking a mirror selfie" ratio="aspect-[3/4]" className="mt-12" parallax onOpen={() => open(PHOTOS.ch5b)} />
            </div>
            <Reveal delay={0.2}><p className="mt-12 border-l border-champagne pl-6 font-serif text-3xl italic">A growing community, known as 4TV.</p></Reveal>
          </div>
        </section>

        {/* 06 — closing */}
        <section id={`ch-${c6.n}`} className="grid scroll-mt-24 gap-12 border-t border-line pb-32 pt-24 md:grid-cols-12">
          <div className="md:col-span-6"><ChapterHead n={c6.n} title={c6.title} big /><Body paras={c6.body} />
            <Reveal delay={0.3}><div className="mt-12 flex items-center gap-3 text-subtle"><Eye /><span className="eyebrow">To be continued</span></div></Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-5 md:col-start-8">
            <Photo src={PHOTOS.early} alt="" ratio="aspect-[3/4]" parallax onOpen={() => open(PHOTOS.early)} />
            <Photo src={PHOTOS.ch6b} alt="Jaden outdoors with a friend" ratio="aspect-[3/4]" className="mt-16" parallax onOpen={() => open(PHOTOS.ch6b)} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
