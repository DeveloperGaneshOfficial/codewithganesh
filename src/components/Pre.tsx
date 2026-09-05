'use client'

import { useRef, useState, type ComponentPropsWithRef } from 'react'

/* ── language display-name map ─────────────────────────── */
const LANG_LABELS: Record<string, string> = {
  js: 'JS',
  jsx: 'JSX',
  ts: 'TS',
  tsx: 'TSX',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  md: 'Markdown',
  mdx: 'MDX',
  py: 'Python',
  python: 'Python',
  sh: 'Shell',
  bash: 'Bash',
  zsh: 'Zsh',
  powershell: 'PowerShell',
  sql: 'SQL',
  yaml: 'YAML',
  yml: 'YAML',
  toml: 'TOML',
  xml: 'XML',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  rust: 'Rust',
  go: 'Go',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  c: 'C',
  cpp: 'C++',
  csharp: 'C#',
  ruby: 'Ruby',
  php: 'PHP',
  lua: 'Lua',
  r: 'R',
  dart: 'Dart',
  plaintext: 'Text',
  text: 'Text',
  txt: 'Text',
}

function getLangLabel(raw?: string | null): string | null {
  if (!raw) return null
  const key = raw.toLowerCase()
  return LANG_LABELS[key] ?? raw.toUpperCase()
}

/**
 * Custom <pre> wrapper for code blocks.
 * Renders a toolbar with the language label (left) and a Copy button (right),
 * styled to match rehype-pretty-code's dark background.
 */
export default function Pre({
  children,
  'data-language': dataLang,
  ...props
}: ComponentPropsWithRef<'pre'> & { 'data-language'?: string }) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const [resolvedLang, setResolvedLang] = useState<string | null>(null)

  // Resolve language: prefer data-language prop, then fall back to <code>'s data-language
  const langFromProp = getLangLabel(dataLang)

  // On mount, if no prop lang, try reading from the child <code> element
  const preCallbackRef = (node: HTMLPreElement | null) => {
    ;(preRef as React.MutableRefObject<HTMLPreElement | null>).current = node
    if (!langFromProp && node) {
      const codeEl = node.querySelector('code')
      const codeLang = codeEl?.getAttribute('data-language')
      if (codeLang) setResolvedLang(getLangLabel(codeLang))
    }
  }

  const langLabel = langFromProp ?? resolvedLang

  const handleCopy = async () => {
    if (!preRef.current) return

    const codeEl = preRef.current.querySelector('code')
    const source = codeEl ?? preRef.current

    const lines = source.querySelectorAll('[data-line]')
    let text: string
    if (lines.length > 0) {
      text = Array.from(lines)
        .map((line) => line.textContent ?? '')
        .join('\n')
    } else {
      text = source.textContent ?? ''
    }

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* ── Copy icon (two-rect clipboard) ── */
  const CopyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )

  /* ── Check icon (tick) ── */
  const CheckIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )

  return (
    <div className="code-block group relative my-6 overflow-hidden rounded-xl border border-slate-700/60 bg-[#24292e] shadow-lg">
      {/* ── Toolbar bar ────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-700/50 bg-[#1e2228] px-4 py-2 text-xs">
        {/* Language label */}
        {langLabel ? (
          <span className="select-none font-medium tracking-wide text-slate-400">
            {langLabel}
          </span>
        ) : (
          <span />
        )}

        {/* Copy button */}
        <button
          aria-label="Copy code"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all
            ${
              copied
                ? 'border-green-500/50 text-green-400'
                : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-200'
            }`}
        >
          {copied ? CheckIcon : CopyIcon}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* ── Code block ─────────────────────────────── */}
      <pre ref={preCallbackRef} {...props} className={`${props.className ?? ''} !my-0 !rounded-none !border-0`}>
        {children}
      </pre>
    </div>
  )
}
