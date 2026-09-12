# Handoff: Erik Dellenback Personal Homepage

## Overview
Single-page personal website homepage for Erik Dellenback, a Florida nonprofit and public policy leader. Warm, quiet, editorial. Serif headlines, sans body, off-white background, generous whitespace. No stat counters, no testimonial sliders, no gradients, no icons, no buttons. Style references: bobgoff.com, jennieallen.com.

Sections in order: Hero, People (photo grid), Listen (clips, optional), Story, Work, Footer.

## About the Design Files
The files in this bundle are **design references created in HTML**. They are prototypes showing the intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (Next.js, Astro, plain HTML/CSS, etc.) using its established patterns. If no codebase exists yet, a static site (Astro or Next.js static export) is the right fit: one page, no backend, image optimization matters.

`Erik Dellenback Homepage.dc.html` uses a proprietary template runtime (`{{ }}` holes, `<sc-for>`, `<sc-if>`, `<image-slot>`). Read it for exact inline styles and copy; do not attempt to run or port the runtime. `<image-slot>` is just a drag-and-drop image placeholder in the design tool; in production it is a plain `<img>` (or the framework's image component) with `object-fit: cover`.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final. Recreate as shown. Copy must be reproduced verbatim, and no em dashes anywhere.

## Global
- Page background: `#f6f2ea`
- Body text color: `#2a2621`
- Fonts (Google Fonts): **Newsreader** (serif; weights 300 and 400, italic 300) for all headings and the footer line; **Karla** (sans; weights 300, 400, 500) for everything else. Fallbacks: `Georgia, serif` and `system-ui, sans-serif`.
- Links: color inherits (`#2a2621` default), no underline, hover color `#8a7a62`.
- `html { scroll-behavior: smooth }`. Nav links are anchor jumps to section ids.
- `-webkit-font-smoothing: antialiased`.
- Content sections share: `max-width: 1280px; margin: 0 auto; padding-inline: clamp(20px, 6vw, 96px)`.
- Section heading (h2) style, shared: Newsreader 300, `font-size: clamp(30px, 3.6vw, 48px)`, `line-height: 1.1`, `letter-spacing: -0.01em`, color `#2a2621`, `margin-bottom: clamp(28px, 4vw, 56px)`.
- Caption style, shared: Karla 12px, `letter-spacing: 0.02em`, color `#7a716a`.
- No border radius anywhere. No shadows anywhere.

## Screens / Views

### 1. Hero (`#top`)
- Full viewport: `height: 100vh; min-height: 560px; overflow: hidden; background: #2b2825`.
- Background image fills the section (`position: absolute; inset: 0; object-fit: cover`). Asset: `images/hero-desantis-walk.webp`.
- Optional background video: if a `heroVideoSrc` URL is provided, render `<video autoplay muted loop playsinline>` with `object-fit: cover` over the image (image acts as poster). Currently empty.
- Overlay above image/video: `background: rgba(20,17,14,0.38)`, click-through.
- Nav: absolutely positioned top, full width, `display: flex; justify-content: center; gap: clamp(20px, 4vw, 44px); padding: 28px 24px`. Links: Karla 400, 12px, `letter-spacing: 0.18em`, uppercase, color `#f3eee5`. Items, in order: Story (`#story`), People (`#people`), Work (`#work`), Contact (`#contact`). No logo, no button, no hamburger (the four words fit on mobile at this size).
- Centered text block (absolute, centered both axes, `padding: 0 24px`, text-align center):
  - `h1` "Erik Dellenback": Newsreader 300, `font-size: clamp(18px, 2.2vw, 26px)`, `letter-spacing: 0.32em`, uppercase, color `#fbf8f2`. Intentionally small and understated.
  - Tagline "Husband. Father. Follower of Jesus.": Karla, 13px, `letter-spacing: 0.06em`, color `#e9e3d8`, `margin-top: 14px`.

### 2. People (`#people`)
- Padding: `clamp(72px, 10vw, 140px)` top, `clamp(40px, 5vw, 72px)` bottom.
- Heading: "The rooms I've been in."
- Grid: `display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: clamp(10px, 1.6vw, 22px)`. Seven `<figure>` items, each `display: flex; flex-direction: column; gap: 10px`, image wrapper with fixed `aspect-ratio`, image `object-fit: cover`, caption below.

| # | Span | Aspect | Asset | Caption |
|---|------|--------|-------|---------|
| 1 | 4 cols | 3/2 | images/trump-oval-office.jpg | With President Trump, the Oval Office |
| 2 | 2 cols | 3/4 | images/desantis-podium.jpg | Praying with Governor and First Lady DeSantis |
| 3 | 2 cols | 1/1 | images/charlie-kirk-stage.jpg | On stage with Charlie Kirk, Florida Family Voice |
| 4 | 2 cols | 1/1 | images/tebow-foundation.jpg | With Tim Tebow, Tim Tebow Foundation |
| 5 | 2 cols | 1/1 | images/chris-tomlin.jpg | With Chris Tomlin and the For Others board |
| 6 | 3 cols | 4/3 | images/tebow-cure.jpg | Tebow CURE Hospital, Davao City |
| 7 | 3 cols | 4/3 | images/desantis-meeting.jpg | With Governor DeSantis and Florida faith leaders |

- Responsive: the prototype keeps 6 columns at all widths (spans shrink). Recommended production behavior below 640px: switch to `repeat(2, 1fr)` with items 1, 6, 7 spanning 2 and items 2 to 5 spanning 1, keeping aspect ratios.

### 3. Listen (`#listen`) — optional, toggle `showClips`
- Padding: `clamp(48px, 6vw, 96px)` vertical.
- Heading: "A few things I've said out loud."
- Grid: `repeat(auto-fit, minmax(260px, 1fr)); gap: clamp(16px, 2.4vw, 32px)`.
- Each clip is one `<a>` (whole card clickable), `display: flex; flex-direction: column; gap: 12px`:
  - Thumbnail wrapper: `aspect-ratio: 16/9; background: #2b2825; position: relative`, image cover.
  - "Play" label, bottom-left inside the thumbnail: `left: 14px; bottom: 12px`, Karla 11px, `letter-spacing: 0.16em`, uppercase, color `#f3eee5`, background `rgba(20,17,14,0.55)`, `padding: 6px 10px`. Text, not an icon.
  - Title: Newsreader 400, 19px, `line-height: 1.3`, color `#2a2621`.
  - Meta: caption style (12px, `#7a716a`), e.g. "Podcast · 4 min".
- Current data is placeholder (titles, hrefs `#`, no thumbnails). Real clip links, titles, and thumbnails are pending from the client. Clicking should open the clip (external link or inline player, developer's choice).

### 4. Story (`#story`)
- Padding: `clamp(48px, 6vw, 96px)` vertical.
- Two columns: `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(32px, 5vw, 80px); align-items: start`. Stacks to one column under ~660px (photo first, then text).
- Left: image wrapper `aspect-ratio: 3/4; max-width: 520px`, image cover. Asset: `images/erik-python.jpg`.
- Right: `max-width: 520px`. Heading "The rest of it." (`margin-bottom: 28px`). Paragraphs: Karla 16px, `line-height: 1.75`, color `#3d3832`, `gap: 18px` between paragraphs, `text-wrap: pretty`. Four paragraphs, verbatim:

> Hi, my name is Erik and as you check out my site, it is my hope and prayer that these words and pages both honor and glorify the Lord!

> I've had a rather unique career with my last 25 years being spent in the business of football or next to Tim Tebow, Chris Tomlin and Governor Ron DeSantis, respectively. I want to share a little bit about those experiences and there are two things that I hope you can feel as you check it out.

> First, God uses unqualified people. I don't think I've ever been qualified for a single role that I have done, but God is faithful and will take simple acts of obedience to get HIS work done.

> Secondly, I was in Haiti years ago when a woman said to me, "you'll never unsee what you've seen today", and she was right, but more importantly, those words have become an anthem of my life. I believe each of us see, hear or experience moments, especially around the vulnerable and hurting, that never leave our mind and heart. Those moments will change the trajectory of my life and that is my story.

### 5. Work (`#work`)
- Padding: `clamp(48px, 6vw, 96px)` top, `clamp(72px, 10vw, 140px)` bottom.
- Container `max-width: 520px`, left-aligned. Heading "What I've done." (`margin-bottom: 24px`).
- Unstyled `<ul>`, each `<li>`: `display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid #e4ddd0`, Karla 14px. Organization on the left in `#5e564e`; role on the right in `#9a9187`, right-aligned.

| Organization | Role |
|---|---|
| Florida Family Voice | Chief Executive Officer |
| Hope Florida | Executive Director |
| Executive Office of the Governor | Florida's first Liaison for Faith and Community |
| For Others | Founding Board Member, Interim President |
| Tim Tebow Foundation | Founding President, Executive Director |
| Gator Bowl Association | Vice President, Chief Marketing Officer |
| Run the Race, He Calls Me Daughter | Executive Producer |

### 6. Footer (`#contact`)
- `border-top: 1px solid #e4ddd0; padding: clamp(56px, 7vw, 96px) 24px; text-align: center`.
- Line: "God is the paper. The rest is ink." Newsreader italic 300, `font-size: clamp(22px, 2.6vw, 32px)`, `line-height: 1.3`, color `#2a2621`.
- Links row: `margin-top: 28px; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 28px`. Karla 12px, `letter-spacing: 0.14em`, uppercase, color `#7a716a`. Items: `erikdellenback@gmail.com` (mailto), Instagram, X, LinkedIn. Social hrefs are placeholders (`#`) pending URLs.

## Interactions & Behavior
- Nav and footer anchors: smooth scroll to section ids.
- Link hover: color to `#8a7a62`, no transition specified (a 150ms color transition is fine).
- Hero video: autoplay, muted, loop, playsinline; fall back to the still image when no source or on autoplay failure.
- Clip cards: whole card is a link; no hover effect beyond the text color change.
- No other animation. Keep it still.

## State Management
None required. Two build-time flags mirror the prototype's tweaks:
- `heroVideoSrc: string` (empty = photo only)
- `showClips: boolean` (default true; hide the Listen section until real clips exist)
Clip and work lists are static data arrays.

## Design Tokens
Colors
- `#f6f2ea` page background
- `#2a2621` ink / headings
- `#3d3832` body paragraph text
- `#5e564e` work list organization
- `#7a716a` captions, footer links, muted
- `#9a9187` work list role
- `#8a7a62` link hover
- `#e4ddd0` hairline rules
- `#2b2825` dark media ground (hero, thumbnails)
- `#fbf8f2` hero name; `#f3eee5` hero nav / play label; `#e9e3d8` hero tagline
- `rgba(20,17,14,0.38)` hero overlay; `rgba(20,17,14,0.55)` play label ground

Typography
- Newsreader 300: h1 clamp(18,2.2vw,26) ls .32em uppercase; h2 clamp(30,3.6vw,48) lh 1.1 ls -.01em; footer italic clamp(22,2.6vw,32) lh 1.3
- Newsreader 400: clip title 19px lh 1.3
- Karla: nav 12px ls .18em uppercase; tagline 13px ls .06em; body 16px lh 1.75; work list 14px; captions 12px ls .02em; footer links 12px ls .14em uppercase; play label 11px ls .16em uppercase

Spacing
- Section side padding clamp(20px,6vw,96px); content max 1280px; text column max 520px
- Section vertical padding clamp(48px,6vw,96px); first/last sections clamp(72px,10vw,140px)
- Grid gaps: people clamp(10px,1.6vw,22px); clips clamp(16px,2.4vw,32px); story clamp(32px,5vw,80px)
- Radius 0, shadows none, rules 1px `#e4ddd0`

## Assets
All in `images/` (client-supplied photos, copied from the client's uploads):
- hero-desantis-walk.webp (hero; 1200px wide, low-res for a full-bleed hero; request a higher-res original or swap to erik-ffv-podium.jpg)
- trump-oval-office.jpg, desantis-podium.jpg, charlie-kirk-stage.jpg, tebow-foundation.jpg, chris-tomlin.jpg, tebow-cure.jpg, desantis-meeting.jpg (People grid)
- erik-python.jpg (Story)
- erik-ffv-podium.jpg (alternate hero candidate, unused)
Serve responsive sizes and compress; several originals are 3000px+.

## Files
- `Erik Dellenback Homepage.dc.html` — the hi-fi design reference (inline styles are the source of truth for exact values)
- `Erik Dellenback Homepage Wireframes.dc.html` — earlier lo-fi explorations, for context only
- `images/` — photo assets listed above
