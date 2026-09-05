import { Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            What learners are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-theme hover:shadow-md dark:border-slate-700 dark:bg-tech-dark"
            >
              <Quote className="mb-4 h-6 w-6 text-primary/40" />
              <p className="mb-6 flex-1 text-sm text-slate-600 dark:text-slate-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
