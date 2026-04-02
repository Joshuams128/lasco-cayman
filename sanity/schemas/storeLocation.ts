import { defineField, defineType } from "sanity";

export const storeLocation = defineType({
  name: "storeLocation",
  title: "Store Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Store Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "string",
    }),
  ],
});
