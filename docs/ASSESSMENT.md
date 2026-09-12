# Design assessment: erikdellenback.com

Written 12 September 2026 (updated the same day) for Wyatt, from a review of the hi-fi design handoff, Erik's own content notes and CV, all 23 supplied photos, and the seven reference sites Wyatt likes (getcoleman.com, timtebow.com, bobgoff.com, jonacuff.com, linmanuel.com, jennieallen.com, brenebrown.com). Four reviewers looked at the design through different lenses (content, visual design, audience, technical) and this document is the merged, de-duplicated result with the weak recommendations dropped.

## The short version

The design is good and it is in the right family. Of the seven sites, it genuinely resembles Jennie Allen and Brene Brown: warm off-white ground, a serif for headings and a sans for everything else, natural-light photography, one continuous page. It is quieter than all seven. Six of the seven are sales funnels (books, courses, newsletter forms, two buttons per band) and the reviewers consistently rated that as those sites' weakness, not their strength. Erik has nothing to sell on his homepage, so the decision to have no buttons, no counters and no newsletter is an advantage. Keep it.

Where the design falls short is not restraint but four specific things:

1. **The hero photo is not hero-grade.** It is a 1200 by 630 news crop in which Erik is one of four people. On a laptop it is upscaled up to three times and goes soft. Wyatt's looping video will replace it, which solves the problem; the still that remains under the video should be the video's first frame.
2. **Visitors with a job have no route.** An event organizer, a consulting prospect, a church, a reporter: each arrives, reads a nice portrait, and leaves with only a 12px email link. Erik's own menu list (About, Crazy Experiences, Speaking, Consulting, Podcast, Contact) fixes this, and it is now built.
3. **The page leads with famous names before Erik says a word.** The first thing after the hero is the President, then the Governor, then Charlie Kirk. Five of seven captions begin "With [famous name]". That reads as access rather than gratitude and fights his own thesis, "God uses unqualified people". None of the seven reference sites proves itself by association; Jennie shows crowds, Brene shows family, Acuff shows corporate logos (rated the weakest device in the set). The photos should stay; the framing should change.
4. **The content is thinner than the CV.** Seven work rows against fourteen organizations; no mention that he is an ordained pastor, that he started Night to Shine, or that Mercy Seeds Consulting exists; no dates, so a four-month role sits next to an eleven-year one with equal weight.

Everything else is small and most of it is already fixed in this repo (see "Already applied" at the end).

## What the seven sites have in common, and where Erik's design sits

- Full-bleed photo of the person at the top with the name over it (6 of 7). Erik matches.
- A wordmark top-left and a horizontal nav, usually with a button in it (5 of 7). Coleman uses only a hamburger. Erik now uses the hamburger, which Erik chose after seeing Coleman's site. That is a legitimate pattern and the one that keeps the hero clean.
- Long pages built from alternating colour bands (5 of 7). Erik stays on one ground like Brene. Fine, and calmer.
- Buttons, products, newsletter forms everywhere (6 of 7). Erik has none. Keep.
- Serif display plus sans body on the author sites (Brene, Jennie, Goff). Erik matches. Heading weight is lighter than every reference; the visual reviewer suggested Newsreader 400 for the hero name and for h2 under 640px, where 300 goes thin.
- Candid, warm photography with a dark scrim only where text sits on the photo. Erik matches Tebow and Jennie here.
- Hamburger on mobile (6 of 7). Erik now matches.

Net: the design is quieter, less commercial and more editorial than six of the seven. Only Coleman is more minimal, and Coleman is a joke-portfolio in a different register. That is the right place to be for a site whose stated purpose is to "honor and glorify the Lord".

## Keep

- **Palette and type.** The off-white ground, the ink colour, the one accent, hairline rules, Newsreader plus Karla. Every serif reference pays for its look with more fonts; this needs two.
- **No buttons, counters, carousels, newsletter or products.** The single biggest difference from the reference set, and a choice, not an omission.
- **Erik's four paragraphs, verbatim.** The only copy on the page he actually wrote, and it contains the two lines people will quote back to him. A third-person rewrite would read like Lin-Manuel's awards bio, the weakest bio in the set.
- **The captioned photo grid with mixed aspect ratios.** The most editorial device on any of the eight sites. Nobody in the reference set captions their photos or mixes ratios. Keep its position near the top; change its framing (below).
- **Sentence headings** ("The rooms I've been in.", "The rest of it.", "What I've done."). They carry a voice; the all-caps labels on Tebow and Miranda read as marketing.
- **The work list as plain text rows**, no logos. Cheapest thing on the page to expand and maintain.
- **The still page.** No parallax, no fade-ups, no rotating words. Goff's animation was called busy and dated by the reviewers.
- **Footer as one italic line plus an email.** Brene's repeated sign-off is the best brand line in the set and it works because it stands alone.
- **The hidden Listen section**, shipped off until real clips exist. Placeholder media on a live site is the failure the reviewers documented on linmanuel.com.
- **Plain HTML and CSS, no framework.** One page edited by one developer and later by non-developers. Astro or Next would earn their build step only when there are many pages sharing a header; three pages do not need it.

## Change (in priority order)

| Priority | What | Now | Proposed | Why |
|---|---|---|---|---|
| High | Hero | 1200px news crop, four people, 38% scrim | Wyatt's video, with its first frame as the still. Until the video lands, crop the boardroom photo (IMG_1883, 9504px, sharp) from the left two-thirds so Erik is the largest face and the name lands over the wall | The current file cannot fill a laptop screen without softening, and Erik is not the subject |
| High | Grid captions | "With President Trump, the Oval Office" style, five of seven start with a famous name | Event first, person only when the photo does not make it obvious, and a year: "The Oval Office, 2025", "Praying at the inauguration, Tallahassee, 2023", "The hospital we built in Davao City, 2016" | Turns name-dropping into testimony; this is also what Erik meant by "Photos with hover text" |
| High | One line of Erik between the hero and the grid | Nothing; the Oval Office is the first thing after his name | One Newsreader italic line under "The rooms I've been in.", in his words, on the theme "I wasn't qualified for a single one of them" | Reframes the whole grid in one sentence; must be his wording, not ours |
| High | Charlie Kirk caption | "On stage with Charlie Kirk, Florida Family Voice", written before September 2025 | Erik chooses. Recommended: "Charlie Kirk at Florida Family Voice, 2025". Do not ship the designer's default without his decision | The caption now carries weight it did not carry when it was written |
| High | Work list | 7 rows, no dates, Hope Florida (a four-month role) as row two | Ten rows max with a year range in the muted colour: add Mercy Seeds Consulting (Founder, 2017 to present), The Church of Eleven22 (Ordained Pastor, 2025 to present), Fellowship Adventures (Chairman); fold Hope Florida into the Governor's office row; write "Founding President; started Night to Shine" on the Tebow row; rename the heading "What I do." or "The work." | The CV marks five roles as present; the page shows one. Night to Shine, the most recognizable thing he has done, is not on the visible page |
| High | Designer-written lines need Erik's sign-off | "Husband. Father. Follower of Jesus.", "God is the paper. The rest is ink.", the three section headings | Erik approves or rewrites them before launch. His own version of the footer line is "Faith is not #1 on the list, but rather the paper the list is written on" | The handoff marks all copy "final, verbatim", which is true of his paragraphs and not of these |
| High | Family | Hero says Husband and Father; no family photo or sentence anywhere; the design's own hero slot was named "hero-family" | A family photo (hero video or Story portrait) and one closing sentence in the Story, if Erik is willing | Acuff, Brene and Goff all end their bio on family; the tagline makes a promise the page never keeps |
| Medium | Grid slots 3 and 6 | Charlie Kirk (a 3:2 photo of two seated men) squeezed into a square; the CURE photo (932px) stretched across a 3-column slot | Swap them: Kirk takes the 3-column 4:3 slot, CURE takes a square | Keeps both men in the Kirk frame and stops upscaling the CURE file |
| Medium | Grid mix | Four of seven photos are political (Trump, DeSantis twice, Kirk) | Once a Night to Shine, CURE patient or Haiti photo exists, it takes a large slot and one DeSantis photo goes to the Experiences gallery | The Story says "the vulnerable and hurting" and the grid never shows them |
| Medium | Hero name size | Newsreader 300 at 18 to 26px | Newsreader 400 at roughly 34 to 64px, tighter tracking; tagline 14px | Every reference sets the name as a display headline; Jennie, the closest match, is around 59px. Understated is fine; invisible is not. Wyatt's call |
| Medium | Story ending | Ends on "that is my story"; no present tense, no invitation | Ask Erik for one closing paragraph: what he does now, and an open door | It is his voice; we do not write it |
| Medium | Public email | Personal Gmail in the footer, the menu and both draft pages | erik@erikdellenback.com forwarded to Gmail (GoDaddy or Cloudflare do this free) | The CEO of a statewide organization publishing a personal Gmail to every scraper is avoidable |
| Low | Footer routes | Email only | Add Speaking, Consulting and Media as plain uppercase text links (mailto with a prefilled subject), same row | Gives every visitor with a job a next step without a button |
| Low | Listen section position | Between People and Story | After Story, before Work | Proof, voice, clips, record |

## Add

- **Crazy Experiences gallery** (Erik's own idea, and now a menu item pointing at the grid). The page he actually described: Bowden's last game, the ACC Championship, FSU v Alabama, Night to Shine, CURE Hospital, Haiti, sailfish at Casa Vieja, Fellowship Adventures, the food truck. Build it as its own page when the photos exist; several of the supplied files are too small (see photo plan).
- **Speaking page.** Drafted in this repo from the CV and his key phrases; Erik edits. Five of seven reference sites have one. Jon Acuff's two-register pattern is the one to copy: a first-person paragraph, then a clearly labeled third-person bio event planners can paste into a program.
- **Consulting page.** Drafted from the Mercy Seeds entry in the CV. Hat n Hoodie is a separate consulting company Erik is starting and is deliberately kept off this site.
- **A downloadable headshot** on the Speaking page, once a current one exists. Every event and press mention starts with "can you send a bio and photo".
- **Night to Shine, by name, on the homepage.** In the Tebow work row at minimum; ideally a photo.
- **Dates on the work list** (above).
- **Real clips for Listen** from Erik's own list: "Tim and Erik", "Spoken Word", the Night to Shine video. Self-host the thumbnails; link out to YouTube rather than embedding iframes, which cost half a megabyte each before anyone presses play.
- **A domain email address** (above).
- **Cookieless analytics** (Cloudflare Web Analytics or GoatCounter) if Erik wants to know whether anyone visits. No consent banner needed. Not Google Analytics.

## Remove or defer

- **Newsletter and inquiry forms** from the launch scope. Nothing to send, no backend, and the email covers realistic volume. Revisit only if inbound proves it.
- **"Bill Belichik of Non-Profit"** from any copy. Misspelled (Belichick), and a self-bestowed superlative on a site whose thesis is "I was never qualified".
- **Hope Florida as its own work row** (fold it into the Governor's office row with dates).
- **The soft DeSantis podium still** (a 1284px screenshot from a phone video, with the Governor's young child in frame) once a better photo exists. Until then it is cropped to sit above the child.
- **Placeholder clip titles.** Already replaced with neutral placeholders; the designer's versions were phrased as things Erik said.
- **Dead social links.** Already commented out until real URLs exist.

## Decisions already made, and what they change

**Hamburger menu.** Erik saw Coleman's site and wants a hamburger with his six items. Built: a "Menu" button top-right (three thin lines, no icon font), a panel that slides in from the right on desktop and fills the screen on a phone, the six items in Newsreader, and the email and city at the bottom the way Coleman's panel doubles as a contact card. The hero no longer carries the four-word nav. About and Contact point at the homepage sections; Crazy Experiences points at the grid until a gallery page exists; Speaking and Consulting have draft pages; Podcast is hidden until there is one.

**Hero video.** Built to take two files: a 16:9 for desktops and a 9:16 for phones held upright. The page chooses by screen shape, never plays for visitors who asked their phone for reduced motion or data saving, and shows the still until the clip is actually playing, so a blocked autoplay (iOS Low Power Mode) leaves the photo in place. The README has the ffmpeg recipe and size targets. Guidance for the edit: no audio, no cuts faster than about four seconds, slow motion of a walking or environmental kind, colour close to the palette, and keep Erik's face out of the centre band where the name sits, or move the name.

## Photo plan

| Slot | File (original) | Caption to confirm with Erik | Note |
|---|---|---|---|
| Hero | Wyatt's video; interim: IMG_1883 cropped | none | IMG_1148 (current) is 1200px; ask the Governor's office photographer for the original if Erik wants it back |
| Grid 1 (large, 3:2) | Erik copy.jpg (Oval Office) | The Oval Office, 2025 | Only 3:2 asset over 2400px; keep until a service photo can take the big slot |
| Grid 2 (3:4) | IMG_6980 (podium prayer) | Praying at the inauguration, Tallahassee, 2023 | Soft video still; cropped above the child; ask for the source video |
| Grid 3 | Erik and Charlie.JPG | Charlie Kirk at Florida Family Voice, 2025 | Erik decides the caption; move to the 4:3 slot |
| Grid 4 (1:1) | Timmy and Erik.jpg | Tim Tebow Foundation, Jacksonville | 960px, right-sized for a square only |
| Grid 5 (1:1) | IMG_2269 (For Others board) | The For Others board with Chris Tomlin, Nashville | Cropped 13% from the left to remove a phone number on a whiteboard; confirm the other seven people are fine appearing |
| Grid 6 | Erik and Timmy CURE.jpg | The hospital we built in Davao City, 2016 | 932px; move to a square slot; ask for a larger original |
| Grid 7 (4:3) | IMG_1883 (boardroom) | Faith leaders with Governor DeSantis, Tallahassee | If it becomes the hero, give this slot to a Night to Shine or Haiti photo |
| Story portrait | IMG_7405 (python) | none | The only photo that shows the hat and the hoodie; fits the Story; a family portrait would fit better |
| Experiences gallery | Bowden High Res.jpg, Gov Scott Cropped.jpg, IMG_0520 (sailfish), IMG_3507 (boat), AA Food Truck.jpg, Oval Office Photo.jpg (prayer), thumb_IMG_7898 (Tebow office) | | Most are small or screenshots; ask for originals. Bowden is credentialed press photography, confirm rights |
| Do not use | Run The Race.jpg, He calls me daughter.jpeg, IMG_1886, IMG_7765 | | Two are low-res copyrighted posters; one is a duplicate crop; one is campaign signage shot into the sun |

Missing entirely: a current headshot, any family photo, Night to Shine, Haiti, Hope Florida, the ordination, a photo of Erik speaking from a stage facing an audience.

## Questions for Erik

1. Do you approve or want to rewrite: "Husband. Father. Follower of Jesus.", "God is the paper. The rest is ink.", and the three section headings?
2. Charlie Kirk: which caption, and is the photo staying on the homepage?
3. Are you taking speaking invitations through this site, from whom, and who fields them? Are Unqualified, Unsee, Tithing, The Lad and David's Anointing your talk titles?
4. Which social accounts exist? Send the URLs; the footer links are off until then.
5. A family photo and one family sentence for the end of the Story, if you are willing.
6. A year and one line for each grid photo; names of the people in the For Others and faith-leaders photos for alt text.
7. Do you have originals of the storm-walk photo, the CURE photo, a Night to Shine photo, a Haiti photo, and a current headshot? Can an FFV photographer shoot one?
8. Which email should be public: the Gmail, an FFV address, or erik@erikdellenback.com?
9. Is a podcast real or aspirational? Where do "Tim and Erik", "Spoken Word" and the Night to Shine video live?
10. Ordained Pastor (CV) or Pastor of Ministry Partnerships (your notes): which title?
11. Would you give Wyatt delegate access to the GoDaddy account so he can enter the DNS records for you?

## Launch plan

1. Done: the repo is at github.com/wyttmrgn/erikdellenback.com under Wyatt's account, Pages is enabled, and the preview at wyttmrgn.github.io/erikdellenback.com renders.
2. Erik owns the domain at GoDaddy; the simplest handoff is Delegate Access for Wyatt (README, step 3).
3. In GitHub account settings, verify erikdellenback.com with the TXT record. Then add the four A records, four AAAA records and the www CNAME at GoDaddy (README table). Set the custom domain in the repo, wait for the check, enforce HTTPS.
4. Before or right after: Erik's answers to the questions above, especially the hero, the captions and the designer-written lines.
5. Share the link in iMessage to check the preview card; view on a phone, a tablet and a large monitor.
6. Search Console: verify with the same TXT, submit the sitemap.

## Already applied in this repo

- Built the hamburger menu with Erik's six items, and the slide-in panel with contact details.
- Built the hero video handling with landscape and portrait sources, reduced-motion and data-saver respect, and a still-photo fallback.
- Drafted speaking.html and consulting.html from CV facts (Erik to edit).
- Darkened two colours so small text passes WCAG AA: work-list roles from #9a9187 (2.8:1) to #6f665f (5.0:1), captions and footer links from #7a716a (4.3:1) to #736a62 (4.7:1). Barely visible; revert in `css/site.css` if you disagree.
- Cropped the phone number off the whiteboard in the Chris Tomlin photo.
- Halved the weight of the story portrait (it was heavier than every other image combined) and removed 14 renditions nothing referenced; the images folder went from 12.7 MB to 6.3 MB.
- Cropped the podium photo above the child in frame.
- Commented out the three dead social links; replaced the designer's invented clip titles with neutral placeholders.
- Added a 404 page, a skip link that lands on main content, alt text that describes each photo, and social-card metadata with the roles in it.
- README: added IPv6 records, the domain-verification step, and the HTTPS caveat for the forwarded domains.

Not applied, waiting on Wyatt or Erik: hero image or video, caption rewrites, the intro line, work-list rows and dates, heading weight and hero name size, the family photo, the public email address, the swap of grid slots 3 and 6.
