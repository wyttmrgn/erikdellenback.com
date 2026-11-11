# erikdellenback.com

Personal website for Erik Dellenback. Plain HTML, CSS and one small script. No build step. Hosted on GitHub Pages.

## What is here

```
index.html                 homepage (hero video, photo strip, listen, story and closing call, logo row, footer)
speaking.html              Speaking: Erik's invitation, his speaking topics, link to the form
consulting.html            Consulting: Hat n Hoodie Consulting, Erik's copy and logo, who it is for
about.html                 About: headshot, Erik's short bio, Some things Erik loves, his full bio (downloadable headshot)
career.html                Career and experiences: clients and employers, businesses owned, projects, boards; every homepage logo links here
moments.html               Impactful moments: the photo gallery, hover captions, click to enlarge
contact.html               the contact form (Formspree; see below). No email address appears anywhere on the site
404.html                   served by GitHub Pages for any missing URL
css/site.css               all styles; design tokens are the CSS variables at the top
js/site.js                 the menu panel, photo strip speed, reveal, hero video, contact form and the photo lightbox
images/                    responsive WebP + JPEG renditions from scripts/optimize-images.py
media/                     hero video files go here (see below); empty until then
favicon.svg                browser tab icon
.github/workflows/pages.yml publishes the website files only (see Deploying)
.nojekyll                  left from the old branch deploy; harmless
robots.txt, sitemap.xml    search engine basics
scripts/optimize-images.py turns a source photo into the sizes the pages expect
docs/ASSESSMENT.md         the original design review (many of its items have since been decided)
docs/palette.html          where the colours came from
docs/LOGOS.md              the logo row: what is in, what is out, and why
docs/PAGES.md              the layout plan for every page the menu points to
docs/FOOTAGE-PERMISSIONS.md where the hero video clips came from, and the permission emails
docs/FOR-ERIK.md           THE running list of everything still needed from Erik, written as a
                           copy-and-paste email. Update it whenever a question is answered or added.
```

Raw photo originals, Erik's CV and the original design handoff (it carries his email address) stay in the parent folder on Wyatt's machine. They are never committed.

## Editing

Each page is a plain HTML file with a banner comment above every section.

- **Menu** (Erik's list, 30 September 2026): About, Career, Impactful Moments, Speaking, Consulting, Contact. There is no Podcast item; the homepage Listen section (`#listen`) stays `hidden` until real clips exist. The same block appears near the top of every page; keep them identical when you change one. The Podcast item and the Listen section both carry `hidden` until real clips exist.
- **Photo strip**: the seven photos are listed twice in `index.html` (the copy keeps the loop seamless); edit both. Captions sit on the photo. It has no on-page stop: it only stops under the OS reduced-motion setting and while scrolled out of view (a known WCAG 2.2.2 gap accepted by the client).
- **Closing call** at the end of the story: the bold line and the gold underlined link are in the `.cta` block.
- **Copy**: edit the text directly. House rule: no em dashes anywhere.
- **Logo row** (`#served`): 19 logo files in `logos/`, shown in three groups (clients and employers, businesses owned, projects); see `docs/LOGOS.md` for what is in, what is out and how to add one.
- **Headings**: Karla bold caps via the `.h2` rule; write them in normal case in the HTML with no trailing period and CSS does the rest.
- **Footer social links**: they are commented out in the footer until Erik supplies real URLs.
- **Colours and type**: the variables at the top of `css/site.css`. The palette came from the hero video (see `docs/palette.html`): navy ground, gold accent, a white panel for the logos.

### Adding or swapping a photo

```bash
python scripts/optimize-images.py "path/to/New Photo.jpg"
```

That writes `images/new-photo-640.webp`, `-1024`, `-1600`, `-2200` (whichever fit the original) plus JPEG fallbacks, honouring EXIF rotation. Point a `<picture>` block at the new name and delete renditions nothing references. Needs Python 3 and Pillow (`pip install pillow`).

### Hero video

Two files, both silent, both looping, 8 to 12 seconds:

| File | Shape | Used when | Target |
|------|-------|-----------|--------|
| `media/hero-landscape.mp4` | 16:9, 1920 wide | desktops, tablets, phones held sideways | under 4 MB |
| `media/hero-portrait.mp4` | 9:16, 720 wide | phones held upright (viewport narrower than 4:5) | under 2 MB |

The script only loads a clip when the visitor has not asked for reduced motion or data saving, picks the file by screen shape, and shows it only once it is actually playing. If autoplay is blocked (iOS Low Power Mode) or a file is missing, the still photo stays. Make the still photo the first frame of the landscape clip so nothing jumps when the video starts.

Encoding with ffmpeg, from a source clip `hero-source.mov`:

```bash
ffmpeg -i hero-source.mov -an -vf "scale=1920:-2" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 28 -preset slow -movflags +faststart media/hero-landscape.mp4
```

```bash
ffmpeg -i hero-portrait-source.mov -an -vf "scale=720:-2" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 28 -preset slow -movflags +faststart media/hero-portrait.mp4
```

Keep the edit's own frame rate: do not add an `fps=` filter. Converting a 30 fps edit to 24 drops one frame in five and makes every shot stutter (this was the setting until 2 October 2026). The portrait file is encoded from its own vertical edit, not cropped from the landscape one. If a shot still stutters after encoding, the cause is in the edit: a clip shot at 24 fps (or captured at a lower rate) sitting on a 30 fps timeline repeats frames. Fix it in the editor, not here. Then export the first frame as the new still and run it through the image script:

```bash
ffmpeg -i media/hero-landscape.mp4 -frames:v 1 -q:v 2 hero-still.jpg
```

### Preview locally

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## The contact form (no email address on the site)

Erik asked that the site never show an email address. Every "email Erik" link goes to `contact.html`, whose form works the same way as every Morgan Web Co site (M6 Farms, Mr Auto): `js/site.js` sends it as JSON to the Morgan Web Co forms worker at `https://dashboard.morganwebco.com/api/forms`. The worker checks Cloudflare Turnstile, drops the `botcheck` honeypot, logs the lead in the Morgan Web Co dashboard, and emails it through Brevo. It finds the site by the posting domain, so the recipient lives in the worker's `sites` table (`notify_email`), not in this repo. Messages go to Erik's inbox with a hidden BCC to the studio inbox. Replying to the email replies to the visitor.

- **Turnstile:** the widget uses Morgan Web Co's shared sitekey. `erikdellenback.com` must be listed in that widget's hostnames in the Cloudflare dashboard, or the check fails on this site.
- **Subject:** "Website: Speaking", "Website: Consulting", "Website: Press" or "Website: Something else", following the topic the visitor picks. Links elsewhere on the site preselect it with `contact.html?topic=speaking`, `consulting` or `press`.
- **Spam rule:** the worker logs but never emails a message that contains a link. Speaking or press requests that paste an event link will show in the dashboard's leads but not in the inbox.
- **Without JavaScript** the form cannot send (Turnstile needs it) and says so.
- Set up on 10 November 2026: the site and Erik's dashboard login were added with `add-erikdellenback.sql` (morgan-web-co project, untracked), `erikdellenback.com` was added to the Turnstile widget, this form was deployed, and `notify_email` was set to Erik's Gmail. The worker answers this domain (checked with a preflight request that sends nothing) and has its Turnstile secret set. Wyatt's test on 10 November arrived as expected: "Website: Something else" from "Erik Dellenback Website" (forms@morganwebco.com), to Erik's Gmail with a BCC to the studio, with name, email, topic, message and form type.
- To change who receives messages, update `notify_email` for `erikdellenback.com` in the `sites` table of the `morgan-dashboard` database. The studio copy is automatic.

## Deploying

Every push to `main` runs `.github/workflows/pages.yml`, which copies only the website files (the HTML pages, `css`, `js`, `images`, `logos`, `media`, `favicon.svg`, `robots.txt`, `sitemap.xml`) and publishes them. It goes live in a minute or two. `README.md`, `docs/` and `scripts/` stay in the repo but are never served on erikdellenback.com. A new top-level file or folder the site needs must be added to the copy step, or it will not be published. Settings, Pages, Source is set to GitHub Actions (since 10 November 2026); the custom domain lives in that same settings page, and the `CNAME` file is ignored by this kind of deploy.

Ownership: Wyatt owns this GitHub repository and the GitHub Pages site. Erik owns the domain at GoDaddy. GitHub Pages ties the custom domain, its certificate and the `www` CNAME target to the account that owns the repository, so if the repo ever moves to another account, the domain verification and the `www` record have to be redone.

First-time setup, from this folder:

```bash
gh auth login
```

```bash
gh repo create erikdellenback.com --public --source=. --remote=origin --push
```

```bash
gh api -X POST repos/{owner}/erikdellenback.com/pages -f "source[branch]=main" -f "source[path]=/"
```

GitHub Pages on a free account requires the repository to be public, so everything here, notes included, is readable on github.com. Keep anything private in the parent folder.

## Pointing the domain at the site (GoDaddy)

Three of Erik's domains reach this site (confirmed by Erik on 6 November 2026). `erikdellenback.com` is the main address, `dellenback.com` forwards to it, and `hatnhoodie.com` forwards to the Consulting page. All three sit in Erik's GoDaddy account, and Wyatt has delegate access to it.

Status, 10 November 2026: live. erikdellenback.com points at GitHub Pages, and GitHub's certificate covers both erikdellenback.com and www.erikdellenback.com, with Enforce HTTPS on. dellenback.com and hatnhoodie.com forward over http and https, with and without www. All 13 addresses, including the old preview address, end on the right page. After any change to the custom domain, remove and re-add it in Settings, Pages so the certificate is requested again with both names.

### 1. Verify the domain with GitHub first

GitHub account Settings, Pages, "Add a domain", enter `erikdellenback.com`. GitHub shows a TXT record (`_github-pages-challenge-<user>`) to add in GoDaddy DNS. Add it, wait for GitHub to confirm. This stops anyone else from claiming the domain on Pages.

### 2. DNS records for erikdellenback.com

In GoDaddy DNS, delete the parked `A` records for `@` (`15.197.148.33` and `3.33.130.190` as of November 2026) and any existing forwarding, then add the records below. GitHub warns that a leftover `A` record can stop the HTTPS certificate from being issued.

| Type  | Name | Value                         | TTL |
|-------|------|-------------------------------|-----|
| A     | @    | 185.199.108.153               | 600 |
| A     | @    | 185.199.109.153               | 600 |
| A     | @    | 185.199.110.153               | 600 |
| A     | @    | 185.199.111.153               | 600 |
| AAAA  | @    | 2606:50c0:8000::153           | 600 |
| AAAA  | @    | 2606:50c0:8001::153           | 600 |
| AAAA  | @    | 2606:50c0:8002::153           | 600 |
| AAAA  | @    | 2606:50c0:8003::153           | 600 |
| CNAME | www  | `wyttmrgn.github.io` | 600 |

Then add the `CNAME` file to the repo root containing the single line `erikdellenback.com` and push (or set Settings, Pages, Custom domain `erikdellenback.com`, which creates the same file). When the DNS check passes (minutes to a day), tick **Enforce HTTPS**. `www.erikdellenback.com` redirects to the apex on its own.

Check from a terminal:

```bash
nslookup erikdellenback.com
```

### 3. Forward the other two domains

A GitHub Pages site takes one custom domain, and GitHub says to redirect any others at the domain provider. GoDaddy's forwarding is free. Both domains currently show a GoDaddy Website Builder "Launching Soon" page, and that connection may have to be removed first (Domain Settings, DNS, Remove next to the site).

For each domain: DNS, Forwarding, Add Forwarding, choose the root domain, Permanent (301), Forward only.

| Domain           | Forward to                                  |
|------------------|---------------------------------------------|
| `dellenback.com` | `https://erikdellenback.com`                |
| `hatnhoodie.com` | `https://erikdellenback.com/consulting.html` |

Then test `https://` and `https://www.` on both. A plain visit should land on the right page with no certificate warning. Both domains send a two-year HSTS header today, so a browser that has visited them cannot click past a certificate error if one appears during the switch. If GoDaddy's forwarding misbehaves, move those two domains to Cloudflare redirect rules, since morganwebco.com is already on Cloudflare.

## Launch checklist

1. Done: the repo lives at https://github.com/wyttmrgn/erikdellenback.com and Pages is enabled.
2. Content blockers: everything still open is in `docs/FOR-ERIK.md` (the form inbox, the family photo, a few one-line answers). Delegate access to GoDaddy arrived on 6 November 2026. Erik confirmed by phone on 2 October 2026 that the video clips are safe to use, so footage permission is not a blocker.
   The contact form works today on Formspree (Wyatt's account, delivering to Wyatt). It moves to the Morgan Web Co forms setup on launch day; see step 5.
3. Push, enable Pages, confirm `https://<user>.github.io/erikdellenback.com/` renders.
4. Done 10 November 2026: DNS, custom domain, certificate for both names, Enforce HTTPS, and both forwards. Still open: the TXT verification record.
5. Contact form: moved to the Morgan Web Co forms worker (see "The contact form" above). Afterwards, delete the old Formspree form `xdekvydd` in Wyatt's Formspree account.
6. Share the URL in iMessage or Slack to check the preview card. View at phone, tablet and desktop widths.
7. Google Search Console: verify with the same TXT record and submit `sitemap.xml`.
