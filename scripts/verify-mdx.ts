
import { getBlogPosts, getPostBySlug } from '../src/lib/mdx';

async function verify() {
    try {
        console.log('Fetching all blog posts...');
        const posts = await getBlogPosts();
        console.log(`Found ${posts.length} posts.`);

        if (posts.length > 0) {
            const slug = posts[0].slug;
            console.log(`Fetching detailed post for slug: ${slug}`);
            const post = await getPostBySlug(slug);
            if (post && post.body) {
                console.log('Successfully fetched post and compiled MDX body.');
                console.log('Title:', post.title);
            } else {
                console.error('Failed to fetch post or compile body.');
                process.exit(1);
            }
        } else {
            console.log('No posts found to verify detail fetch.');
        }
        console.log('Verification successful.');
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
