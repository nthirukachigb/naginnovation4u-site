# REPORT — naginnovation4u one page site

Built in `C:\fwai-starter\naginnovation4u-site`. Open `index.html` in a browser.
Files: `index.html`, `styles.css`, `script.js`, `images/`.

## Status per part

**Requirement 1 — ask before writing: DONE**
  evidence: no file was written before the answers. First message listed the images folder and the
  five details not held (name, WhatsApp number, email, booking link, why I started) and waited.

**Requirement 2 — images folder listed first: DONE**
  evidence: `Get-ChildItem images` printed 11 files. `shot-1.jpeg` is **0 bytes** and cannot be
  read (`Exception calling "FromFile": "Out of memory."`), so it is not referenced anywhere.
  Used: `logo.jpeg`, `logo-dark.jpeg`, `profile.jpeg`, `speaking.jpeg`, `working.jpeg`,
  `shot-2.jpeg`, `shot-3.jpeg`, `shot-6.jpeg` as bands. `shot-4.jpeg` and `shot-5.jpeg` exist and
  are valid but were not needed; `shot-6.jpeg` and `shot-3.jpeg` are real shop scenes and read
  better as bands.

**Requirement 3 — exact business name: DONE**
  evidence: `grep -i naginnovation` on `index.html` returned 16 matches, every one spelled
  `naginnovation4u` (title line 6, header line 26, footer line 227, WhatsApp text lines 208/213).

**Requirement 4 — first screen: DONE**
  evidence: headline, one line, booking button and the speaking photo. Desktop hero photo is
  864x828 in a 1440x900 viewport; phone photo is 390x523 = `"ratio":"0.62"` of an 844 viewport.

**Requirement 5 — the problem in the client's own words: DONE**
  evidence: five lines, verbatim from the brief, in `#problem`.

**Requirement 6 — three service cards: DONE, PRICING REMOVED AT THE MEMBER'S REQUEST**
  evidence: `#services` has three cards. The brief's price `Rs 25,000 a project` was built and
  shown, then on 19 Sep the member instructed: *"Don't give any pricings in the website, just ask
  people to book a discovery call with me."* The price panel was replaced with a Peacock Blue
  `#0B6E99` panel reading `Start with a discovery call.` plus a `Book a 20 minute call` button.
  The section heading changed from `Three services, one price.` to `Three services, one call.`
  `grep -i "Rs |25,000"` on `index.html` now returns nothing. Card titles are still the largest
  text in each card; icons are 28px Peacock Blue inline SVG.

**Requirement 7 — how it works, three steps: DONE**
  evidence: `#how` holds the three given lines as steps one, two and three.

**Requirement 8 — who I am: DONE**
  evidence: `#about` shows `Nagaraju Thirukachi` with a 72px round `profile.jpeg` beside it, the
  four ABOUT lines in the member's own voice, and `working.jpeg` at 34% column width.
  The `[WHY I STARTED]` slot was removed on 19 Sep at the member's instruction; `grep -i
  "WHY I STARTED"` on `index.html` returns nothing.

**Requirement 9 — contact, last: DONE**
  evidence: `#contact` is the last section before the footer. Booking button reads
  `Book a 20 minute call` and points at
  `https://cal.com/nagaraju-thirukachi/20-min-ai-business-discovery-call-with-nag` (the member's
  typed link, not the one in the original brief). WhatsApp is second, email third.

**Requirement 10 — every contact link is real: DONE**
  evidence: `node verify.js` printed the links, including
  `https://wa.me/918978967171?text=Hi%20naginnovation4u...` and
  `mailto:nagaraju.thirukachi@gmail.com?subject=Enquiry%20about%20a%20one%20page%20catalogue%20-%20naginnovation4u`.
  No `BOOKING_LINK_GOES_HERE` placeholder was needed.

**LOOK — pictures, colour, type, space, icons, shape, phone: DONE**
  evidence: `node shoot.js` printed `PHONE_OVERFLOW []` (nothing scrolls sideways) and the
  rendered section screenshots were reviewed. Colours used, with hex: Warm Cream `#FDF6EC`,
  Charcoal Ink `#1C1C1E`, Saffron Flame `#E85D04` (buttons, one headline phrase, thin rules, step
  numbers, 44px), Peacock Blue `#0B6E99` (labels, quiet lines, one full panel). Fonts:
  Space Grotesk (headlines) and Inter (body) via one Google Fonts link tag.

**Missing-picture rule: DONE**
  evidence: `node debug.js` with `working.jpeg` renamed printed
  `DIAG {"imgClass":"is-broken","figClass":"about-media is-empty","figDisplay":"none","gridColumns":"1140px","sectionClass":"section about media-missing"}`
  — the picture is hidden, the heading and words stay, the layout drops to one column. Band
  sections with no picture are removed entirely. Restored after the test.

**Screenshot review: DONE**
  evidence: rendered at 1440x900 and 390x844 with headless Chrome and looked at every section.

## What broke and how I fixed it

1. **Phone header collided.** The 390px screenshot showed `Book a 20 minute call` wrapping to two
   lines and overlapping the `naginnovation4u` wordmark. Fixed: header button shortened to
   `Book a call`, `white-space: nowrap` on all buttons, smaller wordmark with ellipsis on small
   screens. Re-rendered and confirmed.
2. **Phone hero photo was 58% of the first screen**, under the required 60%. Fixed: `58svh` ->
   `62svh` and hid the secondary hero button on phones. Re-measured `"ratio":"0.62"`.
3. **Missing-picture fallback did not collapse the About layout.** The class was added to the
   `<section>` but the CSS rule targeted `.about-grid`. Fixed to `.about.media-missing .about-grid`.
   Re-measured `gridColumns":"1140px"`, one column.
4. **Vercel tried to build the static site with `next build`.** The first deploy failed with
   `Error: No Next.js version detected. Make sure your package.json has "next"...` — the Vercel
   project's Framework Preset was Next.js, and this repo has no `package.json`. Fixed by adding
   `vercel.json` with `"framework": null`. Vercel's schema says of `framework`: *"When `null` is
   used no framework is selected"*, and Vercel's docs say *"To select 'Other' as the Framework
   Preset, use `null`"*. Pushed in commit `f8ecbb1..` follow-up. **UNVERIFIED:** I have no Vercel
   access, so I could not watch the rebuild; the member's next deploy log is the proof.

## Claims ledger

| Claim | Proof |
|---|---|
| Page renders, no sideways scroll on a phone | `node shoot.js` -> `PHONE {"scrollWidth":390,"clientWidth":390,...}` and `PHONE_OVERFLOW []` |
| Hero photo is 62% of the phone first screen | `node shoot.js` -> `"ratio":"0.62"` |
| Every referenced image file exists | `node verify.js` -> `MISSING_FILES []` |
| Booking, WhatsApp and email links are the member's real details | `node verify.js` -> LINKS list |
| A missing picture closes up its space | `node debug.js` -> DIAG line above |
| Business name spelled `naginnovation4u` everywhere | `grep -i naginnovation` -> 16 matches, none misspelled |
| GitHub repository created and pushed | `git ls-remote --heads origin` -> `f8ecbb152a8fa47cfd92a6d165f6c144a38afa4e refs/heads/master`; `gh repo view` -> `{"name":"naginnovation4u-site","url":"https://github.com/nthirukachigb/naginnovation4u-site","visibility":"PUBLIC"}`; raw `index.html` fetched from `raw.githubusercontent.com/nthirukachigb/naginnovation4u-site/master/index.html` and it returned the real page |
| The site is deployed and live on Vercel | **UNVERIFIED** — not done; the member imports the repo next |

## What I would tell the next person

- `shot-1.jpeg` is a 0-byte file. Replace it or delete it; nothing references it.
- No service pricing is published. The page asks for a discovery call instead. Do not re-add a
  price without the member asking.
- The three picture bands (`shot-2`, `shot-6`, `shot-3`) are full-width sections with the square
  shot centred at 720px so its built-in headline stays readable. To use `shot-4` or `shot-5`,
  copy one into `images/` and add another `.band` section.
- Every contact detail is a plain link. There is no form and no backend, as the brief requires.
- To deploy: import this repository on Vercel as a static site. No build step, no environment
  variables.
