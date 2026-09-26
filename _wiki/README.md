# Public Castellum wiki

The complete documentation and 17 original PDFs were approved for public release by the studio owner on 26 September 2026. Historical confidentiality labels remain in the originals.

Edit content/*.md and content/pages.json. From the repository root run:

```sh
node _wiki/scripts/build.mjs
node --test _wiki/tests/content.test.mjs
```

Commit source edits to main. .github/workflows/pages.yml rebuilds, tests and deploys the entire website, including /wiki/, automatically. GitHub Pages uses GitHub Actions as its publishing source. The checked-in wiki/ directory is a snapshot; the deployment always generates fresh output from _wiki/content/. No Cloudflare Access or login is used. Direct push permissions are managed on StudioWebsite; permissions from CastellumWiki do not transfer automatically.

## Reproduce the original Operation Instructions

All 121 PDF pages are mirrored as lossless WebP images, rendered at 2.5 pixels per PDF point. The original PDFs are preserved unchanged. Page transcripts in Markdown are searchable and selectable; they are not a replacement for the visual original.

After updating an original PDF, run `python _wiki/scripts/mirror-instructions.py` (requires `pypdfium2`, `pypdf`, `Pillow`), then the normal build and tests. This regenerates all 17 instruction Markdown files; preserve any editorial changes before running it. The generated manifest records PDF hashes, page dimensions and page counts.
