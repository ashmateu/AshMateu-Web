export default {
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'heroEyebrow',
      title: 'Hero — Eyebrow',
      type: 'string',
      initialValue: 'Ash Mateu',
    },
    {
      name: 'heroTitle',
      title: 'Hero — Título principal',
      type: 'text',
      rows: 2,
    },
    {
      name: 'heroSubtitle',
      title: 'Hero — Subtítulo',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroLocations',
      title: 'Hero — Locaciones (pie)',
      type: 'string',
      initialValue: 'Buenos Aires — Nueva York — París',
    },
    {
      name: 'aboutHeadline',
      title: 'About — Headline',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'About — Bio',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'aboutVideoUrl',
      title: 'About — URL de video (YouTube)',
      type: 'url',
    },
    {
      name: 'services',
      title: 'Servicios',
      type: 'array',
      of: [{ type: 'service' }],
    },
    {
      name: 'contactHeadline',
      title: 'Contacto — Headline',
      type: 'string',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Home' };
    },
  },
};
