import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import siteMetadata from '@/data/siteMetadata'
import { Mail, Instagram, Youtube } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'Contact',
  description: 'Get in touch for collaborations, sponsorships, or questions about Python, DSA, and FastAPI content.',
})

const altContacts = [
  { icon: Mail, label: siteMetadata.email, href: `mailto:${siteMetadata.email}` },
  { icon: Instagram, label: '@developerGanesh', href: 'https://instagram.com/developerGanesh' },
  { icon: Youtube, label: 'developer Ganesh', href: siteMetadata.youtube },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <div className="mx-auto mt-8 mb-12 max-w-2xl text-center sm:mt-12">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Collab, sponsorship, or just a question?
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Fill out the form below and I&apos;ll get back to you as soon as I can.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <ContactForm />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-tech-dark">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Alternate contact
              </h3>
              <ul className="space-y-3">
                {altContacts.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-slate-700 transition-theme hover:text-primary dark:text-slate-200 dark:hover:text-primary"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-primary/5 p-6 dark:bg-primary/10">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                For quick questions, comment on the relevant YouTube video — I read every one.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
