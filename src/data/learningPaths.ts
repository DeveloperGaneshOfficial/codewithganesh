export type LearningPathEpisode = {
  /** Stable id, also used as the localStorage watched-state key. */
  id: string
  title: string
  duration: string
  /** YouTube video id, when the episode is published. Omit for "coming soon" episodes. */
  youtubeId?: string
  thumbnail?: string
}

export type LearningPathTagColor = 'blue' | 'green' | 'purple' | 'orange'

export type LearningPath = {
  slug: string
  title: string
  description: string
  tag: string
  tagColor: LearningPathTagColor
  episodes: LearningPathEpisode[]
}

export const learningPaths: LearningPath[] = [
  {
    slug: 'python-for-beginners',
    title: 'Python for Beginners',
    description:
      'Go from zero to writing real Python programs — syntax, data structures, functions, and the habits that make your code readable.',
    tag: 'Python',
    tagColor: 'green',
    episodes: [
      {
        id: 'python-setup-and-syntax',
        title: 'Python Setup & Core Syntax',
        duration: '14:20',
      },
      {
        id: 'python-data-structures',
        title: 'Lists, Dicts, Sets & Tuples',
        duration: '22:10',
      },
      {
        id: 'python-functions-and-modules',
        title: 'Functions, Modules & Packages',
        duration: '18:45',
      },
      {
        id: 'python-oop-basics',
        title: 'OOP Basics in Python',
        duration: '26:30',
      },
    ],
  },
  {
    slug: 'dsa-roadmap',
    title: 'DSA Roadmap',
    description:
      'A structured path through data structures and algorithms, built around interview-style problems and the intuition behind each pattern.',
    tag: 'DSA',
    tagColor: 'purple',
    episodes: [
      {
        id: 'dsa-arrays-and-strings',
        title: 'Arrays & Strings — Patterns You Must Know',
        duration: '19:05',
      },
      {
        id: 'dsa-recursion-and-backtracking',
        title: 'Recursion & Backtracking',
        duration: '24:50',
      },
      {
        id: 'dsa-trees-and-graphs',
        title: 'Trees & Graphs from Scratch',
        duration: '31:15',
      },
      {
        id: 'dsa-dynamic-programming',
        title: 'Dynamic Programming — Building Intuition',
        duration: '28:40',
      },
    ],
  },
  {
    slug: 'fastapi-backend-development',
    title: 'FastAPI Backend Development',
    description:
      'Build a production-style backend from scratch with the "Apna Chhota Swiggy" project — FastAPI, PostgreSQL, auth, and deployment.',
    tag: 'FastAPI',
    tagColor: 'orange',
    episodes: [
      {
        id: 'fastapi-project-setup',
        title: 'Project Setup & Folder Structure',
        duration: '16:30',
      },
      {
        id: 'fastapi-postgres-and-models',
        title: 'PostgreSQL, SQLAlchemy & Models',
        duration: '23:55',
      },
      {
        id: 'fastapi-auth-and-jwt',
        title: 'Authentication with JWT',
        duration: '27:20',
      },
      {
        id: 'fastapi-orders-api',
        title: 'Building the Orders API',
        duration: '25:10',
      },
      {
        id: 'fastapi-deployment',
        title: 'Deploying to Production',
        duration: '20:00',
      },
    ],
  },
]

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return learningPaths.find((path) => path.slug === slug)
}
