'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

const subjectOptions = [
  { value: 'collab', label: 'Collaboration' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'question', label: 'Question' },
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-tech-dark">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Message sent!</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-theme dark:border-slate-700 dark:bg-tech-dark sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-theme focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-tech-dark dark:text-white"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-theme focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-tech-dark dark:text-white"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-theme focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-tech-dark dark:text-white"
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-theme focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-tech-dark dark:text-white"
          placeholder="Tell me a bit about what you have in mind..."
        />
      </div>

      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-theme hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
