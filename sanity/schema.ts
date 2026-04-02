import { type SchemaTypeDefinition } from "sanity";
import { product } from "./schemas/product";
import { category } from "./schemas/category";
import { order } from "./schemas/order";
import { storeLocation } from "./schemas/storeLocation";
import { post } from "./schemas/post";
import { faq } from "./schemas/faq";
import { siteSettings } from "./schemas/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, order, storeLocation, post, faq, siteSettings],
};
