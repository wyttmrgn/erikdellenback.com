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
| For Others | Founding board member, interim president | Ask the foundation |
| The Church of Eleven22 | Ordained pastor | Church communications team |
| Gator Bowl | Vice president, CMO | Gator Bowl Association (the current sponsor name changes; use the association mark) |
| ACC Football Championship | Founding director | Ask the ACC; they may prefer the conference mark |
| CarePortal | Statewide partner, conference speaker | CarePortal brand page |
| Fellowship Adventures | Chairman | Erik has the files |
| Mercy Seeds Consulting | Founder | Erik has the files |
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
