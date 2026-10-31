import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Eye } from "@/components/site/Chrome";
import { EASE } from "@/components/site/motion";
import { LOGO } from "@/lib/site";

export const Route = createFileRoute("/office")({
  head: () => ({
    meta: [
      { title: "Private Access — J4denTV" },
      { name: "description", content: "Private office for J4denTV." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Private Access — J4denTV" },
      { property: "og:description", content: "Behind the content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Office,
});

function Office() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="w-full max-w-sm text-center">
        <img src={LOGO} alt="4TV" className="mx-auto h-12 w-auto" />
        <h1 className="display mt-10 text-5xl">Private access.</h1>
        <p className="mt-3 font-serif text-xl italic text-muted-foreground">Behind the content.</p>
        <div className="mt-10 rounded-lg border border-line bg-surface p-6 text-sm text-muted-foreground">
          <Eye blink={false} className="mx-auto mb-4 h-3 w-6 text-champagne" />
          The private office is being prepared and isn't open yet.
        </div>
        <Link to="/" className="link-draw mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Return to site
        </Link>
      </motion.div>
    </main>
  );
}
