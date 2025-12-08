import type { MetadataRoute } from 'next'

import siteMetadata from "@/data/siteMetadata"
import { getBlogPosts } from "@/lib/mdx"

const staticPaths = ["", "videos", "blog", "shorts"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = new URL(siteMetadata.siteUrl)

  const coreRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const dynamicRouteGenerators: Array<() => Promise<MetadataRoute.Sitemap>> = [
    async () => {
      const posts = await getBlogPosts()
      return posts.map((post) => ({
        url: new URL(`blog/${post.slug}`, baseUrl).toString(),
        lastModified: (post.lastmod ? new Date(post.lastmod) : new Date(post.date)).toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    },
  ]

  const dynamicRoutes = (
    await Promise.all(dynamicRouteGenerators.map((generateRoutes) => generateRoutes()))
  ).flat()

  return [...coreRoutes, ...dynamicRoutes]
}
