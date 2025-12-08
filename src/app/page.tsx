// File: src/app/page.tsx

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import VideosSection from '@/components/VideosSection'
import BlogSection from '@/components/BlogSection'
import { genPageMetadata } from '@/app/seo'

export const metadata = genPageMetadata({ title: 'CodeWithGanesh - Learn Coding with CodeSpire' })

export default function HomePage() {
  return (
    <main className="relative transition-theme">
      <div className="pointer-events-none absolute inset-0 -z-10 blueprint-pattern hidden dark:block" aria-hidden="true" />
      <div className="relative z-10">
        <Hero />
        {/* Decorative wave under hero section */}
        <div className="-mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-current text-white dark:text-slate-900 transition-theme">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>
        <Features />
        {/* Stats Section
        <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <div className="text-slate-600 dark:text-slate-200">Video Tutorials</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-slate-600 dark:text-slate-200">YouTube Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">25+</div>
            <div className="text-slate-600 dark:text-slate-200">Complete Courses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.8</div>
            <div className="text-slate-600 dark:text-slate-200">Average Rating</div>
          </div>
        </section> */}
        <VideosSection />
        <BlogSection />
      </div>
    </main>
  )
}
