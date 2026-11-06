import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/site/Chrome";
import { FindMe } from "@/components/site/sections";

export const Route = createFileRoute("/find-me")({
  head: () => ({
    meta: [
      { title: "Find Me — J4denTV" },
      { name: "description", content: "Every official J4denTV social channel, from Twitch to the 4TV Discord." },
      { property: "og:title", content: "Find Me — J4denTV" },
      { property: "og:description", content: "Every official J4denTV social channel, from Twitch to the 4TV Discord." },
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
      <main><FindMe /></main>
      <Footer />
    </div>
  );
}
