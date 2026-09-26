# Public Castellum wiki

The complete documentation and 17 original PDFs were approved for public release by the studio owner on 26 September 2026. Historical confidentiality labels remain in the originals.

Edit content/*.md and content/pages.json. From the repository root run:

```sh
node _wiki/scripts/build.mjs
node --test _wiki/tests/content.test.mjs
```

Commit both source and generated wiki/ files. The existing GitHub Pages deployment publishes /wiki/. No Cloudflare Access or login is used. Direct push permissions are managed on StudioWebsite; permissions from CastellumWiki do not transfer automatically.
