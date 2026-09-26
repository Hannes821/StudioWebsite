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

## Insert an image

1. Open the [wiki image folder on GitHub](https://github.com/Hannes821/StudioWebsite/tree/main/_wiki/public/images) and use **Add file → Upload files** to upload your PNG, JPG or WebP file. Use a clear filename without spaces, such as `building-setup.png`.
2. Choose **Edit this page** on the wiki article and insert this Markdown where the image belongs:

```markdown
![Building setup in Unreal Engine](images/building-setup.png)
```

3. Commit the image and article changes to `main`. Automatic publishing makes both visible in the wiki.

The path in Markdown begins with `images/`; the uploaded file lives in `_wiki/public/images/` in the repository. You can also make an image clickable to open its full resolution:

```markdown
[![Building setup in Unreal Engine](images/building-setup.png)](images/building-setup.png)
```

## Original instruction pages

The Operation Instructions reproduce every source PDF page as an image to preserve the original diagrams, labels and layout. The `pdf-transcript` blocks in their Markdown files provide selectable, searchable extracted text. Editing a transcript changes that text only; it does not change the original page image. Put new notes in ordinary Markdown, or update the source document and regenerate its page images for a new revision.
