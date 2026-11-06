import hero from "@/assets/photos/hero.jpg.asset.json";
import storyIntro from "@/assets/photos/story-intro.jpg.asset.json";
import chEarly from "@/assets/photos/ch-early.jpg.asset.json";
import chLive from "@/assets/photos/ch-going-live.jpg.asset.json";
import chBecoming from "@/assets/photos/ch-becoming.jpg.asset.json";
import chBeyond from "@/assets/photos/ch-beyond.jpg.asset.json";
import heroHeadset from "@/assets/photos/hero-headset.jpg.asset.json";
import ch1a from "@/assets/photos/ch1-stairs.jpg.asset.json";
import ch1b from "@/assets/photos/ch1-winter.png.asset.json";
import ch2 from "@/assets/photos/ch2-water.png.asset.json";
import ch3 from "@/assets/photos/ch3-setup.jpg.asset.json";
import ch4 from "@/assets/photos/ch4-ps5.png.asset.json";
import ch5a from "@/assets/photos/ch5-screen.jpg.asset.json";
import ch5b from "@/assets/photos/ch5-mirror.jpg.asset.json";
import ch6b from "@/assets/photos/ch6-friend.jpg.asset.json";
import logo from "@/assets/logo-4tv.png.asset.json";

// Phase 1 static content. Will move to the CMS (Biography Editor / Website Manager) in Phase 3.
export const LOGO = logo.url;

export const PHOTOS = {
  hero: heroHeadset.url,
  heroOld: hero.url,
  ch1a: ch1a.url, ch1b: ch1b.url, ch2: ch2.url, ch3: ch3.url, ch4: ch4.url,
  ch5a: ch5a.url, ch5b: ch5b.url, ch6b: ch6b.url,
  storyIntro: storyIntro.url,
  early: chEarly.url,
  live: chLive.url,
  becoming: chBecoming.url,
  beyond: chBeyond.url,
};

export const SOCIALS = [
  { name: "Twitch", handle: "j4denTV", url: "https://www.twitch.tv/j4denTV" },
  { name: "TikTok", handle: "@j4dentv_", url: "https://www.tiktok.com/@j4dentv_" },
  { name: "YouTube", handle: "@j4denTV", url: "https://www.youtube.com/@j4denTV" },
  { name: "Instagram", handle: "@j4denTV", url: "https://www.instagram.com/j4denTV/" },
  { name: "X", handle: "@j4denTV", url: "https://x.com/j4denTV" },
  { name: "Discord", handle: "4TV community", url: "https://discord.com/invite/wBkU3kvvv" },
] as const;

export const ELSEWHERE = [
  { name: "Prospect House", desc: "J4denTV's creator profile on Prospect House.", url: "https://prospect-house.com/members/j4dentv" },
  { name: "Prison Stream", desc: "Roster entry #029.", url: "https://prisonstream.com/roster/029" },
];

export const INTRO = [
  "Jaden, better known online as J4denTV, is a British streamer and content creator from Nottingham, England. His interest in gaming began at a young age and eventually developed into livestreaming and creating entertainment online.",
  "Starting with a simple setup, including streaming from a laptop, Jaden began building experience across gaming and live content. His streams have included reactions, challenges, IRL moments and conversations with viewers, while his content has expanded across Twitch, TikTok, YouTube Shorts and Instagram Reels.",
  "Known online to some as J4, he continues to develop his style as a creator, with Twitch as his main streaming platform and a growing community known as 4TV.",
];

export const CHAPTERS = [
  { n: "01", title: "Early life.", body: ["Growing up in Nottingham, Jaden developed an interest in gaming during his younger years. In 2017, he got his first Xbox, opening the door to online games and the communities that surrounded them. Gaming would later become an important part of his interest in creating content."] },
  { n: "02", title: "The early days.", body: ["Games such as Minecraft and Fortnite became part of Jaden's early online experiences. During this period, he also experimented with livestreaming through Mixer, gaining an early introduction to broadcasting gameplay and sharing moments online.", "As he spent more time watching creators and their communities, his interest in streaming developed beyond simply playing games."] },
  { n: "03", title: "Going live.", body: ["Around 2023, Jaden began pursuing streaming more seriously, initially broadcasting from a laptop. His early experiences involved learning how to create content, experimenting with different kinds of streams and gradually developing his confidence on camera.", "Over time, his interests moved beyond gaming alone, as he explored other forms of entertainment and audience interaction."] },
  { n: "04", title: "Becoming J4denTV.", body: ["In 2024, Jaden continued developing his streaming setup and online presence. Receiving a PlayStation 5 in June gave him another way to create gaming content, while late August marked an important period in the development of his Twitch activity.", "Through changes in usernames, platforms and content styles, the identity now known as J4denTV began taking shape."] },
  { n: "05", title: "Beyond the stream.", body: ["J4denTV's content has developed beyond traditional gaming streams. Alongside Twitch broadcasts, Jaden has experimented with reactions, challenges, IRL-style entertainment and interactive moments involving viewers.", "He has also placed increasing attention on short-form videos, using clips and highlights to share content across TikTok, YouTube Shorts and Instagram Reels. Around his streams, a growing community has developed under the name 4TV."] },
  { n: "06", title: "The present.", body: ["Jaden continues to develop J4denTV as his personal creative project, focusing on livestreaming, entertainment and finding new ways to share moments from his content. His attention remains on improving his streams, trying different ideas and developing a style that reflects his own personality."] },
];
