import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, getPostBySlug } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from '@/app/seo'
import { format, parseISO } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import TableOfContents from '@/components/TableOfContents'
import ShareButtons from '@/components/ShareButtons'

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    return genPageMetadata({
        title: post.title,
        description: post.summary,
        image: post.images?.[0] || siteMetadata.socialBanner,
        alternates: {
            canonical: './',
            types: {
                'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
            },
        },
    })
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const { slug } = params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : null
    const allPosts = await getBlogPosts()
    const nonCurrentPosts = allPosts.filter((entry) => entry.slug !== slug)
    const relatedByTag = primaryTag
        ? nonCurrentPosts.filter((entry) => entry.tags?.includes(primaryTag))
        : []
    const fallbackPosts = nonCurrentPosts.filter(
        (entry) => !relatedByTag.some((related) => related.slug === entry.slug)
    )
    const suggestedPosts = [...relatedByTag, ...fallbackPosts].slice(0, 2)
    const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://codewithganesh.com'
    const shareUrl = `${siteBaseUrl.replace(/\/$/, '')}/blog/${slug}`

    return (
        <>
            <main className="min-h-screen transition-theme pb-20">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-start lg:gap-12">
                        <div className="lg:flex-1 lg:min-w-0">
                            <div
                                id="post-top"
                                className="h-0 scroll-mt-[calc(var(--site-header-height,80px)+var(--site-breadcrumbs-height,44px)+24px)]"
                                aria-hidden="true"
                            />
                            <Breadcrumbs
                                sticky
                                items={[
                                    { label: 'Home', href: '/' },
                                    {
                                        label: primaryTag || 'Blog',
                                        href: primaryTag ? `/blog?tag=${encodeURIComponent(primaryTag)}` : '/blog',
                                    },
                                    { label: post.title },
                                ]}
                            />
                            <header className="mb-6 mt-6 text-center lg:text-left scroll-mt-[calc(var(--site-header-height,80px)+var(--site-breadcrumbs-height,44px)+24px)] lg:mt-8">
                                <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4 lg:justify-start">
                                    {primaryTag ? (
                                        <Link
                                            href={`/blog?tag=${encodeURIComponent(primaryTag)}`}
                                            className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium hover:bg-primary/20 transition-colors"
                                        >
                                            {primaryTag}
                                        </Link>
                                    ) : (
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">General</span>
                                    )}
                                    <span>•</span>
                                    <span>{format(parseISO(post.date), 'MMMM d, yyyy')}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                    {post.title}
                                </h1>
                                {post.images && post.images.length > 0 && (
                                    <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden">
                                        <Image
                                            src={post.images[0]}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                )}
                                {post.summary && (
                                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl lg:max-w-4xl">
                                        {post.summary}
                                    </p>
                                )}
                            </header>

                            <article data-post-content className="mt-8">
                                <div className="prose prose-lg max-w-none dark:prose-invert">
                                    {post.body}
                                </div>
                            </article>

                            <div className="mt-10">
                                <ShareButtons title={post.title} url={shareUrl} />
                            </div>

                            {suggestedPosts.length > 0 && (
                                <section className="mt-12 border-t border-slate-200/70 pt-8 dark:border-slate-800/60">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                Keep exploring
                                            </h2>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {primaryTag
                                                    ? `More posts about ${primaryTag}.`
                                                    : 'You might also enjoy these reads.'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                        {suggestedPosts.map((suggested) => (
                                            <Link
                                                key={suggested.slug}
                                                href={`/blog/${suggested.slug}`}
                                                className="group block h-full rounded-2xl border border-slate-100/90 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-[0_18px_50px_-32px_rgba(30,41,59,0.35)] ring-1 ring-slate-100/80 transition-all hover:-translate-y-2 hover:border-primary/40 hover:ring-primary/30 hover:shadow-[0_30px_70px_-40px_rgba(79,70,229,0.35)] dark:border-slate-800/70 dark:bg-[linear-gradient(140deg,_rgba(15,23,42,0.92)_0%,_rgba(10,16,32,0.88)_55%,_rgba(15,23,42,0.95)_100%)] dark:ring-1 dark:ring-slate-800/70 dark:shadow-[0_24px_60px_-34px_rgba(15,23,42,0.85)] dark:hover:border-primary/40 dark:hover:ring-primary/35"
                                            >
                                                <div className="flex h-full flex-col">
                                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary dark:text-slate-500">
                                                        {format(parseISO(suggested.date), 'MMM d, yyyy')}
                                                    </span>
                                                    <h3 className="mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                                                        {suggested.title}
                                                    </h3>
                                                    {suggested.summary && (
                                                        <p className="mt-3 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                                                            {suggested.summary}
                                                        </p>
                                                    )}
                                                    <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                                                        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-400 dark:text-slate-400">
                                                            {suggested.tags && suggested.tags.length > 0
                                                                ? suggested.tags.slice(0, 2).map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 transition group-hover:border-primary/40 group-hover:text-primary dark:border-slate-700/70 dark:bg-slate-900/50 dark:text-slate-300 dark:group-hover:border-primary/40 dark:group-hover:text-primary"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))
                                                                : (
                                                                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700/70 dark:bg-slate-900/50 dark:text-slate-400">
                                                                        More to read
                                                                    </span>
                                                                )}
                                                        </div>
                                                        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-200 dark:group-hover:border-primary/40 dark:group-hover:text-primary">
                                                            Read
                                                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <aside className="hidden lg:flex lg:ml-auto lg:w-[260px] lg:pl-4 lg:border-l lg:border-slate-200/70 lg:sticky lg:top-[var(--site-header-height,80px)] lg:pt-[var(--site-sticky-gap,30px)] lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:flex-col lg:items-end dark:lg:border-slate-800/60">
                            <TableOfContents items={post.toc} />
                        </aside>
                    </div>
                </div>
            </main>
        </>
    )
}
