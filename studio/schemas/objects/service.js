export default {
  name: 'service',
  title: 'Servicio',
  type: 'object',
  fields: [
    { name: 'title', title: 'Título', type: 'string' },
    { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
  ],
  preview: {
    select: { title: 'title' },
  },
};
