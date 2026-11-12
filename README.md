# J4denTV Private Office

# J4DENTV
## THE DEFINITIVE WEBSITE & PRIVATE HQ MASTER BRIEF
### A Luxury Digital Biography, Personal Archive & Creator Operating System

**PROJECT TYPE:** Full-stack public website + secure private web application

**PROJECT NAME:** J4DENTV — THE PRIVATE OFFICE

**DESIGN DIRECTION:** Luxury MacBook Experience × Cinematic Editorial × Apple-Level Motion × Personal Biography

**BUILD CONTEXT:** New Lovable account, starting a fresh project. Previous-project code, credentials, photographs and database records must not be assumed to exist.

---

# 01. THE MOST IMPORTANT INSTRUCTION

I want a beautiful, exceptionally well-designed website for **J4denTV**, with an equally beautiful and functional **Private HQ**.

Both experiences must share **ONE cohesive visual identity and ONE interaction system**.

I do not want:

- A luxury public site with an ordinary SaaS dashboard behind it.
- A beautiful dashboard with a boring public homepage.
- A basic black website full of empty space.
- A traditional gaming website.
- A fake celebrity website.
- A generic Lovable template.
- A dashboard made entirely of identical cards.
- A static website without interaction.
- A page overloaded with gimmicky effects.
- A different design language on every route.

I want the experience of opening a beautifully engineered premium application on a MacBook Pro.

The public website should be expressive, cinematic, personal and photographic.

The Private HQ should be equally luxurious, fluid, refined and extremely productive.

**The public website and Private HQ must look, move and feel like two parts of the same product.**

The difference is only their purpose:

- **Public:** Discover the person behind J4denTV.
- **Private:** Manage everything behind J4denTV.

Use real working components, persistent data, secure authentication and carefully executed motion design.

This is a growing creator's website, not a fictional celebrity empire.

Authenticity must always come first.

---

# 02. BRAND IDENTITY

## Official identity

**Brand:** J4denTV

**Display wordmark:** J4DENTV

**Personal name:** Jaden

**Nickname:** J4

**Alternative nickname:** Tha Visionary

**Community:** 4TV

**Location:** Nottingham, England, United Kingdom

**Main platform:** Twitch

**Other platforms:** TikTok, YouTube, Instagram and X

**Intended domain:** https://j4den.co.uk

The custom domain is a future deployment target. Do not claim it is connected until configured.

## Naming rules

J4denTV is the primary identity.

Jaden is the name used in the biography.

J4 can appear naturally in selected places.

"Tha Visionary" is a secondary nickname and should appear no more than once on the public site unless I change that preference.

Do not build the design around endlessly repeating:

- The Vision Continues.
- 4 Tha Vision.
- The Movement.
- The Legacy.
- Building The Vision.
- Tha Visionary.

These phrases were overused in the previous project.

The website should have personality through genuine content, photography and design.

---

# 03. MY EXACT DESIGN TASTE

I want the website to look and feel like the work of an exceptional independent digital design studio.

Imagine:

**A black MacBook Pro opened in a beautifully furnished luxury apartment, showing a seamless private creative workspace.**

The same feeling should carry into the public website.

## Core characteristics

- Deep black backgrounds.
- Soft charcoal surfaces.
- Elegant ivory typography.
- Very restrained champagne-gold accents.
- Large, confident editorial headlines.
- Beautiful photography.
- Smooth page transitions.
- Sophisticated scrolling.
- Interactive hover effects.
- Fluid dropdowns.
- Carefully animated buttons.
- Refined typography movement.
- Subtle visual depth.
- Comfortable spacing.
- Responsive layouts.
- Native-app-level interaction quality.

## Reference influences

https://prospect-house.com/

https://prisonstream.com/

Use inspiration from Apple product pages, Linear, Raycast, refined macOS productivity applications and premium editorial websites.

Do not copy their exact interfaces.

## Important distinction

I want **rich minimalism**, not empty minimalism.

Minimal means removing unnecessary clutter.

It does not mean making every section a heading and two sentences surrounded by huge blank spaces.

I want the layout to feel intentionally composed, visually interesting and premium.

I also want **smooth interactive details**, not a lifeless static website.

---

# 04. ONE SHARED DESIGN SYSTEM FOR PUBLIC + PRIVATE

Build reusable design tokens and components used across BOTH environments.

## Shared palette

Background primary:
`#060607`

Background secondary:
`#101012`

Elevated surface:
`#19191C`

Hover surface:
`#232326`

Primary text:
`#F5F4F0`

Secondary text:
`#AAA9A4`

Muted text:
`#777777`

Champagne accent:
`#C5AA80`

Soft border:
`rgba(255,255,255,0.09)`

Stronger border:
`rgba(255,255,255,0.17)`

Use champagne only in selective moments:
- Focus states.
- Active navigation indicators.
- Small highlights.
- Important progress details.
- Fine decorative lines.

Avoid excessive gold gradients, glowing gold panels or luxury clichés.

## Shared typography

Use a distinct, deliberate typographic hierarchy.

**Display headings:** A strong, elegant condensed font such as Archivo Black, Anton or Oswald, carefully selected for the actual design.

**Editorial accent:** Instrument Serif, used occasionally for personal or photographic storytelling.

**Interface and body:** Geist or Inter.

The same font families must be used in the public website and the Private HQ.

Public headings can be much larger, while dashboard headings must be appropriately compact.

## Shared component styling

- Consistent corner radii, generally 8–12px.
- Very fine borders.
- Subtle charcoal surfaces.
- Soft natural shadows.
- Carefully aligned icons.
- High-quality button states.
- Consistent controls.
- Minimal visual noise.

Do not give the public buttons one style and the private dashboard buttons an unrelated style.

## Shared animation language

Every transition should feel as though it belongs to the same design system.

Use one set of motion tokens, easing curves and interaction patterns.

The public site may use larger scroll reveals.

The Private HQ uses quicker, more functional versions of those same movements.

This visual relationship is essential.

---

# 05. MOTION SYSTEM — MAKE IT FEEL EXPENSIVE

I want animations that feel buttery smooth and carefully designed.

Use Motion for React, Framer Motion if supported, or well-implemented CSS transitions.

Prefer transform and opacity animations.

Use progressive enhancement and respect reduced-motion settings.

## Timing standards

Small hover:
180–250ms.

Buttons:
200–280ms.

Dropdowns:
180–260ms.

Modal opening:
220–320ms.

Private page transitions:
200–350ms.

Public text reveal:
650–900ms.

Public image entrance:
800–1100ms.

Stagger between elements:
60–120ms.

## Preferred easing

Use a refined ease-out such as:

`cubic-bezier(0.22, 1, 0.36, 1)`

For interactive controls, use gently tuned spring motion when appropriate.

Avoid excessive bounce or rubber-band effects.

## Universal hover behaviour

Hovering an interactive component should produce a visible but sophisticated response.

Examples:
- Text gradually brightens.
- Underlines draw smoothly.
- Arrow icons shift slightly.
- Borders become more defined.
- Backgrounds lift subtly.
- Photographs zoom internally by roughly 2%.
- Small icons translate a couple of pixels.
- Cards reveal contextual actions.

No huge card scaling.

No RGB glows.

No constant shaking, spinning or gimmicky particle effects.

## Page navigation

When moving from one section or private route to another:
- Content softly transitions.
- Persistent navigation stays in place.
- No whole-page flashing.
- No unnecessary loading animation.
- No sudden shifts.

The user should feel they are moving through one continuous digital environment.

## Scroll design

Use natural browser scrolling.

Add:
- Subtle section reveals.
- Text-mask heading entrances.
- Elegant image reveals.
- Gentle parallax on selected photographs.
- Staggered transitions.

Do not use scroll-jacking or exaggerated inertia.

Animations must not delay reading, clicking or navigating.

## Accessibility

Respect `prefers-reduced-motion`.

Support keyboard navigation.

Avoid hover-only functionality on mobile.

---

# 06. REAL ORIGINAL ASSETS

The owner will upload:

1. Original transparent white 4TV logo.
2. Original profile picture.
3. Five personal photographs.
4. Additional historical photographs later.
5. Video thumbnails and screenshots.
6. Optionally, reference screenshots from the previous version.

**USE THESE EXACT FILES.**

Do not replace the creator with an AI-generated portrait.

Do not invent childhood photographs.

Do not substitute stock imagery.

Do not generate a new 4TV logo.

## Logo rules

The 4TV mark must:
- Have a genuinely transparent background.
- Be recognisable at navbar size.
- Have no visible rectangular backing.
- Use appropriate transparent cropping.
- Appear consistently across both environments.

Use it for:
- Public navbar.
- Private sidebar.
- Login page.
- Footer.
- Favicon.

## Image availability

Because this is a new Lovable account, do not assume the five photographs have transferred.

Provide a reliable upload process.

Until real photos are uploaded, use tasteful neutral placeholders rather than fake images.

---

# 07. OFFICIAL SOCIAL ACCOUNTS

Use the exact official links:

**Twitch**
https://www.twitch.tv/j4denTV

**TikTok**
https://www.tiktok.com/@j4dentv_

**YouTube**
https://www.youtube.com/@j4denTV

**Instagram**
https://www.instagram.com/j4denTV/

**X**
https://x.com/j4denTV

**Discord**
https://discord.com/invite/wBkU3kvvv

TikTok must include the underscore.

Use real social icons.

Allow all links to be edited securely from the Private HQ.

Never substitute generic platform landing pages.

---

# 08. PUBLIC WEBSITE — THE COMPLETE LAYOUT

Build a cohesive cinematic personal website.

## Public navigation

Use:

HOME  
MY STORY  
PHOTOGRAPHS  
CONTENT  
ELSEWHERE  
FIND ME

Include a discreet Private HQ access icon.

The site can be a smooth scrolling editorial page with a dedicated long-form biography route if appropriate.

Do not overcomplicate navigation.

## Navbar layout

At desktop width:
- White transparent 4TV logo left.
- J4DENTV wordmark beside it.
- Links aligned elegantly across the bar.
- Private-office icon right.

Initial height around 76px.

At the top:
- Very subtle transparent treatment.
- Minimal fine border.

When scrolling:
- Background transitions to deep translucent charcoal.
- Slight blur.
- Refined bottom border.
- Navigation becomes slightly more compact.

### Navbar hovers

Links brighten smoothly.

A small champagne underline draws from left to right.

Office icon responds with a small rotation or translation of only a few degrees/pixels.

Avoid excessive animation.

---

# 09. PUBLIC HERO — CINEMATIC BUT PERSONAL

This must be a visually impressive first impression.

## Desktop composition

Use a 12-column grid with a maximum content width around 1440px.

Left section: approximately 7 columns.

Right section: approximately 5 columns.

The hero should occupy most of the first viewport without excessive blank height.

## Left content

Small editorial label:

`J4DENTV / NOTTINGHAM, UK`

Main heading:

**J4DENTV.**

Large, crisp white condensed typography.

Below:

"Jaden is a British streamer and content creator from Nottingham, England."

Small secondary copy:

"Gaming, livestreams, reactions, challenges and moments beyond the stream."

## Buttons

Primary:
**DISCOVER HIS STORY**

Secondary:
**TWITCH**

Use premium custom button styles.

## Right content

Display one authentic owner-selected photograph.

Create sophisticated photographic framing:
- Beautiful scale.
- Controlled crop.
- Subtle shadow.
- Thin offset champagne line.
- No large captions.
- No logo overlay.
- No unrelated graphics.

## Hero entrance sequence

On initial page load:

1. Navbar fades in.
2. Location label appears.
3. J4DENTV heading reveals upward through a text mask.
4. Supporting biography fades upward.
5. Buttons appear with a short stagger.
6. Photograph reveals with subtle movement.
7. Decorative line finishes its entrance.

Make the sequence fluid rather than overly slow.

## Hero hover

The photograph slightly zooms internally.

Frame or border responds subtly.

Buttons use soft hover motion.

No excessive 3D tilt.

---

# 10. THE ACTUAL BIOGRAPHY — THIRD PERSON

**This is a biography ABOUT Jaden. It must be written in THIRD PERSON.**

Use:
- Jaden.
- He.
- His.
- J4denTV.

Do not use first-person narration.

Do not turn it into marketing copy.

The writing should feel like a professional biographical profile with authentic personal history.

Below is the initial factual material to work from.

The owner may revise details, dates and chronology later.

## Biography introduction — use this as initial approved-style copy

"Jaden, better known online as J4denTV, is a British streamer and content creator from Nottingham, England. His interest in gaming began at a young age and eventually developed into livestreaming and creating entertainment online.

Starting with a simple setup, including streaming from a laptop, Jaden began building experience across gaming and live content. His streams have included reactions, challenges, IRL moments and conversations with viewers, while his content has expanded across Twitch, TikTok, YouTube Shorts and Instagram Reels.

Known online to some as J4, he continues to develop his style as a creator, with Twitch as his main streaming platform and a growing community known as 4TV."

This introduction is intentionally modest and factual.

Do not add fake awards, large follower counts or made-up achievements.

---

# 11. BIOGRAPHY CHAPTERS & HISTORICAL MATERIAL

Build the biography as a chronological feature with editable chapters.

Use the following known background information to establish a starter narrative.

Where exact dates or wording could need clarification, keep the associated content editable and avoid inventing greater precision.

## CHAPTER 01 — EARLY LIFE

Title:

**EARLY LIFE.**

Jaden is from Nottingham, England.

His interest in gaming began during childhood.

He has described receiving his first Xbox in 2017, which became an important part of his early gaming experiences.

Keep this chapter focused on his early relationship with gaming.

Do not invent family stories, schools, childhood struggles or locations.

### Suggested starter text

"Growing up in Nottingham, Jaden developed an interest in gaming during his younger years. In 2017, he got his first Xbox, opening the door to online games and the communities that surrounded them. Gaming would later become an important part of his interest in creating content."

Keep the text editable.

## CHAPTER 02 — GAMING & EARLY STREAMING

Title:

**THE EARLY DAYS.**

Known historical topics include:
- Xbox.
- Minecraft.
- Fortnite.
- Mixer.
- Early experimentation with going live.
- Watching other creators.

Jaden has previously described early Minecraft and Fortnite experiences and streaming on Mixer.

He also became more interested in watching streamers around 2021.

### Suggested starter text

"Games such as Minecraft and Fortnite became part of Jaden's early online experiences. During this period, he also experimented with livestreaming through Mixer, gaining an early introduction to broadcasting gameplay and sharing moments online.

As he spent more time watching creators and their communities, his interest in streaming developed beyond simply playing games."

Do not invent specific friends, streamer names or memorable incidents.

## CHAPTER 03 — STARTING CONTENT CREATION

Title:

**GOING LIVE.**

Jaden has described beginning more sustained content creation around 2023, initially using a laptop to stream.

Earlier online identities included FlyboyJaden and other names, which can be documented once their exact order is confirmed.

His first attempts did not require an expensive setup.

### Suggested starter text

"Around 2023, Jaden began pursuing streaming more seriously, initially broadcasting from a laptop. His early experiences involved learning how to create content, experimenting with different kinds of streams and gradually developing his confidence on camera.

Over time, his interests moved beyond gaming alone, as he explored other forms of entertainment and audience interaction."

Do not invent audience numbers or dates.

## CHAPTER 04 — THE MOVE TOWARDS J4DENTV

Title:

**BECOMING J4DENTV.**

Important timeline notes:
- Jaden received a PlayStation 5 as a birthday gift in June 2024.
- He has described a significant fresh Twitch-account start in late August 2024, including 25 August 2024.
- His creator identity went through several earlier usernames.
- Twitch became his primary focus.

### Suggested starter text

"In 2024, Jaden continued developing his streaming setup and online presence. Receiving a PlayStation 5 in June gave him another way to create gaming content, while late August marked an important period in the development of his Twitch activity.

Through changes in usernames, platforms and content styles, the identity now known as J4denTV began taking shape."

The editor should allow corrections to historical dates and naming chronology without requiring a redesign.

## CHAPTER 05 — CONTENT & COMMUNITY

Title:

**BEYOND THE STREAM.**

Known content includes:
- Just Chatting.
- Gaming.
- Reactions.
- Challenges.
- IRL-style content.
- Community interactions.
- TikTok.
- Twitch.
- YouTube Shorts.
- Instagram Reels.

The community is called 4TV.

### Suggested starter text

"J4denTV's content has developed beyond traditional gaming streams. Alongside Twitch broadcasts, Jaden has experimented with reactions, challenges, IRL-style entertainment and interactive moments involving viewers.

He has also placed increasing attention on short-form videos, using clips and highlights to share content across TikTok, YouTube Shorts and Instagram Reels. Around his streams, a growing community has developed under the name 4TV."

Do not inflate audience size or claim unverified milestones.

## CHAPTER 06 — PRESENT & FUTURE

Title:

**THE PRESENT.**

This section should describe Jaden's current direction, including his interest in creating stronger livestreams, developing his content and improving consistency.

Do not pretend he has already achieved future goals.

### Suggested starter text

"Jaden continues to develop J4denTV as his personal creative project, focusing on livestreaming, entertainment and finding new ways to share moments from his content. His attention remains on improving his streams, trying different ideas and developing a style that reflects his own personality."

The owner can add his fuller story and future plans later.

## Biography accuracy rules

The initial historical details are owner-provided reference material.

Do not embellish them.

Do not add a detailed family, school or personal-life history without his input.

Do not expose exact birth dates or sensitive personal information.

Allow editing every sentence and chapter from the private CMS.

Treat uncertain dates and early-username sequences as material to confirm before final publication.

---

# 12. MY STORY — EXACT VISUAL PRESENTATION

Do NOT display the entire biography as a plain wall of text.

This must be a premium editorial reading experience.

## Main section

Eyebrow:

`01 / THE STORY`

Heading:

**MY STORY.**

A thin champagne line animates into view.

## Desktop layout

Create an asymmetrical composition.

For the opening:
- Approx. 5 columns for an authentic supporting photograph.
- Approx. 7 columns for introductory writing.

Use a DIFFERENT image from the homepage hero.

Do not reuse the same image immediately.

## Long-form chapters

Vary the editorial compositions.

Example:

Chapter 1:
- Narrow chapter number.
- Wide text block.
- One tall photograph.

Chapter 2:
- Larger left-aligned heading.
- Text.
- Two-photo arrangement.

Chapter 3:
- Full-width photographic transition.
- Smaller editorial story text.

Chapter 4:
- Balanced image and story columns.

Chapter 5:
- Comfortable reading column with subtle visual accents.

Chapter 6:
- Final photograph and concluding text.

Do not force every chapter into identical cards.

## Reading experience

Use:
- Comfortable paragraph width.
- Excellent line spacing.
- Clear chapter hierarchy.
- Generous but controlled spacing.
- Beautiful photo proportions.
- Occasional restrained serif accents.

## Chapter navigation

If useful, add a small sticky or floating chapter index on desktop.

It must be discreet and collapse naturally on mobile.

Do not make the biography feel like a complicated application.

## Scroll animation

As chapters enter:
- Small chapter number appears.
- Heading reveals.
- Body fades gently into place.
- Photograph enters with a subtle mask or translation.
- Fine divider completes its reveal.

Animations should support storytelling rather than distract from it.

---

# 13. THE FIVE PHOTOGRAPHS

The owner has five original photographs intended for this website.

They must be uploaded to the new project and managed correctly.

## Use of photographs

Distribute all five across the public site once approved.

Suggested placement:
- Image 1: Homepage hero.
- Image 2: My Story introduction.
- Image 3: Early chapters.
- Image 4: Later story chapter.
- Image 5: Closing composition or archive.

The layout should adjust to actual image aspect ratios.

## Important rules

Do not:
- Describe the photographs publicly.
- Add labels such as Fig. 01.
- Invent captions.
- Invent dates.
- Make up memories.
- Use fake childhood photos.
- Repeat the same photograph in consecutive sections.
- Crop faces unnecessarily.
- Convert every photograph to grayscale.

Dates, titles and captions are optional.

## Photo interaction

On hover:
- Slight internal zoom.
- Subtle contrast change.
- Gentle framing response.

On click:
- Smooth lightbox opening.
- Large image.
- Dark overlay.
- Refined close action.
- Keyboard support.

Keep it stylish, not complicated.

## Approval & publishing

All new uploads start private.

Only selected photos explicitly approved by the owner can appear on the public site.

Build:
- Individual approval.
- Bulk approval.
- Draft preview.
- Publish.
- Unpublish.
- Set as Hero.
- Add to Biography.
- Reorder.

When approval is clicked:
- Show loading feedback.
- Perform a secure backend update.
- Verify persistent state.
- Update the interface.
- Show success or a meaningful error.
- Make the image available to the publication workflow.

Do not create a button that does nothing.

Public images must load without visitors being signed into the HQ.

Private images must remain protected.

---

# 14. PHOTO ARCHIVE DESIGN

Heading:

**PHOTOGRAPHS.**

Use a premium editorial image arrangement.

Not a generic grid of six identical rounded cards.

## Desktop composition

Use an asymmetrical photo grid:
- One large photograph.
- Two medium photographs.
- Remaining images arranged based on their aspect ratios.

Avoid duplicating an entire large gallery immediately after showing those same photos throughout the biography.

The public gallery can be a curated secondary collection or a direct navigation destination within the story.

## Motion

Image reveals on scroll.

Smooth hover scale.

Elegant lightbox transitions.

No random 3D rotations or exaggerated movement.

---

# 15. CONTENT SECTION

Heading:

**CONTENT.**

Show selected real content from:
- Twitch.
- YouTube.
- TikTok.
- Instagram Reels.

Use genuine thumbnails and links.

## Layout

Create a compact, refined editorial content grid.

Cards should have:
- Real thumbnail.
- Small platform indicator.
- Content title.
- Hover zoom.
- Smooth arrow reveal.

No fake videos.

When no content is selected, show tasteful official platform links without huge empty placeholder cards.

---

# 16. FEATURED ELSEWHERE

Heading:

**ELSEWHERE.**

Use an elegant list of external appearances.

## Prospect House

https://prospect-house.com/members/j4dentv

Description:
"J4denTV's creator profile on Prospect House."

## Prison Stream

https://prisonstream.com/roster/029

Description:
"Roster entry #029."

Do not imply the classified roster entry publicly confirms an identity that has not been revealed.

## Interaction

Each row should have:
- Small icon.
- Website name.
- Short description.
- Arrow.

On hover:
- Background changes slightly.
- Border brightens.
- Arrow moves.
- Text becomes more prominent.

Use the SAME hover language as private HQ lists.

---

# 17. FIND ME

Heading:

**FIND ME.**

Use all six official accounts.

Layout:
- Small premium social rows or a balanced icon grid.
- Authentic platform icons.
- Username.
- Subtle interactive arrow.

No oversized promotional slogans.

Keep the section personal and polished.

---

# 18. THE BLINKING EYE

Build one small signature blinking-eye animation.

It should:
- Be monochrome.
- Fit the luxury aesthetic.
- Blink naturally and occasionally.
- Remain subtle.
- Respect reduced motion.
- Never interfere with navigation.

The same visual mark can appear discreetly within the private HQ, but it must not blink constantly across every page.

Use it as a small connection between the public and private experience.

---

# 19. TRANSITION FROM PUBLIC SITE TO PRIVATE HQ

This transition is extremely important.

Clicking the private-office icon should feel like moving into another area of the SAME luxurious environment.

## Flow

Public site → Private Login → Private HQ.

Keep:
- Same logo.
- Same palette.
- Same typography.
- Same accent colour.
- Same motion easing.
- Same button treatments.
- Same border language.

The Private HQ may use denser layouts, but must not look like another company's software.

## Login visual

Full-height dark composition.

Original 4TV logo.

Heading:

**PRIVATE ACCESS.**

Subtext:

"Behind the content."

A beautiful, secure password field.

Button:

**ENTER OFFICE**

Return-to-site link.

Use elegant fade/slide entrance motion.

No giant decorative illustrations.

No unnecessary login animation that delays the user.

---

# 20. PRIVATE HQ — CORE VISUAL DESIGN

The Private HQ must feel like a premium native macOS creative productivity application.

## Main shell

At 1440px desktop width:

Sidebar:
Approximately 232–248px.

Top command bar:
Approximately 68px.

Main content:
Remaining area in a structured 12-column grid.

Internal padding:
Approximately 32–40px.

## Background

Deep near-black.

Use slightly elevated surfaces with restrained borders.

Not every element needs its own card.

## Sidebar

Original white 4TV logo at the top.

Creator avatar and name.

Navigation groups.

Collapsed and expanded states.

Active link:
- Soft charcoal fill.
- Small champagne accent.
- Refined icon response.

Hover:
- Subtle background transition.
- Slight icon movement.
- Smooth text response.

Collapsing should animate smoothly without layout jumps.

## Top bar

Page name.

Global Search.

Quick Add.

Profile controls.

Subtle separators.

The top bar should feel as carefully built as the public navbar.

---

# 21. PRIVATE HQ NAVIGATION

Use the following groups.

## MAIN
Overview

## CREATE
Live Planner  
Content Studio  
Ideas  
Collaborations  
Live Companion

## TRACK
Analytics  
Calendar  
Goals  
Weekly Reviews

## RESOURCES
Creator Tools  
Equipment

## OFFICE
Focus Mode  
Biography Editor  
Archive  
Website Manager  
Settings  
View Public Site  
Log Out

All sidebar links must open real pages.

The mobile navigation must be similarly refined.

Do not display unfinished features as if they were fully functional.

---

# 22. OVERVIEW — EXACT PREMIUM LAYOUT

This is the heart of the Private HQ.

The first screen must feel like opening a luxury productivity application.

## Header

Small label:

`J4DENTV / PRIVATE OFFICE`

Main greeting:

**WELCOME BACK, JADEN.**

Supporting text:

"Everything behind the content, in one place."

Display the current date and profile picture.

## Dashboard grid

Use intentional asymmetric composition.

### First row

Left, approx. 8 columns:
- Greeting.
- Today's focus.
- Primary quick actions.

Right, approx. 4 columns:
- Next scheduled stream or project.
- Date.
- Short description.
- Open action.

### Second row

Left, approx. 7 columns:
**TODAY'S PRIORITIES**

Real working tasks with:
- Completion checkbox.
- Due date.
- Priority.
- Add action.

Right, approx. 5 columns:
**ROAD TO 1K**

Existing goal:
1,000 Twitch followers by 31 December 2026.

Show:
- Current count.
- Target.
- Remaining followers.
- Progress visual.
- Days left or completion/expiry state.

Never invent the current number.

### Third row

Use an attractive arrangement of:
- Content pipeline.
- Monthly activity.
- Platform analytics.

### Lower sections

- Subscriber milestones.
- Upcoming events.
- Saved tools.
- Weekly progress.
- Useful improvement observations.

## Premium dashboard styling

Mix:
- Wide feature panels.
- Compact metric blocks.
- Data rows.
- Small charts.
- Editorial section labels.
- Fine dividers.

Do not create a random sea of identical cards.

## Motion

On opening:
- Greeting reveals smoothly.
- Panels enter with slight stagger.
- Progress visuals animate once.
- Real data loads without flashing.
- Hover interactions remain fast.

Don't animate the entire dashboard on every minor update.

---

# 23. TASK MANAGEMENT

Build a real task system.

Support:
- Create.
- Edit.
- Complete.
- Delete.
- Priority.
- Deadline.
- Notes.
- Categories.
- Link to stream/video/project.

Completion should animate smoothly and save immediately.

The same task data must appear correctly in Overview, Calendar and Focus Mode.

Do not create disconnected copies.

---

# 24. ROAD TO 1K & SUBSCRIBER MILESTONES

## Follower goal

Initial goal:
1,000 Twitch followers by 31 December 2026.

Allow:
- Manual count updates.
- History.
- Target editing.
- Deadline editing.
- Progress calculation.

Show accurate progress.

If the deadline passes, handle it gracefully rather than displaying a broken countdown.

## Subscriber milestones

Preconfigure:

10 — Chat chooses profile picture for 24 hours.

20 — Mystery Food Challenge.

30 — Call a contact.

40 — Horror game with lights off.

50 — Bring a girl on stream.

100 — 24-hour stream.

200 — 48-hour stream.

These rewards must be editable.

No invented live subscriber count.

---

# 25. LIVE PLANNER

Build a high-quality stream planning workspace.

## Stream types

- Just Chatting.
- Gaming.
- Reactions.
- Discord Minigames.
- Viewer Challenges.
- IRL.
- Collaboration.
- Marathon.
- Subathon.
- Special Event.
- Custom.

## Stream fields

- Title.
- Date/time.
- Platform.
- Type.
- Duration.
- Goals.
- Segments.
- Guests.
- Notes.
- Preparation checklist.
- Status.

## Layout

Left:
List/calendar of streams.

Right or main:
Selected stream's planning workspace.

Use an elegant resizable or adaptive composition rather than a single long form.

## Rundown

Drag-and-drop stream segments.

Display:
- Segment name.
- Planned duration.
- Order.
- Notes.

Use smooth drag feedback.

## Pre-stream checklist

Include editable tasks:
- Camera.
- Microphone.
- OBS.
- Audio.
- Scenes.
- Title.
- Content plan.
- Replay Buffer.

## Post-stream review

Record real metrics and notes.

Show past stream performance.

No fake analytics.

---

# 26. LIVE COMPANION

Create a second-monitor-friendly interface for live interactive streams.

## Scoreboard

Exactly three default players, with editable names.

- Add points.
- Subtract points.
- Reset.
- Round tracking.
- Highlight leader.

## Games

- Finish the Lyrics.
- Would You Rather.
- Five Second Rule.
- Red Flag / Green Flag.
- Guess Who.
- Emoji Decoder.
- Same Brain.
- Trivia.
- Hot Takes.
- 4TV Courtroom.
- Category Elimination.

Support custom questions.

Allow a player who cannot use a microphone to answer through Discord chat.

No unauthorised copyrighted music playback.

## Design

Use the same luxury visual system, but make controls larger for live use.

Keep scoring responsive and easy to operate.

---

# 27. CONTENT STUDIO

Build a fully working content management environment.

Platforms:
- YouTube.
- YouTube Shorts.
- TikTok.
- Instagram Reels.
- Twitch clips.

## Workflow

IDEA → PLANNED → RECORDING → EDITING → READY → SCHEDULED → PUBLISHED

## Views

Kanban.

List.

Calendar.

## Each project

- Title.
- Description.
- Content type.
- Destination platform(s).
- Thumbnail.
- Caption.
- Notes.
- Recording date.
- Deadline.
- Publishing date.
- Link.
- Status.

## Interaction

Premium drag-and-drop stage changes.

Soft highlighted drop zones.

Subtle card animation.

Changes persist after refresh.

Do not claim real cross-platform publishing unless a connected integration actually works.

---

# 28. IDEAS

Create a premium creative idea library.

Categories:
- Streams.
- Videos.
- Shorts.
- Challenges.
- IRL.
- Collaborations.
- Community.
- Other.

Features:
- Fast idea capture.
- Tags.
- Priority.
- Search.
- Pin.
- Edit.
- Convert to stream.
- Convert to video.
- Convert to task.

Keep it extremely easy to add an idea quickly.

---

# 29. COLLABORATIONS

Create a creator relationship tracker.

## Data

- Creator name.
- Platform.
- Profile link.
- Collaboration idea.
- Contact status.
- Follow-up date.
- Notes.
- Planned stream/video.
- Outcome.

## Statuses

Discovered → Interested → Contacted → Discussing → Confirmed → Completed.

Use real creator records only.

If a platform API is not connected, provide a reliable manual workflow and real external links instead of fake search results.

---

# 30. ANALYTICS

Track:
- Twitch followers.
- Subscribers.
- Average viewers.
- Peak viewers.
- Streams.
- TikTok performance.
- YouTube performance.
- Instagram performance.
- X performance.
- Short-form content.
- Growth.

## Layout

Beautiful charts.

Compact data tables.

Platform selector.

Date range.

Growth summaries.

Historical comparisons.

## Data integrity

Distinguish:
- Manually entered.
- Automatically connected.
- Calculated.

Never invent statistics.

Charts should animate subtly when loading or changing filters.

They must remain readable.

---

# 31. CALENDAR

Build:
- Month view.
- Week view.
- Agenda view.

Events:
- Streams.
- Videos.
- Tasks.
- Collaborations.
- Deadlines.
- Custom events.

Use Europe/London timezone.

Support editing and scheduling.

Link events to their original projects.

Use smooth event-selection and modal transitions.

---

# 32. GOALS

Build a proper goal tracker.

Examples:
- Followers.
- Subscribers.
- Video uploads.
- Streams.
- Views.
- Content consistency.
- Personal targets.

Each goal needs:
- Name.
- Target.
- Current value.
- Deadline.
- Status.
- Progress.
- History.

Use actual records to update Overview.

---

# 33. WEEKLY REVIEWS

Provide a weekly creator review with:
- Streams completed.
- Videos published.
- Short-form posts.
- Follower changes.
- Tasks completed.
- Progress.
- What worked.
- What to improve.
- Next week's priorities.

Store previous reviews.

Do not generate fake accomplishments.

---

# 34. FOCUS MODE

Design a truly premium distraction-free environment.

When enabled:
- Sidebar reduces.
- Secondary interface fades.
- Current task becomes prominent.
- Active project stays accessible.
- Today's priorities remain visible.

Optional:
- Focus timer.
- Session notes.
- Completion tracking.

Use the SAME motion language as the public site but with faster transitions.

Focus Mode should feel like entering a carefully designed work session.

---

# 35. CREATOR TOOLS

Create a personal creator toolkit.

Include:
- Twitch Creator Dashboard.
- YouTube Studio.
- TikTok Studio.
- Metricool.
- Notion.
- StreamElements.
- StreamCharts.
- OBS Studio.
- Canva.
- Adobe After Effects.
- CapCut.

Use actual official links.

Allow:
- Search.
- Favourites.
- Add custom tool.
- Edit.
- Remove.
- Open.

Use compact elegant rows or tool tiles with tasteful hover interactions.

---

# 36. EQUIPMENT / MY SETUP

Build equipment management.

Statuses:
- Own.
- Want.
- Ordered.
- Upgrade Later.

Categories:
- PC.
- Cameras.
- Microphones.
- Monitors.
- Lighting.
- Desk.
- Capture Cards.
- Tripods.
- Accessories.

Fields:
- Item name.
- Brand.
- Image.
- Price.
- Quantity.
- Status.
- URL.
- Notes.

Use GBP.

Calculate accurate totals.

Provide Amazon UK search links or a real authorised catalogue integration.

Do not invent live product prices.

Potential equipment references requiring confirmation:
- Nikon D3500.
- TONOR TD510.
- GTX 1070.
- Ryzen 7 1700X.

Do not automatically treat every previously discussed product as owned.

---

# 37. GLOBAL SEARCH — MACBOOK COMMAND PALETTE

Shortcut:

**Ctrl/Cmd + K**

Create a high-quality global command palette.

## Behaviour

- Backdrop fades in.
- Modal appears smoothly.
- Search field receives focus.
- Results update quickly.
- Keyboard arrows navigate.
- Enter opens.
- Escape closes.

Search:
- Pages.
- Streams.
- Videos.
- Ideas.
- Tasks.
- Collaborations.
- Equipment.
- Tools.
- Calendar.
- Goals.

Search real persisted records only.

Do not display fabricated search results.

---

# 38. QUICK ADD

Shortcut:

**N**, only when not typing inside a form or editor.

Open a refined quick-action menu.

Actions:
- New Stream.
- New Video.
- New Idea.
- New Task.
- New Collaboration.
- New Calendar Event.
- New Goal.
- New Equipment Item.
- New Analytics Entry.

Each opens a working editor.

Saving must persist data.

Use smooth modal interactions and proper loading/error feedback.

---

# 39. BIOGRAPHY EDITOR

This is an important connection between the public and private experiences.

The public site tells the story.

The Private HQ controls it.

## Features

- Edit introduction.
- Create chapter.
- Rename chapter.
- Reorder.
- Edit long-form text.
- Insert photos between paragraphs.
- Set photo layout.
- Save draft.
- Preview.
- Publish.
- Unpublish.

Use a comfortable document-editor layout.

## Publishing controls

A chapter must not go public merely because it was saved.

Provide clear statuses:
- Draft.
- Ready.
- Published.

Only approved content and photographs can become public.

The editor should support genuine long-form third-person biographical writing.

---

# 40. PRIVATE PHOTO ARCHIVE

Build a reliable media manager.

It must support:
- Upload.
- Private storage.
- Large previews.
- Reorder.
- Select photos.
- Bulk approval.
- Publish.
- Unpublish.
- Set hero image.
- Assign to chapter.
- Replace.
- Delete with confirmation.

Dates and captions are optional.

Display approval state clearly.

Never silently fail.

Do not pretend that a file was published when it is still private.

---

# 41. WEBSITE MANAGER

Create a complete public website CMS.

Manage:
- Hero text.
- Hero photograph.
- Public logo.
- Introduction.
- Biography.
- Chapters.
- Photos.
- Content.
- Featured Elsewhere links.
- Social links.
- Public section visibility.

Provide:
- Edit.
- Save Draft.
- Preview.
- Publish.
- Unpublish.

## Private preview

Show what the public site WOULD look like with draft changes, including images awaiting publication approval, but only within authenticated preview access.

The live public site must still enforce media approval.

Do not leak unpublished images through publicly accessible preview URLs.

---

# 42. SETTINGS

Include:
- Profile.
- Branding.
- Social Accounts.
- Appearance.
- Security.
- Integrations.
- Notifications.
- Data Export/Import.

Allow secure password change.

Allow replacing authentic branding assets.

Show accurate connected/not-connected integration states.

---

# 43. SECURE AUTHENTICATION

Create owner-only authentication.

No public registration.

No visitor accounts.

## Absolutely critical security rule

The previous site had a login bug that could put the password in the URL if the form was submitted before the frontend fully loaded.

**DO NOT REPEAT THIS.**

Requirements:
- Secure server-side authentication.
- Safe password hashing.
- HTTPS POST for credentials.
- No GET credential submission.
- No passwords in URL parameters.
- No credentials in frontend code.
- No plaintext logging.
- Secure session cookies.
- Rate limiting.
- Session expiration.
- Protected private routes.
- Secure logout.
- Proper error handling.
- Safe initial password setup.

Ensure form behaviour is safe before JavaScript hydration.

Test immediate form submission.

Use the backend's supported secure authentication facilities.

Do not invent a hardcoded password.

---

# 44. BACKEND & DATA MODEL

Use Lovable's supported backend infrastructure.

Store:
- Owner profile.
- Socials.
- Branding assets.
- Media.
- Media approvals.
- Biography chapters.
- Public website data.
- Streams.
- Stream segments.
- Stream reviews.
- Content projects.
- Ideas.
- Tasks.
- Collaborations.
- Analytics.
- Goals.
- Calendar events.
- Equipment.
- Creator tools.
- Weekly reviews.
- Focus sessions.
- Settings.

## Important

Use secure access policies.

Private data must remain private.

Public visitors can only read approved and published public records.

Only the owner can edit the workspace.

Persist data correctly.

Keep shared records consistent.

Use sensible migrations and error handling.

---

# 45. MOBILE EXPERIENCE

The mobile website must feel just as carefully designed.

Do not simply shrink desktop components.

## Public mobile

- Strong hero typography.
- Beautiful photo stacking.
- Comfortable biography reading.
- Smooth but lightweight animation.
- Clean navigation drawer.
- Functional image viewing.
- Appropriate touch targets.

## Private mobile

- Premium navigation drawer.
- Compact command bar.
- Responsive task lists.
- Stacked dashboard modules.
- Functional forms.
- No horizontal overflow.
- Quick actions always accessible.

Hover effects should have appropriate focus/tap alternatives.

---

# 46. PERFORMANCE & MOTION QUALITY

Target smooth interactions on ordinary laptop hardware.

Prefer:
- Transform.
- Opacity.
- CSS variables.
- Lightweight animation.
- Optimised image sizes.
- Lazy loading.
- Reduced unnecessary rerenders.

Do not load multiple heavy animation systems to achieve simple effects.

Use native browser scrolling.

Do not animate everything constantly.

Keep the UI responsive during data entry.

Avoid excessive backdrop blur and large shadows that harm performance.

---

# 47. BUILD ORDER — PROTECT THE PROJECT CREDITS

This is a full project brief, not permission to create fifteen unfinished pages at once.

Follow this order.

## Phase 1 — Shared Luxury Design System + Public Website

Build:
- Design tokens.
- Typography.
- Motion system.
- Navbar.
- Hero.
- Biography layout.
- Five-photo integration and approval workflow.
- Content.
- Elsewhere.
- Socials.
- Footer.
- Blinking eye.
- Responsive layouts.

**Deliver a working visual website and inspect the actual browser preview.**

## Phase 2 — Private Login + Application Shell

Build:
- Secure login.
- Protected routes.
- Shared branding.
- Beautiful sidebar.
- Top command bar.
- Overview.
- Logout.

Test actual authentication.

## Phase 3 — Public Content Management

Build:
- Biography Editor.
- Photo Archive.
- Website Manager.
- Draft Preview.
- Publishing.

Test real photo publishing and biography publication.

## Phase 4 — Core Creator Productivity

Build:
- Tasks.
- Live Planner.
- Content Studio.
- Ideas.
- Calendar.
- Goals.
- Global Search.
- Quick Add.

Make each feature functional.

## Phase 5 — Extended Private HQ

Build:
- Analytics.
- Collaborations.
- Weekly Reviews.
- Focus Mode.
- Creator Tools.
- Equipment.
- Live Companion.
- Integrations and Settings.

## Phase 6 — Final Refinement

- Consistent motion.
- MacBook viewports.
- Mobile testing.
- Performance.
- Accessibility.
- Security.
- Media delivery.
- Public metadata.
- Favicon.
- Domain readiness.

**If credits or execution limits prevent completing everything, finish and test the current phase before reporting what remains.**

Do not use all credits on database foundations while the public site remains blank.

---

# 48. MANDATORY TESTING

After implementing each phase, use the actual browser preview when supported.

## Test visual design

At:
- 1280×800.
- 1440×900.
- 1512×982.
- 1920×1080.
- iPhone-sized viewport.

Check:
- Typography.
- Spacing.
- Image framing.
- Hero balance.
- Navbar.
- Motion.
- Hover states.
- Scroll reveals.
- Sidebar.
- Dashboard.
- Mobile responsiveness.

## Test functionality

- Real links.
- Authentication.
- Logout.
- Protected routes.
- Media uploads.
- Photo approval.
- Public photo visibility.
- Biography drafts.
- Publication and unpublishing.
- Saving creator records.
- Quick Add.
- Search.
- Calendar.
- Goals.
- Equipment calculations.

## Reporting

Separate:
- Implemented.
- Visually inspected.
- Functionally tested.
- Incomplete.
- Blocked.

Do not claim visual testing if preview was not opened.

Do not claim publishing works without verifying the result.

---

# 49. FINAL EXPERIENCE

## When someone opens J4denTV publicly

They should see a beautiful, animated, luxurious personal website.

The first impression should be:
- Authentic photography.
- Striking J4DENTV typography.
- Smooth motion.
- Elegant navigation.
- Sophisticated hover interactions.
- Genuine biographical writing.

As they explore, they learn about Jaden, his gaming background, early streaming experiences, creative development and content.

The site should feel rich and personal, not inflated or artificial.

## When Jaden enters the Private HQ

The experience should feel like entering the private workspace behind the same brand.

The colours match.

The typography matches.

The motion matches.

The quality matches.

But now the interface is optimised for productivity.

Every action feels responsive.

Every panel feels carefully designed.

Every hover feels satisfying.

Everything is organised.

Everything useful actually works.

The Private HQ should feel like a premium macOS creative application, not a generic admin dashboard.

## NON-NEGOTIABLE FINAL PRINCIPLE

**ONE BRAND. ONE DESIGN LANGUAGE. ONE MOTION SYSTEM. TWO CONNECTED EXPERIENCES.**

PUBLIC:
Cinematic, personal, photographic, biographical.

PRIVATE:
Elegant, productive, interactive, luxurious.

Both must feel expensive.

Both must feel smooth.

Both must feel designed specifically for J4denTV.

**DO NOT CONFUSE MINIMALISM WITH PLAINNESS.**

**DO NOT CONFUSE LUXURY WITH EXCESSIVE GOLD.**

**DO NOT CONFUSE ANIMATION WITH GIMMICKS.**

**DO NOT CONFUSE A LARGE FEATURE LIST WITH A FINISHED APPLICATION.**

Build an original, beautiful, secure, working website and creator workspace.

Start with Phase 1 and the shared visual/motion system.

Open the preview, inspect the actual result and fix what looks wrong before progressing.

**THIS SHOULD FEEL LIKE J4DENTV'S OWN PREMIUM DIGITAL WORLD — PUBLIC AND PRIVATE.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0e9aab10-83b7-4fc1-8139-f78541be81a7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
