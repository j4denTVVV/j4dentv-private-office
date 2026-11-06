import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/site/Chrome";
import { Photographs } from "@/components/site/sections";

export const Route = createFileRoute("/photographs")({
  head: () => ({
    meta: [
      { title: "Photographs — J4denTV" },
      { name: "description", content: "Original photographs of Jaden, the Nottingham streamer known as J4denTV." },
      { property: "og:title", content: "Photographs — J4denTV" },
      { property: "og:description", content: "Original photographs of Jaden, the Nottingham streamer known as J4denTV." },
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
      <main><Photographs /></main>
      <Footer />
    </div>
  );
}
