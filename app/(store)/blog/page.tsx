import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { _ref: string } };
  excerpt?: string;
}

async function getPosts() {
  return client.fetch<Post[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, image,
      "excerpt": pt::text(body[0..1])
    }`
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-2 text-white/80">News, recipes, and stories from the Caribbean</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {posts.length === 0 ? (
          <div className="rounded-xl border bg-gray-50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Coming Soon</h2>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;re working on some great content. Check back soon for recipes, news, and Caribbean stories.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const imageUrl = post.image
                ? urlFor(post.image).width(600).height(400).url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-md"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-pink-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.publishedAt && (
                      <p className="text-xs font-medium text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <h2 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-primary transition line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                    )}
                    <span className="mt-3 inline-block text-sm font-medium text-primary">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
