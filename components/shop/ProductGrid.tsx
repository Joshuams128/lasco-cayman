import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  imageUrl?: string;
  inStock: boolean;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          slug={product.slug.current}
          price={product.price}
          salePrice={product.salePrice}
          imageUrl={product.imageUrl}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}
