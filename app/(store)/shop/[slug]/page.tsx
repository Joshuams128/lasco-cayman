// TODO: Fetch product by slug from Sanity
// import { client } from "@/sanity/client";
// import { urlFor } from "@/sanity/image";

interface ProductDetailPageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // TODO: Fetch product data using params.slug
  // const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: params.slug });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-gray-500">
        TODO: Fetch and display product detail for slug: {params.slug}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* TODO: Product images gallery */}
        <div className="aspect-square rounded-lg bg-accent" />

        {/* TODO: Product info, price, add to cart */}
        <div>
          <h1 className="text-3xl font-bold">Product Name</h1>
          <p className="mt-2 text-2xl text-primary">$0.00</p>
          <p className="mt-4 text-gray-600">Product description goes here.</p>
          <button className="mt-6 rounded-lg bg-primary px-8 py-3 text-white hover:bg-primary/90">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
