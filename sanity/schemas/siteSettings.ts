import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
            }),
            defineField({
              name: "subheading",
              title: "Subheading",
              type: "string",
            }),
          ],
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
