"use client";

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

interface CategoryFilterProps {
  categories: Category[];
  selectedSlug?: string;
  onSelect: (slug: string | undefined) => void;
}

export default function CategoryFilter({
  categories,
  selectedSlug,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Categories</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onSelect(undefined)}
            className={`w-full text-left hover:text-primary ${
              !selectedSlug ? "font-bold text-primary" : ""
            }`}
          >
            All Products
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat._id}>
            <button
              onClick={() => onSelect(cat.slug.current)}
              className={`w-full text-left hover:text-primary ${
                selectedSlug === cat.slug.current
                  ? "font-bold text-primary"
                  : ""
              }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
