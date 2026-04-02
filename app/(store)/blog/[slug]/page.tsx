// TODO: Fetch blog post by slug from Sanity
// import { client } from "@/sanity/client";

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // TODO: Fetch post data
  // const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: params.slug });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-gray-500">
        TODO: Fetch and render blog post for slug: {params.slug}
      </p>

      {/* TODO: Post title, image, date, and block content */}
    </div>
  );
}
