import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/mdx";
import { compareDesc } from "date-fns";

export default async function BlogSection() {
	const allBlogs = await getBlogPosts();
	const blogPosts = allBlogs
		.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
		.slice(0, 2);


	return (
		<section
			id="blog"
			className="py-20 bg-white dark:bg-tech-dark transition-theme"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center mb-16">
					<div className="inline-flex items-center justify-center mb-4 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
						<span className="text-primary font-medium text-sm">
							Latest Articles
						</span>
					</div>
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
						From Our Blog
					</h2>
					<p className="text-lg text-slate-600 dark:text-slate-200">
						Dive deeper into coding concepts with our detailed blog posts
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-3 mb-12">
					<Link href="/blog" className="text-primary hover:underline">View All Posts</Link>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{blogPosts && blogPosts.length > 0 ? (
						blogPosts.map((post, idx) => (
							<div
								key={post.slug || idx}
								className="bg-white dark:bg-tech-dark rounded-2xl shadow-lg overflow-hidden transition-theme border border-slate-100 dark:border-slate-700 hover:shadow-xl group"
							>
								<div className="md:flex h-full">
									<div className="md:w-1/3 bg-slate-200 dark:bg-slate-700 md:h-auto h-48 flex items-center justify-center relative overflow-hidden">
										{post.images && post.images.length > 0 ? (
											<Image
												src={post.images[0]}
												alt={post.title}
												fill
												className="object-cover transition-transform group-hover:scale-105"
											/>
										) : (
											<span className="text-4xl">📄</span>
										)}
									</div>
									<div className="p-6 md:w-2/3 flex flex-col">
										<div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
											<span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium">
												{post.tags && post.tags.length > 0 ? post.tags[0] : 'Tech'}
											</span>
											<span className="mx-2">•</span>
											<span>5 min read</span>
										</div>
										<Link
											href={`/blog/${post.slug}`}
											className="block mt-1 flex-grow"
										>
											<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
												{post.title}
											</h3>
											<p className="text-slate-600 dark:text-slate-400 line-clamp-2">
												{post.summary}
											</p>
										</Link>
										<div className="mt-4 flex items-center justify-between">
											<Link
												href={`/blog/${post.slug}`}
												className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-theme text-sm group"
											>
												Read More
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M14 5l7 7m0 0l-7 7m7-7H3"
													/>
												</svg>
											</Link>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-2 text-center text-slate-500">
							No blog posts found. Check back soon!
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
