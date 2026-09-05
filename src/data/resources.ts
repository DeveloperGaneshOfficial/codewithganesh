export type Resource = {
  slug: string
  title: string
  description: string
  fileType: 'PDF' | 'ZIP' | 'MD'
  href: string
  category: 'Cheat Sheet' | 'Roadmap' | 'Template' | 'Interview Prep'
}

export const resources: Resource[] = [
  {
    slug: 'python-cheat-sheet',
    title: 'Python Cheat Sheet',
    description: 'Syntax, built-ins, and common patterns for Python on a single page.',
    fileType: 'PDF',
    href: '/static/resources/python-cheat-sheet.pdf',
    category: 'Cheat Sheet',
  },
  {
    slug: 'dsa-roadmap',
    title: 'DSA Roadmap for Beginners',
    description: 'A step-by-step order to learn data structures and algorithms without getting overwhelmed.',
    fileType: 'PDF',
    href: '/static/resources/dsa-roadmap.pdf',
    category: 'Roadmap',
  },
  {
    slug: 'fastapi-project-template',
    title: 'FastAPI Project Template',
    description: 'A starter FastAPI project with folder structure, auth, and Postgres already wired up.',
    fileType: 'ZIP',
    href: '/static/resources/fastapi-project-template.zip',
    category: 'Template',
  },
  {
    slug: 'interview-prep-notes',
    title: 'Backend Interview Prep Notes',
    description: 'Common backend and system design interview questions with concise answers.',
    fileType: 'MD',
    href: '/static/resources/interview-prep-notes.md',
    category: 'Interview Prep',
  },
]
