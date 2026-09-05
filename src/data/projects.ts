export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  seriesHref?: string
}

export const projects: Project[] = [
  {
    slug: 'apna-chhota-swiggy',
    title: 'Apna Chhota Swiggy',
    description: 'A food delivery backend API built with FastAPI and PostgreSQL — auth, orders, and deployment, taught step by step.',
    tags: ['FastAPI', 'PostgreSQL', 'Python'],
    seriesHref: '/learning-paths/fastapi-backend-development',
  },
  {
    slug: 'lending-tracker',
    title: 'Lending Tracker',
    description: 'An Android app for tracking money lent and borrowed with friends and family, built with Kotlin and Jetpack Compose.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android'],
  },
  {
    slug: 'code-highlighter',
    title: 'Code Highlighter',
    description: 'An After Effects CEP extension that brings syntax-highlighted code snippets into your motion graphics projects.',
    tags: ['After Effects', 'CEP', 'JavaScript'],
  },
]
