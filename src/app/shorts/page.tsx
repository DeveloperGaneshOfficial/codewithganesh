import ShortsGallery from "@/components/ShortsGallery"

export const metadata = {
  title: "YouTube Shorts | CodeWithGanesh",
  description: "Catch the latest CodeWithGanesha YouTube Shorts without leaving the site.",
}

export default function ShortsPage() {
  return (
    <main className="min-h-screen py-20 transition-theme">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          {/* <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20">
            Short form content
          </span> */}
          <h1 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            Explore Youtube Shorts
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Bite-sized coding tips and updates direct from YouTube, right here on the site.
          </p>
        </div>
        <ShortsGallery />
      </div>
    </main>
  )
}
