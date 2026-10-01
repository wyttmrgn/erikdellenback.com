# Logo row: what to source

The homepage has a "Who I've served alongside" row under the work list. Each organization shows as a text name until its logo file is added. Swap a name for a logo by replacing its `<span>` in `index.html` with:

```html
<img class="logos__img" src="logos/tim-tebow-foundation.svg" alt="Tim Tebow Foundation" loading="lazy">
```

Put the files in a `logos/` folder at the repo root.

## What a usable file looks like

- Full colour, the organization's own current mark. No greyscale versions, no screenshots, no logos with a white box around them.
- SVG is best. If only a raster exists, a PNG at least 400 pixels tall on a transparent background.
- Horizontal (wordmark or mark plus wordmark). Tall square marks work too; the row scales everything to the same height.
- The row renders each logo at roughly 22 to 32 pixels tall, so fine detail will disappear. Pick the simplest official version.

## Where to get them

Most organizations keep a press or brand page with downloadable logos. If not, an email to their communications contact asking for "your logo for the website of a former [role]" almost always works. Using an organization's logo to state a true affiliation is normal practice, but a few of these are trademarks of companies (the restaurants, the film titles), so ask those rather than lifting them from the web.

| Organization | Erik's connection | Likely source |
|---|---|---|
| Florida Family Voice | CEO | Erik has the files |
| Tim Tebow Foundation | Founding president | Foundation press kit or a direct ask |
| Night to Shine | Started it | Same as above |
| Hope Florida | Executive director | State of Florida / Hope Florida site |
| Executive Office of the Governor | Faith and Community Liaison | State seal, or the Governor's office |
| For Others | Founding board member, interim CEO and President | Ask the foundation |
| The Church of Eleven22 | Ordained pastor | Church communications team |
| Gator Bowl | Vice president, CMO | Gator Bowl Association (the current sponsor name changes; use the association mark) |
| ACC Football Championship | Founding director | Ask the ACC; they may prefer the conference mark |
| CarePortal | Statewide partner, conference speaker | CarePortal brand page |
| Fellowship Adventures | Chairman | Erik has the files |
| Hat n Hoodie Consulting (was Mercy Seeds) | Founder | no logo received yet; would sit on the Consulting page opener |
| Run the Race | Executive producer | Distributor press kit |
| He Calls Me Daughter | Executive producer | Production company |
| Auntie Anne's | Franchisee | Franchise brand portal (ask) |
| Planet Smoothie | Franchisee | Franchise brand portal (ask) |
| Flagler College | Adjunct professor | College brand page |
| University of Florida | Alumnus, Florida Blue Key | UF brand page (alumni use is allowed with their guidelines) |

Twelve is the cap. The row renders logos at 30 to 88 pixels tall on the white panel. Eight of the eighteen names also appear in the work list directly below, so when logos arrive, favour the organizations the work list does not already name (Night to Shine, CarePortal, Eleven22, the ACC, the films, the university) and trim the rest.

## Status (13 September 2026)

Twelve logos are live in `logos/`, chosen for standing, recognizability and how they hold up small: Florida Family Voice, the State of Florida seal (for the Governor's office), Tim Tebow Foundation, Night to Shine, For Others, The Church of Eleven22, Gator Bowl, ACC Championship, University of Florida, Flagler College, Auntie Anne's, CarePortal.

Left out, with the files kept in the parent folder under "Logos (source and spares)":

- Hope Florida: the mark is plain, and the 2025 coverage of the foundation makes it a name to place deliberately, not by default. Erik's call.
- Fellowship Adventures: detailed brown badge that turns to mud at 40 pixels, and low recognition outside its circle.
- Planet Smoothie: loud pink; Auntie Anne's already tells the franchise chapter.
- Flagler College: added later the same day as the Flagler Saints shield, a proper transparent PNG.

Notes on the files in use: the Florida Family Voice mark is the transition version with the "formerly" tagline cropped off; For Others was supplied as a white SVG and is recoloured to the site's ink; CarePortal, Auntie Anne's and University of Florida came on white and had the white removed.

## Update (14 September 2026): Erik's own files

Erik sent 24 files. Three replaced what was live: the Governor's Faith and Community Initiative seal (the mark of the office he built) in place of the plain state seal; the Toyota Gator Bowl mark (the sponsor during his years there) in place of TaxSlayer; and For Others stays as our vector, recoloured to the site's navy. The rest were duplicates, lower quality, or JPEGs with a fake checkerboard baked in (Eagle Scout, the Flagler academic mark).

New material for the other pages, saved in the parent folder under "Logos (source and spares)/from Erik 2026-09-14": Joey's Custard, Planet Smoothie, the Fellowship Adventures mark, Florida Blue Key, illumiNations, the Tim Tebow Foundation Celebrity Golf Classic, and the two film posters (low resolution, thumbnail use only).

## Update (15 September 2026): the Consulting page

Three more files are now in `logos/`, processed the same way (alpha trimmed, 200 px tall): `planet-smoothie.png` (the wordmark cropped out of its white square), `joeys-custard.png`, and `fellowship-adventures.png`. The Consulting page's "What he's built, run and owned" row uses Planet Smoothie and Joey's Custard alongside five homepage logos. Fellowship Adventures is a board seat in the CV, not something he ran, so its file waits for the About page's boards row. The homepage row is unchanged at twelve; the Speaking page reuses five of them.

## Update (17 September 2026): About and In good company

`florida-blue-key.png` and `illuminations.png` are now in `logos/` for the About page's "Boards, honors and callings" row, alongside Eleven22 and Fellowship Adventures. `good-company.html` (now `career.html`) reuses the homepage logos on white tiles. The homepage logos are links into that page and lift slightly on hover with a one-line role underneath.

## Update (30 September 2026): Erik's logo list

Erik sent his Hat n Hoodie Consulting mark (black line art on transparent): `hat-n-hoodie.png` for white panels and `hat-n-hoodie-light.png` (recoloured to the site's text colour) for the navy opener on the Consulting page. He asked for a different ACC Championship logo, so the round blue badge was replaced by the Dr Pepper ACC Championship shield from his own files (white removed); the old badge is in the parent folder. The homepage row is now three groups in his order; the food truck and Haiti United have no logo and are text chips; the two film posters stand in as logos under Projects. illumiNations is not on his list and is no longer shown.

## Update (30 September 2026, later): logos for the Career entries that had none

Found on the organizations' own sites (sources in the parent folder, "Logos (source and spares)/found 2026-09-30/SOURCES.txt"): Haiti United (black mark, also on the homepage Projects row now), Florida Foundation for Correctional Excellence, the Florida Faith and Community Advisory Council mark, TD Autographs (a 100 px white mark from tdautographs.com, recoloured navy for the white tile), and an Eagle Scout badge (old clip art on white, white removed; Scouting America's official PNG sits behind a page a script cannot fetch, so a better one can be saved by hand). TD Speaking has no logo anywhere online and stays text only.

## Update (1 October 2026): Erik's sketch for the homepage row

Erik sent a hand-drawn layout for "In good company" and asked for the page to follow it: "Employers and clients" in two rows of five (the first ending at Eleven22), "Businesses owned" as four logos with no separate food truck entry, and "Projects" as Haiti United, the two films and Night to Shine. The food truck text chip is gone from the homepage; the truck is still mentioned in the Auntie Anne's entry on the Career page.
