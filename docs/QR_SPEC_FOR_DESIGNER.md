# QR Codes for *Money Skills, Strong Minds* — spec for the book designer

**URLs CONFIRMED by Dr. Marnie on 2026-09-06. Safe to finalise the QR artwork.**
Once the book prints, these links are permanent in every copy.

They point to Dr. Marnie's own websites. She controls each page and can change its content
later **without reprinting**, as long as the path stays the same.

## The three codes

| Location in book | QR encodes (exactly) | Print this text beside/under the code |
|---|---|---|
| Inside front cover | `https://moneyskillsstrongminds.com/workbook` | `moneyskillsstrongminds.com/workbook` |
| Back matter — code 1 | `https://moneyskillsstrongminds.com/feedback` | Questions & stories: `moneyskillsstrongminds.com/feedback` |
| Back matter — code 2 | `https://wired2thrive.com` | The next book: `wired2thrive.com` |

- Front code → the digital workbook + reminder tool (companion to the book's activities)
- Feedback code → send Dr. Marnie a question or share your story
- Next code → join the interest list for the next book (AI literacy for kids and teens)

## Rules for the designer

- Encode the URL **exactly** as written: `https://`, all lowercase, no trailing slash, no
  tracking parameters.
- **Error correction level H** (highest) so the code still scans if the cover creases.
- Printed size **at least 2.0 × 2.0 cm** (2.5 cm preferred on the cover).
- Keep a clear white border (quiet zone) of at least 4 modules around the code.
- Solid black on white. No gradients, no logo or illustration inside the code.
- **Always print the plain URL** next to the code as a fallback for phones that won't scan.
- Before sign-off: print a proof and scan every code with **two different phones**
  (one iPhone, one Android).

## Ready-made files

Camera-ready QR files are in `public/qr/` in this repo:

- `workbook.svg` / `workbook.png`
- `feedback.svg` / `feedback.png`
- `next.svg` / `next.png`

SVG is preferred for print (scales with no quality loss). The designer may also regenerate the
codes from the URLs above with their own tool — either is fine as long as the encoded URL and
the rules above match.
