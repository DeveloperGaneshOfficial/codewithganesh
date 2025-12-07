import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPosts, getPostBySlug } from '@/lib/mdx';
import { format, parseISO } from 'date-fns';

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

    return {
        title: `${post.title} - CodeWithGanesh`,
        description: post.summary,
    };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-tech-dark transition-theme py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                            {post.tags && post.tags.length > 0 ? post.tags[0] : 'General'}
                        </span>
                        <span>•</span>
                        {/* <span>Reading time placeholder</span> */}
                        <span>•</span>
                        <span>{format(parseISO(post.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    {post.images && post.images.length > 0 && (
                        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-md">
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
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            {post.summary}
                        </p>
                    )}
                </header>

                <article className="prose dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-800/50 p-8 md:p-12 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    {post.body}
                </article>
            </div>
        </main>
    );
}

