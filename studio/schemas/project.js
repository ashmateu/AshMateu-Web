export default {
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Orden en la grilla',
      type: 'number',
      description: 'Número menor aparece primero',
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Celebrity Styling', value: 'Celebrity Styling' },
          { title: 'Dirección Creativa', value: 'Dirección Creativa' },
          { title: 'Editorial', value: 'Editorial' },
          { title: 'Campaña', value: 'Campaña' },
        ],
      },
    },
    {
      name: 'location',
      title: 'Locación',
      type: 'string',
      placeholder: 'Buenos Aires / Nueva York',
    },
    {
      name: 'stripMeta',
      title: 'Texto en grilla del home',
      type: 'string',
      description: 'Ej: Styling — Portada — Nueva York 2023',
    },
    {
      name: 'heroImage',
      title: 'Imagen principal (hero)',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroImageAlt',
      title: 'Alt de imagen principal',
      type: 'string',
    },
    {
      name: 'lede',
      title: 'Frase de apertura',
      type: 'text',
      rows: 2,
      description: 'La frase grande que aparece bajo el hero.',
    },
    {
      name: 'blocks',
      title: 'Bloques de contenido',
      type: 'array',
      of: [{ type: 'contentBlock' }],
    },
    {
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [{ type: 'credit' }],
    },
    {
      name: 'nextProject',
      title: 'Siguiente proyecto',
      type: 'reference',
      to: [{ type: 'project' }],
    },
    {
      name: 'localStripImage',
      title: 'Imagen grilla — ruta local',
      type: 'string',
      description: 'Ej: images/extracted/dolores-fonzi/img-003.webp',
    },
    {
      name: 'localHeroImage',
      title: 'Imagen hero — ruta local',
      type: 'string',
      description: 'Ej: images/extracted/dolores-fonzi/img-003.webp',
    },
    {
      name: 'seoDescription',
      title: 'Descripción SEO',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
  orderings: [
    {
      title: 'Orden en grilla',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
