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
  // Canned Vegetables
  { name: "Lasco Ackee 10 ozs (3 cans)", price: 17.00, category: "Canned Vegetables" },
  { name: "Lasco Mixed Vegetable 400g (6 cans)", price: 10.00, image: "Mixed-Vegetables.jpg", category: "Canned Vegetables" },
  { name: "Lasco Sweet Corn 400g (6 cans)", price: 11.00, image: "Sweet-Corn.jpg", category: "Canned Vegetables" },

  // Lasco Food Drink
  { name: "Lasco Food Drink - Creamy Malt 120g (6 packs)", price: 8.00, category: "Lasco Food Drink" },
  { name: "Lasco Food Drink - Peanut Punch 120g (6 cans)", price: 8.00, category: "Lasco Food Drink" },
  { name: "Lasco Food Drink - Strawberry 120g (6 packs)", price: 8.00, category: "Lasco Food Drink" },
  { name: "Lasco Food Drink - Vanilla 120g (6 packs)", price: 8.00, category: "Lasco Food Drink" },
  { name: "Lasco Irish Moss - Oats 10ozs (6 cans)", price: 13.00, category: "Lasco Food Drink" },
  { name: "Lasoy Milk Free - Original 120g (6 packs)", price: 8.00, category: "Lasco Food Drink" },
  { name: "Lasoy Milk Free - Strawberry 120g (6 packs)", price: 8.00, category: "Lasco Food Drink" },
  { name: "Lasoy Milk Free - Malt 120g (6 packs)", price: 8.00, category: "Lasco Food Drink" },

  // Juices and Water
  { name: "ICOOL Juice Drink - Apple 500ml (6 bottles)", price: 4.00, category: "Juices and Water" },
  { name: "ICOOL Juice Drink - Fruit Punch 500ml (6 bottles)", price: 4.00, category: "Juices and Water" },
  { name: "ICOOL Juice Drink - Grape 500ml (6 bottles)", price: 4.00, category: "Juices and Water" },
  { name: "ICOOL Juice Drink - Mellon Berry 500ml (6 bottles)", price: 4.00, category: "Juices and Water" },
  { name: "ICOOL Juice Drink - Passion Fruit 500ml (6 bottles)", price: 4.00, inStock: false, category: "Juices and Water" },
  { name: "ICOOL Juice Drink - Tangerine 500ml (6 bottles)", price: 4.00, inStock: false, category: "Juices and Water" },
  { name: "Lasco ICOOL Water 600ml (24 bottles)", price: 5.00, inStock: false, category: "Juices and Water" },
  { name: "Lasco Water 6 Litre (4 bottles)", price: 10.00, category: "Juices and Water" },

  // Syrups and Canned Beverages
  { name: "Lasco Irish Moss - Peanut 10ozs (6 cans)", price: 14.00, category: "Syrups and Canned Beverages" },
  { name: "Lasco Irish Moss - Vanilla 10ozs (6 cans)", price: 13.00, category: "Syrups and Canned Beverages" },
  { name: "Lasco Syrup - Cherry 750ml (6 bottles)", price: 11.00, category: "Syrups and Canned Beverages" },
  { name: "Lasco Syrup - Kola Champaigne 750ml (6 bottles)", price: 11.00, category: "Syrups and Canned Beverages" },
  { name: "Lasco Syrup - Strawberry 750ml (6 bottles)", price: 11.00, category: "Syrups and Canned Beverages" },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categoryCache = {};

async function getOrCreateCategory(name) {
  if (categoryCache[name]) return categoryCache[name];
  const slug = slugify(name);
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]`,
    { slug }
  );
  if (existing) {
    categoryCache[name] = existing._id;
    return existing._id;
  }

  const created = await client.create({
    _type: "category",
    name,
    slug: { _type: "slug", current: slug },
  });
  console.log(`  Created category: ${name}`);
  categoryCache[name] = created._id;
  return created._id;
}

async function uploadImage(filename) {
  const filePath = resolve(IMAGES_DIR, filename);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`  Uploaded image: ${filename}`);
  return asset._id;
}

async function seed() {
  console.log("Seeding products to Sanity...\n");

  for (const product of products) {
    const slug = slugify(product.name);

    const existing = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug }
    );
    if (existing) {
      console.log(`Skipping "${product.name}" (already exists)`);
      continue;
    }

    const categoryId = await getOrCreateCategory(product.category);

    const doc = {
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: slug },
      price: product.price,
      category: { _type: "reference", _ref: categoryId },
      inStock: product.inStock !== undefined ? product.inStock : true,
      featured: false,
    };

    if (product.image) {
      const imageAssetId = await uploadImage(product.image);
      doc.images = [
        {
          _type: "image",
          _key: "img0",
          asset: { _type: "reference", _ref: imageAssetId },
        },
      ];
    }

    await client.create(doc);
    console.log(`Created: ${product.name}${product.image ? "" : " (no image)"}`);
  }

  console.log("\nDone!");
}

seed().catch(console.error);
