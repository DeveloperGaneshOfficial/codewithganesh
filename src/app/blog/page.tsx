import Link from 'next/link';
import BlogSearch from '@/components/BlogSearch';
import Image from 'next/image';
import { getBlogPosts, BlogPost } from '@/lib/mdx';
import { compareDesc, parseISO, format } from 'date-fns';

export const revalidate = 0; // Dynamic route

async function getBlogs(category?: string, query?: string) {
    const allBlogs = await getBlogPosts();
    let posts = allBlogs.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));


    // Filter by category
    if (category && category !== 'All Posts') {
        posts = posts.filter(post => post.tags && post.tags.includes(category));
    }

    // Filter by query
    if (query) {
        const lowerQuery = query.toLowerCase();
        posts = posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            (post.summary && post.summary.toLowerCase().includes(lowerQuery))
        );
    }

    return posts;
}

const categories = [
    "All Posts",
    "Web Development",
    "Backend",
    "AI & ML",
    "Career Tips",
    "Tutorials"
];

export default async function BlogPage(props: { searchParams: Promise<{ category?: string; query?: string }> }) {
    const searchParams = await props.searchParams;
    const selectedCategory = searchParams?.category || 'All Posts';
    const searchQuery = searchParams?.query || '';
    const posts = await getBlogs(selectedCategory, searchQuery);

    return (
        <main className="min-h-screen bg-white dark:bg-tech-dark transition-theme py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        Tech Blog
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-200">
                        Latest insights, tutorials, and guides.
                    </p>
                </div>

                <BlogSearch />

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={cat === 'All Posts' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                            className={
                                cat === selectedCategory
                                    ? "bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                                    : "bg-white dark:bg-tech-dark text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-theme shadow-sm border border-slate-200 dark:border-slate-700"
                            }
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg run overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all h-full flex flex-col">
                                    {/* Placeholder Image or Post Image */}
                                    <div className="h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden relative">
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
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                                                {post.tags && post.tags.length > 0 ? post.tags[0] : 'General'}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                5 min read
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 flex-grow">
                                            {post.summary}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                                            {format(parseISO(post.date), 'MMMM d, yyyy')}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500 dark:text-slate-400">
                            No posts found in this category.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
