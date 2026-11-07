import { createFileRoute, redirect } from "@tanstack/react-router";

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
  beforeLoad: () => { throw redirect({ to: "/find-me", statusCode: 301 }); },
});
