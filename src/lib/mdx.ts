import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

// MDX Plugins
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrettyCode from 'rehype-pretty-code'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

import { components } from '@/components/MDXComponents'

const root = process.cwd()
const blogDir = path.join(root, 'content/blog')

// Copied from previously existing config or Contentlayer defaults
const icon = fromHtmlIsomorphic(
    `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
  `,
    { fragment: true }
)

export type BlogPost = {
    slug: string
    title: string
    date: string
    summary?: string
    tags?: string[]
    images?: string[]
    draft?: boolean
    body: any // MDX content
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const files = getFilesRecursively(blogDir)
    const posts = await Promise.all(
        files.map(async (file) => {
            const source = fs.readFileSync(file, 'utf8')
            const { data } = matter(source)
            const slug = file.replace(blogDir, '').replace(/\\/g, '/').replace(/^\//, '').replace(/\.mdx$/, '')

            return {
                slug,
                title: data.title,
                date: new Date(data.date).toISOString(),
                summary: data.summary,
                tags: data.tags,
                images: data.images,
                draft: data.draft,
                body: null // Body not needed for listing
            }
        })
    )

    return posts
        .filter(post => !post.draft)
        .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(blogDir, `${slug}.mdx`)
        // Handle potential nested paths if slug contains slashes
        // But typically slug is path relative to content dir

        // Fallback search if exact path not found (for nested handling simpler approach)
        let actualPath = filePath
        if (!fs.existsSync(actualPath)) {
            // Try searching recursively if needed, but for now assume slug matches file path
            return null
        }

        const source = fs.readFileSync(actualPath, 'utf8')
        const { content, data } = matter(source)

        // Calculate TOC
        const { extractTocHeadings } = await import('pliny/mdx-plugins/index.js')
        const toc = extractTocHeadings(content)

        // Compile MDX
        const { content: mdxContent } = await compileMDX({
            source: content,
            components: {
                ...components,
                TOCInline: (props: any) => components.TOCInline({ ...props, toc: props.toc || (Array.isArray(toc) ? toc : []) }),
            },
            options: {
                parseFrontmatter: false,
                mdxOptions: {
                    remarkPlugins: [
                        remarkGfm,
                        remarkMath,
                        remarkAlert,
                    ],
                    rehypePlugins: [
                        rehypeSlug,
                        [
                            rehypeAutolinkHeadings,
                            {
                                behavior: 'prepend',
                                headingProperties: {
                                    className: ['content-header'],
                                },
                                content: icon,
                            },
                        ],
                        rehypeKatex,
                        rehypeKatexNoTranslate,
                        [rehypeCitation, { path: path.join(root, 'content') }],
                        [
                            rehypePrettyCode,
                            {
                                theme: 'github-dark',
                                keepBackground: true,
                            },
                        ],
                    ],
                },
            },
        })

        return {
            slug,
            title: data.title,
            date: new Date(data.date).toISOString(),
            summary: data.summary,
            tags: data.tags,
            images: data.images,
            draft: data.draft,
            body: mdxContent
        }
    } catch (error) {
        return null
    }
}

function getFilesRecursively(dir: string): string[] {
    let results: string[] = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
        file = path.join(dir, file)
        const stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(getFilesRecursively(file))
        } else {
            /* Is a file */
            if (file.endsWith('.mdx')) {
                results.push(file)
            }
        }
    })
    return results
}
