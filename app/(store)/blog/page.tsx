// TODO: Fetch blog posts from Sanity
// import { client } from "@/sanity/client";

export default function BlogPage() {
  // TODO: Fetch posts
  // const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>

      <p className="text-gray-500">
        TODO: Fetch and display blog posts from Sanity
      </p>

      {/* TODO: Blog post cards grid */}
    </div>
  );
}
