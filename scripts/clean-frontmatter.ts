import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDir = path.join(process.cwd(), 'content/blog')

// Standard fields that should be kept
const ALLOWED_FIELDS = ['title', 'date', 'summary', 'tags', 'images', 'draft']

function cleanFrontmatter(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: markdownContent } = matter(content)

    // Filter to only allowed fields
    const cleanedData: any = {}
    ALLOWED_FIELDS.forEach(field => {
        if (data[field] !== undefined) {
            cleanedData[field] = data[field]
        }
    })

    // Convert back to MDX
    const newContent = matter.stringify(markdownContent, cleanedData)

    // Write back
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`✅ Cleaned: ${path.basename(filePath)}`)
}

// Get all MDX files
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))

console.log(`Found ${files.length} blog posts`)
console.log(`Keeping only these fields: ${ALLOWED_FIELDS.join(', ')}`)
console.log(`\nCleaning frontmatter...\n`)

files.forEach(file => {
    const filePath = path.join(blogDir, file)
    cleanFrontmatter(filePath)
})

console.log(`\n✨ Done! All blog posts have standardized frontmatter.`)
