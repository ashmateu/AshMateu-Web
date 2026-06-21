export default {
  name: 'contentBlock',
  title: 'Bloque de contenido',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'imageAlt',
      title: 'Alt de imagen',
      type: 'string',
    },
    {
      name: 'reversed',
      title: 'Imagen a la derecha',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'heading',
      title: 'Título del bloque',
      type: 'string',
    },
    {
      name: 'localImage',
      title: 'Imagen — ruta local',
      type: 'string',
      description: 'Ej: ../images/extracted/dolores-fonzi/img-005.webp',
    },
    {
      name: 'body',
      title: 'Texto',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Bloque sin título' };
    },
  },
};
