import VideosGallery from "./VideosGallery"

export default function VideosSection() {
	return (
		<section
			id="videos"
			className="bg-slate-50 py-20 transition-theme dark:bg-tech-dark"
		>
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
						<span className="text-sm font-medium text-primary">Latest Videos</span>
					</div>
					<h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
						Recent Tutorials
					</h2>
					<p className="text-lg text-slate-600 dark:text-slate-200">
						Check out our most recent tutorials and coding sessions to level up your skills.
					</p>
				</div>
				<VideosGallery />
			</div>
		</section>
	)
}
