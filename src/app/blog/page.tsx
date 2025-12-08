import Link from 'next/link';
import { getBlogPosts } from '@/lib/mdx';
import { compareDesc } from 'date-fns';
import BlogListGrid from '@/components/BlogListGrid';
import { genPageMetadata } from '@/app/seo'

export const metadata = genPageMetadata({ title: 'Blog' })

export const revalidate = 0; // Dynamic route

export default async function BlogPage(props: { searchParams: Promise<{ category?: string; query?: string; tag?: string }> }) {
    const searchParams = await props.searchParams;
    const selectedCategory = searchParams?.category || 'All Posts';
    const searchQuery = searchParams?.query || '';
    const selectedTag = searchParams?.tag || '';

    const allPosts = await getBlogPosts();

    const categoriesSet = new Set<string>();
    allPosts.forEach((post) => {
        const categoryLabel = post.category || 'General';
        categoriesSet.add(categoryLabel);
    });
    const categories = ['All Posts', ...Array.from(categoriesSet).sort((a, b) => a.localeCompare(b))];

    let posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    if (selectedCategory && selectedCategory !== 'All Posts') {
        posts = posts.filter(post => (post.category || 'General').toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedTag) {
        const lowerTag = selectedTag.toLowerCase();
        posts = posts.filter(post => post.tags && post.tags.some(t => t.toLowerCase() === lowerTag));
    }

    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        posts = posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            (post.summary && post.summary.toLowerCase().includes(lowerQuery))
        );
    }

    return (
        <main className="min-h-screen transition-theme py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        Tech Blog
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-200">
                        Latest insights, tutorials, and guides.
                    </p>
                </div>

                {/* Category Filter */}
                {selectedTag && (
                    <div className="flex justify-center mb-6">
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                            Showing posts tagged{' '}
                            <span className="mx-1 font-semibold text-primary dark:text-primary">{selectedTag}</span>
                            <Link href="/blog" className="text-sm underline hover:text-primary dark:hover:text-primary">Clear</Link>
                        </span>
                    </div>
                )}

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
                <BlogListGrid posts={posts} />
            </div>
        </main>
    );
}
