import VideosGallery from "@/components/VideosGallery"

export const metadata = {
  title: "Videos | CodeWithGanesh",
  description: "Watch the latest full-length CodeWithGanesh tutorials, tips, and livestreams without leaving the site.",
}

export default function VideosPage() {
  return (
    <main className="min-h-screen py-20 transition-theme">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20">
            Full-length tutorials
          </span>
          <h1 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            CodeWithGanesh Videos
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Dive into the complete tutorials, livestreams, and deep dives straight from YouTube.
          </p>
        </div>
        <VideosGallery />
      </div>
    </main>
  )
}
