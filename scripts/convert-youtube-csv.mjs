import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

const INPUT_VIDEOS = path.join(ROOT, 'content', 'youtube-videos.csv')
const INPUT_SHORTS = path.join(ROOT, 'content', 'youtube-shorts.csv')

const OUTPUT_VIDEOS = path.join(ROOT, 'src', 'data', 'videos.json')
const OUTPUT_SHORTS = path.join(ROOT, 'src', 'data', 'shorts.json')

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

function parseCsv(text) {
  // RFC4180-ish parser: supports quoted fields, commas, CRLF/LF
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        const next = text[i + 1]
        if (next === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === ',') {
      row.push(field)
      field = ''
      continue
    }

    if (char === '\n') {
      row.push(field)
      field = ''
      // Trim possible trailing CR in last field
      row = row.map((value) => (value.endsWith('\r') ? value.slice(0, -1) : value))
      // Ignore completely empty last line
      if (!(row.length === 1 && row[0] === '')) {
        rows.push(row)
      }
      row = []
      continue
    }

    field += char
  }

  // last field
  row.push(field)
  row = row.map((value) => (value.endsWith('\r') ? value.slice(0, -1) : value))
  if (!(row.length === 1 && row[0] === '')) {
    rows.push(row)
  }

  return rows
}

function toRecord(header, row) {
  const record = {}
  for (let i = 0; i < header.length; i++) {
    record[header[i]] = (row[i] ?? '').trim()
  }
  return record
}

function extractYouTubeId(idOrUrl) {
  const value = (idOrUrl ?? '').trim()
  if (!value) return null

  // Already an ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value

  // Try URL parsing
  try {
    const url = new URL(value)

    // youtube.com/embed/<id>
    const embedMatch = url.pathname.match(/\/embed\/([^/]+)/i)
    if (embedMatch?.[1] && /^[a-zA-Z0-9_-]{11}$/.test(embedMatch[1])) return embedMatch[1]

    // youtube.com/watch?v=...
    const v = url.searchParams.get('v')
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v

    // youtu.be/<id>
    if (url.hostname === 'youtu.be') {
      const maybeId = url.pathname.replace(/^\//, '').split('/')[0]
      if (maybeId && /^[a-zA-Z0-9_-]{11}$/.test(maybeId)) return maybeId
    }

    // youtube.com/shorts/<id>
    const parts = url.pathname.split('/').filter(Boolean)
    const shortsIndex = parts.indexOf('shorts')
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
      const maybeId = parts[shortsIndex + 1]
      if (/^[a-zA-Z0-9_-]{11}$/.test(maybeId)) return maybeId
    }
  } catch {
    // Not a URL
  }

  return null
}

function normalizePublishedAt(value) {
  const raw = (value ?? '').trim()
  if (!raw) return undefined

  // Allow YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const date = new Date(`${raw}T00:00:00.000Z`)
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
  }

  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

function defaultThumbnail(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function parseVideosCsv(text) {
  const rows = parseCsv(text)
  if (rows.length === 0) return []

  const header = rows[0].map((h) => h.trim())
  const items = []

  for (const row of rows.slice(1)) {
    const record = toRecord(header, row)
    const idOrUrl = record.id_or_url
    const id = extractYouTubeId(idOrUrl)
    if (!id) continue

    const durationRaw = (record.duration || 'long').toLowerCase()
    const duration = durationRaw === 'short' || durationRaw === 'medium' || durationRaw === 'long'
      ? durationRaw
      : 'long'

    const title = record.title || 'Untitled Video'
    const publishedAt = normalizePublishedAt(record.publishedAt)
    const thumbnail = record.thumbnail || defaultThumbnail(id)
    const description = record.description || undefined

    items.push({
      id,
      title,
      ...(publishedAt ? { publishedAt } : {}),
      ...(description ? { description } : {}),
      ...(thumbnail ? { thumbnail } : {}),
      duration,
    })
  }

  return items
}

function parseShortsCsv(text) {
  const rows = parseCsv(text)
  if (rows.length === 0) return []

  const header = rows[0].map((h) => h.trim())
  const items = []

  for (const row of rows.slice(1)) {
    const record = toRecord(header, row)
    const idOrUrl = record.id_or_url
    const id = extractYouTubeId(idOrUrl)
    if (!id) continue

    const title = record.title || 'Untitled Short'
    const publishedAt = normalizePublishedAt(record.publishedAt)
    const thumbnail = record.thumbnail || defaultThumbnail(id)

    items.push({
      id,
      title,
      ...(publishedAt ? { publishedAt } : {}),
      ...(thumbnail ? { thumbnail } : {}),
    })
  }

  return items
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function main() {
  const videosCsv = fileExists(INPUT_VIDEOS) ? fs.readFileSync(INPUT_VIDEOS, 'utf8') : ''
  const shortsCsv = fileExists(INPUT_SHORTS) ? fs.readFileSync(INPUT_SHORTS, 'utf8') : ''

  const videos = videosCsv ? parseVideosCsv(videosCsv) : []
  const shorts = shortsCsv ? parseShortsCsv(shortsCsv) : []

  writeJson(OUTPUT_VIDEOS, videos)
  writeJson(OUTPUT_SHORTS, shorts)

  console.log(`Wrote ${videos.length} videos -> ${path.relative(ROOT, OUTPUT_VIDEOS)}`)
  console.log(`Wrote ${shorts.length} shorts -> ${path.relative(ROOT, OUTPUT_SHORTS)}`)
}

main()
