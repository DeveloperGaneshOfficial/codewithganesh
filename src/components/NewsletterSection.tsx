'use client'

import { useState } from 'react'
import { Loader2, Mail, CheckCircle2 } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-primary/5 py-16 transition-theme dark:bg-primary/10">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
          Get new tutorials in your inbox
        </h2>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
          No spam — just new videos, blog posts, and resources as they drop.
        </p>

        {status === 'success' ? (
          <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-primary shadow-sm dark:bg-tech-dark">
            <CheckCircle2 className="h-5 w-5" />
            You&apos;re subscribed! Check your inbox to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-theme focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-tech-dark dark:text-white"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-theme hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
              Subscribe
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-300">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  )
}
