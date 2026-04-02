// TODO: Fetch products and categories from Sanity
// import { client } from "@/sanity/client";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shop</h1>

      <div className="flex gap-8">
        {/* TODO: CategoryFilter sidebar */}
        <aside className="w-64 shrink-0">
          <p className="text-gray-500">
            TODO: Fetch categories and render CategoryFilter
          </p>
        </aside>

        {/* TODO: ProductGrid */}
        <div className="flex-1">
          <p className="text-gray-500">
            TODO: Fetch products and render ProductGrid
          </p>
        </div>
      </div>
    </div>
  );
}
