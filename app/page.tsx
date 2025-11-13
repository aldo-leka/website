import Link from 'next/link'
import {getAllPosts} from '@/lib/posts'

export default async function HomePage() {
    const posts = await getAllPosts()
    const recentPosts = posts.slice(0, 5)

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-2xl font-bold mb-4">Hi!</h1>
                <p className="leading-relaxed">
                    I'm many things, but the longest one has been a programmer, so far.
                </p>
                <p>
                    I might write about programming and investing sometimes on this site.
                </p>
                <p className="mt-4">
                    Take a look at my projects <Link href="/projects" className="underline hover:text-gray-600">here</Link>.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
                <div className="space-y-6">
                    {recentPosts.map((post) => (
                        <article key={post.slug}>
                            <Link href={`/blog/${post.slug}`} className="no-underline">
                                <h3 className="font-bold hover:underline">{post.title}</h3>
                            </Link>
                            <div className="text-sm text-gray-600 mb-2">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })} • {post.readingTime}
                            </div>
                            <p className="text-gray-700">{post.excerpt}</p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}