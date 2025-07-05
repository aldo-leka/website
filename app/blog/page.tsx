import Link from 'next/link'
import { getAllPosts, getPostsByCategory } from '@/lib/posts'

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const category = params.category
  const posts = category 
    ? await getPostsByCategory(category)
    : await getAllPosts()
  
  const title = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Posts`
    : 'All Posts'
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{title}</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet in this category.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="no-underline">
                <h2 className="text-xl font-bold hover:underline">{post.title}</h2>
              </Link>
              <div className="text-sm text-gray-600 mb-2">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} • {post.readingTime} • {post.category}
              </div>
              <p className="text-gray-700">{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}