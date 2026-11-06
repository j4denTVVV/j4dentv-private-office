import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/site/Chrome";
import { Content } from "@/components/site/sections";

export const Route = createFileRoute("/content")({
  head: () => ({
    meta: [
      { title: "Content — J4denTV" },
      { name: "description", content: "Watch J4denTV live on Twitch and catch clips on YouTube, TikTok and Instagram." },
      { property: "og:title", content: "Content — J4denTV" },
      { property: "og:description", content: "Watch J4denTV live on Twitch and catch clips on YouTube, TikTok and Instagram." },
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
      <main><Content /></main>
      <Footer />
    </div>
  );
}
