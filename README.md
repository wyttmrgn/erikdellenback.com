# erikdellenback.com

Personal website for Erik Dellenback. Plain HTML, CSS and one small script. No build step. Hosted on GitHub Pages.

## What is here

```
index.html                 homepage (hero video, photo strip, listen, story and closing call, logo row, footer)
speaking.html              Speaking page (three talk lines still need Erik)
consulting.html            Consulting page (Mercy Seeds; copy drafted from Erik's CV, Erik to edit)
experiences.html           Crazy Experiences photo gallery (captions pending Erik)
404.html                   served by GitHub Pages for any missing URL
css/site.css               all styles; design tokens are the CSS variables at the top
js/site.js                 the menu panel and the hero video logic
images/                    responsive WebP + JPEG renditions from scripts/optimize-images.py
media/                     hero video files go here (see below); empty until then
favicon.svg                browser tab icon
.nojekyll                  tells GitHub Pages to serve files as-is
robots.txt, sitemap.xml    search engine basics
scripts/optimize-images.py turns a source photo into the sizes the pages expect
docs/design-handoff/       the original design files this site was built from
docs/ASSESSMENT.md         the original design review (many of its items have since been decided)
docs/palette.html          where the colours came from
docs/LOGOS.md              the logo row: what is in, what is out, and why
docs/PAGES.md              the layout plan for every page the menu points to
docs/FOOTAGE-PERMISSIONS.md where the hero video clips came from, and the permission emails
docs/FOR-ERIK.md           THE running list of everything still needed from Erik, written as a
                           copy-and-paste email. Update it whenever a question is answered or added.
```

Raw photo originals and Erik's CV stay in the parent folder on Wyatt's machine. They are never committed.

## Editing

Each page is a plain HTML file with a banner comment above every section.

- **Menu** (Erik's list): About, Crazy Experiences, Speaking, Consulting, Podcast, Contact. The same block appears near the top of every page; keep them identical when you change one. The Podcast item and the Listen section both carry `hidden` until real clips exist.
- **Photo strip**: the seven photos are listed twice in `index.html` (the copy keeps the loop seamless); edit both. Captions sit on the photo. It has no on-page stop: it only stops under the OS reduced-motion setting and while scrolled out of view (a known WCAG 2.2.2 gap accepted by the client).
- **Closing call** at the end of the story: the bold line and the gold underlined link are in the `.cta` block.
- **Copy**: edit the text directly. House rule: no em dashes anywhere.
- **Logo row** (`#served`): twelve logo files in `logos/`; see `docs/LOGOS.md` for what is in, what is out and how to add one.
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
ffmpeg -i hero-source.mov -t 12 -an -vf "scale=1920:-2,fps=24" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart media/hero-landscape.mp4
```

```bash
ffmpeg -i hero-source.mov -t 12 -an -vf "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=720:-2,fps=24" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 27 -preset slow -movflags +faststart media/hero-portrait.mp4
```

The portrait command crops the centre of the landscape frame. If Erik is not in the centre, change the third crop value (the x offset) or export a separate portrait edit from the editing software. Then export the first frame as the new still and run it through the image script:

```bash
ffmpeg -i media/hero-landscape.mp4 -frames:v 1 -q:v 2 hero-still.jpg
```

### Preview locally

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## Deploying

The site deploys from the `main` branch, root folder. Every push to `main` goes live in a minute or two.

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

GitHub Pages on a free account requires the repository to be public. Nothing private is in this repo.

## Pointing the domain at the site (GoDaddy)

`erikdellenback.com` is the only domain for this site. Erik's other domains are not part of it and nothing needs to be done with them.

Until DNS is in place the site is at https://wyttmrgn.github.io/erikdellenback.com/ for previews. Do not add the `CNAME` file before step 2 below is done: as soon as it exists, GitHub redirects the preview address to erikdellenback.com, which will not resolve yet.

### 1. Verify the domain with GitHub first

GitHub account Settings, Pages, "Add a domain", enter `erikdellenback.com`. GitHub shows a TXT record (`_github-pages-challenge-<user>`) to add in GoDaddy DNS. Add it, wait for GitHub to confirm. This stops anyone else from claiming the domain on Pages.

### 2. DNS records for erikdellenback.com

In GoDaddy DNS, delete the parked `A` record for `@` and any existing forwarding, then add:

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

### 3. Easiest way for Erik to hand this off

GoDaddy has Delegate Access (account Settings, Delegate Access, Invite). If Erik invites Wyatt with "Products and Domains" access, Wyatt can add the records above from his own login without ever seeing Erik's password, and Erik keeps ownership.

## Launch checklist

1. Done: the repo lives at https://github.com/wyttmrgn/erikdellenback.com and Pages is enabled.
2. Content blockers: everything still open is in `docs/FOR-ERIK.md` (the domain, the Charlie Kirk caption, Erik's sign-off on the designer-written lines, captions, photos).
3. Push, enable Pages, confirm `https://<user>.github.io/erikdellenback.com/` renders.
4. Verify the domain (TXT), add DNS, set the custom domain, wait, Enforce HTTPS.
5. Share the URL in iMessage or Slack to check the preview card. View at phone, tablet and desktop widths.
6. Google Search Console: verify with the same TXT record and submit `sitemap.xml`.
