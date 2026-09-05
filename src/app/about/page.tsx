import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import siteMetadata from '@/data/siteMetadata'
import { Code2, Braces, Server, Wrench, Github, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'About',
  description: 'Software engineer teaching Python, DSA, and backend development (FastAPI) in Hinglish for Indian developers and students.',
})

const teachCards = [
  {
    icon: Braces,
    title: 'Python',
    description: 'From fundamentals to advanced concepts — writing clean, idiomatic Python for real-world projects.',
  },
  {
    icon: Code2,
    title: 'DSA',
    description: 'Data structures and algorithms explained with intuition first, so interview prep actually sticks.',
  },
  {
    icon: Server,
    title: 'FastAPI',
    description: 'Building production-grade backend APIs — auth, databases, deployment, and everything in between.',
  },
  {
    icon: Wrench,
    title: 'Dev Tools',
    description: 'Git, Docker, CI/CD, and the everyday tooling that makes you a more effective developer.',
  },
]

const milestones = [
  { year: '2021', title: 'Started coding journey', description: 'Began learning Python and web development as a self-taught developer.' },
  { year: '2022', title: 'Launched developer Ganesh', description: 'Started the YouTube channel to teach Python and DSA in Hinglish.' },
  { year: '2023', title: 'FastAPI series', description: 'Kicked off the "Apna Chhota Swiggy" backend series, teaching production API design.' },
  { year: '2024', title: 'Growing community', description: 'Crossed key subscriber milestones and expanded into structured learning paths.' },
  { year: '2025', title: 'This website', description: 'Built codewithganesh.com to bring blog articles, resources, and courses to one place.' },
]

const socials = [
  { icon: Youtube, label: 'YouTube', href: siteMetadata.youtube },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/developerGanesh' },
  { icon: Github, label: 'GitHub', href: siteMetadata.github },
  { icon: Twitter, label: 'Twitter', href: siteMetadata.twitter },
  { icon: Linkedin, label: 'LinkedIn', href: siteMetadata.linkedin },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        {/* Bio */}
        <section className="mt-8 flex flex-col items-center gap-8 text-center sm:mt-12">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary dark:bg-primary/20">
            DG
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Hi, I&apos;m Ganesh 👋
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Software engineer and Python developer. I run{' '}
              <span className="font-semibold text-primary">developer Ganesh</span>, a YouTube
              channel where I teach Python, DSA, and backend development with FastAPI — in
              Hinglish, for Indian developers and students who want practical, real-world skills
              without the fluff.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-theme hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-tech-dark dark:text-slate-200 dark:hover:border-primary dark:hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </section>

        {/* What I teach */}
        <section className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
              <span className="text-sm font-medium text-primary">What I Teach</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Skills I focus on
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {teachCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-theme hover:shadow-md dark:border-slate-700 dark:bg-tech-dark"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
              <span className="text-sm font-medium text-primary">Journey</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Milestones</h2>
          </div>
          <ol className="relative ml-3 border-l border-slate-200 dark:border-slate-700">
            {milestones.map((item) => (
              <li key={item.year} className="mb-10 ml-6 last:mb-0">
                <span className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary">{item.year}</span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
