import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { _ref: string } };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

async function getPost(slug: string) {
  return client.fetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, image, body
    }`,
    { slug }
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.image
    ? urlFor(post.image).width(1200).height(600).url()
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
      >
        &larr; Back to Blog
      </Link>

      <article>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{post.title}</h1>

        {post.publishedAt && (
          <p className="mt-3 text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {imageUrl && (
          <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.body && (
          <div className="prose prose-gray mt-8 max-w-none prose-headings:text-gray-900 prose-a:text-primary">
            <PortableText value={post.body} />
          </div>
        )}
      </article>
    </div>
  );
}
