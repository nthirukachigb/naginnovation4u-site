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
