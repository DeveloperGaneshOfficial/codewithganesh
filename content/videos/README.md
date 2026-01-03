# Video MDX Pages

Create one `.mdx` file per YouTube video.

## File naming

Use the YouTube video id as the filename:

- `content/videos/<VIDEO_ID>.mdx`

Example:

- `content/videos/dQw4w9WgXcQ.mdx`

## Frontmatter

Minimum required fields:

- `title`
- `date`

Optional fields:

- `summary`
- `thumbnail`
- `youtubeId` (defaults to the filename id if omitted)

## Example

```mdx
---
title: "My Video Title"
date: "2026-01-01"
summary: "What you’ll learn in this video"
youtubeId: "dQw4w9WgXcQ"
thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
---

## Notes

- Key takeaways...
- Links...
```
