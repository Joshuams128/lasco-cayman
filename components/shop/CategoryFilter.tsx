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
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-warm-muted">Categories</h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onSelect(undefined)}
            className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
              !selectedSlug
                ? "bg-primary font-semibold text-white shadow-sm"
                : "text-charcoal/70 hover:bg-warm-gray hover:text-charcoal"
            }`}
          >
            All Products
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat._id}>
            <button
              onClick={() => onSelect(cat.slug.current)}
              className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                selectedSlug === cat.slug.current
                  ? "bg-primary font-semibold text-white shadow-sm"
                  : "text-charcoal/70 hover:bg-warm-gray hover:text-charcoal"
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
