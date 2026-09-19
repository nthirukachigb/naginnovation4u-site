# WORKLOG — naginnovation4u one page site

Each line: what I did -> the command I ran -> what it actually printed.

Listed the images folder -> `Get-ChildItem images` (and a System.Drawing size pass) -> 11 files; `shot-1.jpeg` is 0 bytes and unreadable, the other 10 are valid (`speaking.jpeg` 1376x768, `working.jpeg` 896x1200, the rest 1024x1024).

Read the three plan documents -> `Read PRD.md, TECH-STACK.md, IMPLEMENTATION-PLAN.md` -> they describe the catalogue product itself, not this marketing page; built against the brief instead.

Built the page -> wrote `index.html`, `styles.css`, `script.js` -> page renders with all six sections.

Rendered desktop and phone -> `node shoot.js` (puppeteer-core, Chrome) -> `DESKTOP {"scrollWidth":1440,"clientWidth":1440,"heroImg":{"w":864,"h":828},"vh":900}` / `PHONE {"scrollWidth":390,"clientWidth":390,"heroImg":{"w":390,"h":523},"heroSectionH":888,"vh":844,"ratio":"0.62"}` / `PHONE_OVERFLOW []`.

Checked every contact link and image -> `node verify.js` -> booking, WhatsApp (`wa.me/918978967171`), email (`nagaraju.thirukachi@gmail.com`) as typed; `MISSING_FILES []`.

Tested a missing picture -> `node debug.js` with `working.jpeg` renamed -> `DIAG {"imgClass":"is-broken","figClass":"about-media is-empty","figDisplay":"none","gridColumns":"1140px","sectionClass":"section about media-missing"}` — heading and words stay, space closes up.

First fix after looking at the phone screenshot -> header button wrapped and collided with the wordmark -> shortened the header button to "Book a call", added `white-space: nowrap`, shrank the wordmark on small screens.

Second fix -> mobile hero image was 58% of the first screen -> raised to `62svh`; measured `ratio":"0.62"`.

Third fix -> missing-image rule targeted the inner grid but the collapse class lands on the `<section>` -> changed the rule to `.about.media-missing .about-grid`; re-measured `gridColumns":"1140px"` (one column).

Created and pushed the repo -> `git init`, `git commit`, `gh repo create naginnovation4u-site --public --source=. --remote=origin --push` -> `https://github.com/nthirukachigb/naginnovation4u-site`, `* [new branch] HEAD -> master`.

Confirmed the push is public -> `git ls-remote --heads origin` -> `f8ecbb152a8fa47cfd92a6d165f6c144a38afa4e refs/heads/master`; `webfetch` on the raw `index.html` returned the page.

Vercel deploy failed -> build log from the member -> `Error: No Next.js version detected. Make sure your package.json has "next"...` (the project's Framework Preset was Next.js).

Checked the documented fix -> `Invoke-RestMethod https://openapi.vercel.sh/vercel.json` -> `framework`: *"The framework that is being used for this project. When `null` is used no framework is selected"*, type `["null","string"]`. Added `vercel.json` with `"framework": null`.

Member changed two requirements (19 Sep): no pricing on the site, and remove the why-I-started slot.

Removed the price panel and the slot -> edited `index.html` and `styles.css` -> the Peacock Blue panel now reads `Start with a discovery call.` with a `Book a 20 minute call` button; heading changed to `Three services, one call.`; `[WHY I STARTED]` and its `.slot` rule deleted.

Checked no price is left -> `grep -i "Rs |25,000|slot|WHY I STARTED"` on `*.html/*.css/*.js` -> no service price, no slot; the only "prices" left describe the seller's own product prices in the catalogue.

Re-rendered after the change -> `node shoot.js` -> `PHONE {"scrollWidth":390,"clientWidth":390,...}` / `PHONE_OVERFLOW []`; reviewed the services and about screenshots.

Member supplied a social hook, caption and hashtags and said it is a carousel caption, with `[CLIENT QUOTE]` not required.

Built the carousel -> `social/carousel.html` (10 slides, 1080x1080, Warm Cream #FDF6EC / Charcoal Ink #1C1C1E / Saffron Flame #E85D04 / Peacock Blue #0B6E99, Space Grotesk + Inter) and `social/caption.txt`.

Exported the slides -> `node carousel.js` (puppeteer-core, Chrome) -> `SLIDES 10`, `wrote slide-1.png … slide-10.png`.

Looked at the slides -> slide 1 had the page counter overlapping the "Swipe" footer, and slide 10 showed `cal.com/nagaraju-thirukachi`, a shortened link that is not a real URL. Moved the counter to the top right and put the full Cal.com URL on slide 10; re-exported and re-checked slides 1, 7 and 10.
