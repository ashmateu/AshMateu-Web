export default {
  name: 'credit',
  title: 'Crédito',
  type: 'object',
  fields: [
    { name: 'key', title: 'Rol', type: 'string', placeholder: 'Styling' },
    { name: 'value', title: 'Nombre', type: 'string', placeholder: 'Ash Mateu' },
  ],
  preview: {
    select: { title: 'key', subtitle: 'value' },
  },
};
