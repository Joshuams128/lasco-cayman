import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { schema } from './sanity/schema'

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products by Category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .child((categoryId) =>
              S.documentList()
                .title('Products')
                .filter('_type == "product" && category._ref == $categoryId')
                .params({ categoryId })
                .defaultOrdering([{ field: 'name', direction: 'asc' }])
            )
        ),
      S.listItem()
        .title('All Products')
        .child(
          S.documentTypeList('product')
            .title('All Products')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['product'].includes(item.getId() ?? '')
      ),
    ])

export default defineConfig({
  name: 'lasco-cayman',
  title: 'Lasco Cayman',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: schema.types,
  },
})
