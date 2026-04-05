import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const client = createClient({
  projectId: "67u358so",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const IMAGES_DIR = resolve("public/images/product-imgs");

const products = [
  {
    name: "Lasco Baked Bean 400g (6 cans)",
    price: 6.72,
    image: "Baked-Beans-Mockup.png",
    category: "Canned Beans & Peas",
  },
  {
    name: "Lasco Broad Bean 400g (6 cans)",
    price: 7.0,
    image: "Broad-Bean.jpg",
    category: "Canned Beans & Peas",
  },
  {
    name: "Lasco Butter Bean 400g (6 cans)",
    price: 7.0,
    image: "Lasco-Butter-Beans.jpg",
    category: "Canned Beans & Peas",
  },
  {
    name: "Lasco Green Peas",
    price: 9.0,
    image: "Green-Peas.jpg",
    category: "Canned Beans & Peas",
  },
  {
    name: "Lasco Gungo Peas",
    price: 11.0,
    image: "pigeon peas.jpg",
    category: "Canned Beans & Peas",
  },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function getOrCreateCategory(name) {
  const slug = slugify(name);
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]`,
    { slug }
  );
  if (existing) return existing._id;

  const created = await client.create({
    _type: "category",
    name,
    slug: { _type: "slug", current: slug },
  });
  console.log(`  Created category: ${name}`);
  return created._id;
}

async function uploadImage(filename) {
  const filePath = resolve(IMAGES_DIR, filename);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename,
  });
  console.log(`  Uploaded image: ${filename}`);
  return asset._id;
}

async function seed() {
  console.log("Seeding products to Sanity...\n");

  for (const product of products) {
    const slug = slugify(product.name);

    // Check if product already exists
    const existing = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug }
    );
    if (existing) {
      console.log(`Skipping "${product.name}" (already exists)`);
      continue;
    }

    // Get or create category
    const categoryId = await getOrCreateCategory(product.category);

    // Upload image
    const imageAssetId = await uploadImage(product.image);

    // Create product
    await client.create({
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: slug },
      price: product.price,
      category: { _type: "reference", _ref: categoryId },
      images: [
        {
          _type: "image",
          _key: "img0",
          asset: { _type: "reference", _ref: imageAssetId },
        },
      ],
      inStock: true,
      featured: false,
    });

    console.log(`Created: ${product.name}`);
  }

  console.log("\nDone! All products seeded.");
}

seed().catch(console.error);
