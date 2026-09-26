## Editorial responsibilities

| Team member | Role | GitHub account |
|---|---|---|
| Hannes | Repository owner | [Hannes821](https://github.com/Hannes821) |
| Arina / Pcho | Technical Lead | [Pchooo](https://github.com/Pchooo) |
| Jonathan von Acker / Gahmuret | Art Lead | [GahmuretVanBegonia](https://github.com/GahmuretVanBegonia) |

Direct publishing is limited to collaborators authorised in the StudioWebsite repository. The roles above describe editorial responsibilities; they do not grant repository access.

## Improve a page

1. Choose **Edit this page** to open its Markdown source in the public website repository. Sign in with an account that has write access.
2. Update the English text, source reference and date. Distinguish design intentions from verified implementation.
3. Submit the change with a concise description. Use a pull request for architecture changes that need team review.
4. Commit your Markdown changes to `main` (or merge the reviewed pull request). The “Publish website and wiki” workflow automatically rebuilds, checks and publishes the website. Allow a few minutes for the update to appear; no manual HTML editing or rebuild is needed.

All wiki articles, search data and original PDFs are publicly readable without signing in. Direct editing and publishing require team repository permissions. Visitors can propose corrections through GitHub for team review.

## Add an Operation Instruction

Keep the document ID stable. Add new revisions with a date and preserve older originals. Update the summary, original-file link and review status together. If approval status is unknown, use “Source snapshot” or “Review needed”.

## Editorial labels

| Label | Meaning |
|---|---|
| Source snapshot | Taken from supplied documents; not a current runtime/code test |
| Review needed | Incomplete, version-dependent or contradictory |
| Correction needed | The document content does not match its stated subject |

Record the date, rationale and affected source for new decisions. Replace obsolete rules transparently rather than silently rewriting their history.
