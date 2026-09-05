import siteMetadata from '@/data/siteMetadata'

const stats = [
  { label: 'Video Tutorials', value: siteMetadata.stats.videosPublished },
  { label: 'YouTube Subscribers', value: siteMetadata.stats.subscribers },
  { label: 'Active Series', value: siteMetadata.stats.activeSeries },
]

export default function StatsSection() {
  return (
    <section className="border-y border-slate-100 bg-white py-12 transition-theme dark:border-slate-800 dark:bg-tech-dark">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">{stat.value}</div>
            <div className="text-slate-600 dark:text-slate-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
