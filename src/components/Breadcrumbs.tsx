import Link from 'next/link'
import { ChevronRight, Home, TagIcon } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

const iconMap = [Home, TagIcon]

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const Icon = iconMap[index] ?? ChevronRight

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/80 px-3 py-1 text-xs font-medium text-purple-700 transition-colors hover:border-purple-400 hover:text-purple-600 dark:border-purple-500/50 dark:bg-purple-500/10 dark:text-purple-200 dark:hover:border-purple-400/70 dark:hover:text-purple-100"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/70 bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700 dark:border-purple-500/60 dark:bg-purple-500/15 dark:text-purple-100">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 text-purple-300 dark:text-purple-500" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
