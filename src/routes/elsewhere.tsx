import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/site/Chrome";
import { Elsewhere } from "@/components/site/sections";

export const Route = createFileRoute("/elsewhere")({
  head: () => ({
    meta: [
      { title: "Elsewhere — J4denTV" },
      { name: "description", content: "J4denTV on Prospect House and Prison Stream." },
      { property: "og:title", content: "Elsewhere — J4denTV" },
      { property: "og:description", content: "J4denTV on Prospect House and Prison Stream." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main><Elsewhere /></main>
      <Footer />
    </div>
  );
}
