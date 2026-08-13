import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      description:
        "Leave empty to use the three built-in slides. Product images should be transparent PNG/WebP cutouts.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "eyebrow",
              title: "Eyebrow",
              description: "Small label above the headline, e.g. 'Pantry Staples'.",
              type: "string",
            }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
            }),
            defineField({
              name: "subheading",
              title: "Subheading",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "chips",
              title: "Feature Chips",
              description: "Short claims shown as pills, e.g. 'Free delivery over CI$99'.",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
            defineField({
              name: "theme",
              title: "Colour Theme",
              type: "string",
              options: {
                list: [
                  { title: "Magenta", value: "magenta" },
                  { title: "Sea / Teal", value: "sea" },
                  { title: "Sun / Orange", value: "sun" },
                ],
                layout: "radio",
              },
              initialValue: "magenta",
            }),
            defineField({
              name: "products",
              title: "Product Cutouts",
              description:
                "Up to 4 transparent product images, shown staggered beside the text.",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              validation: (Rule) => Rule.max(4),
            }),
            defineField({
              name: "ctaLabel",
              title: "Button Label",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "Button Link",
              type: "string",
              initialValue: "/shop",
            }),
            defineField({
              name: "image",
              title: "Background Photo (optional)",
              description:
                "Only set this if you want a full-bleed photo instead of the colour theme.",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "eyebrow", media: "products.0" },
          },
        },
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Info",
      description: "Shown on the Contact page. Leave fields empty to fall back to the current defaults in code.",
      type: "object",
      fields: [
        defineField({ name: "address", title: "Address", type: "text" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
        defineField({
          name: "hours",
          title: "Business Hours",
          type: "array",
          of: [{ type: "string" }],
          description: "Optional, e.g. 'Mon–Fri: 8am–5pm'. Leave empty to hide the hours block.",
        }),
      ],
    }),
    defineField({
      name: "commercialVideos",
      title: "Commercial Videos",
      description: "YouTube commercials shown on the Commercials page. Leave empty to fall back to the current defaults in code.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "youtubeId",
              title: "YouTube Video ID",
              type: "string",
              description: "The id portion of the YouTube URL, e.g. n1d-7ZjgPFA",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "youtubeId" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
