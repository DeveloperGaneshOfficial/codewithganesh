import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

const VIDEOS_JSON = path.join(ROOT, 'src', 'data', 'videos.json')
const OUT_DIR = path.join(ROOT, 'content', 'videos')

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function toIsoDate(value) {
  if (!value) return new Date().toISOString()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function toFrontmatterValue(value) {
  const safe = String(value ?? '').replace(/"/g, '\\"')
  return `"${safe}"`
}

function removeYoutubeSrcFrontmatter(existingMdx) {
  if (!existingMdx.startsWith('---\n')) return null
  const endIndex = existingMdx.indexOf('\n---\n', 4)
  if (endIndex === -1) return null

  const frontmatter = existingMdx.slice(4, endIndex)
  const rest = existingMdx.slice(endIndex + 5)

  if (!/^youtubeSrc\s*:/m.test(frontmatter)) return null

  const lines = frontmatter
    .split(/\r?\n/)
    .filter((line) => !/^youtubeSrc\s*:/.test(line))

  return `---\n${lines.join('\n')}\n---\n${rest}`
}

function buildMdx({ id, title, publishedAt, description, thumbnail }) {
  const iso = toIsoDate(publishedAt)
  const date = iso.slice(0, 10)

  const summary = description
    ? String(description).trim().split(/\r?\n/)[0].slice(0, 180)
    : ''

  return [
    '---',
    `title: ${toFrontmatterValue(title || 'Untitled Video')}`,
    `date: ${toFrontmatterValue(date)}`,
    ...(summary ? [`summary: ${toFrontmatterValue(summary)}`] : []),
    `youtubeId: ${toFrontmatterValue(id)}`,
    ...(thumbnail ? [`thumbnail: ${toFrontmatterValue(thumbnail)}`] : []),
    '---',
    '',
    '## Overview',
    '',
    'Write your notes for this video here.',
    '',
    '## Key points',
    '',
    '- ',
    '',
    '## Links',
    '',
    `- https://www.youtube.com/watch?v=${id}`,
    '',
  ].join('\n')
}

function main() {
  if (!fileExists(VIDEOS_JSON)) {
    console.error(`Missing ${path.relative(ROOT, VIDEOS_JSON)}. Run pnpm convert:youtube first.`)
    process.exit(1)
  }

  ensureDir(OUT_DIR)

  const raw = fs.readFileSync(VIDEOS_JSON, 'utf8')
  const videos = JSON.parse(raw)

  if (!Array.isArray(videos)) {
    console.error('videos.json must be an array')
    process.exit(1)
  }

  let created = 0
  let skipped = 0
  let updated = 0

  for (const video of videos) {
    const id = String(video?.id ?? '').trim()
    if (!id) continue

    const outPath = path.join(OUT_DIR, `${id}.mdx`)
    if (fileExists(outPath)) {
      const existing = fs.readFileSync(outPath, 'utf8')
      const next = removeYoutubeSrcFrontmatter(existing)
      if (next) {
        fs.writeFileSync(outPath, next, 'utf8')
        updated++
      } else {
        skipped++
      }
      continue
    }

    const mdx = buildMdx({
      id,
      title: video?.title,
      publishedAt: video?.publishedAt,
      description: video?.description,
      thumbnail: video?.thumbnail,
    })

    fs.writeFileSync(outPath, mdx, 'utf8')
    created++
  }

  console.log(`Video MDX stubs: created=${created} skipped=${skipped}`)
  console.log(`Video MDX stubs: updated=${updated}`)
  console.log(`Output folder: ${path.relative(ROOT, OUT_DIR)}`)
}

main()
