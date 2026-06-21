export default {
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    {
      name: 'contactEmail',
      title: 'Email de contacto',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'formspreeId',
      title: 'Formspree ID',
      type: 'string',
      description: 'El ID del formulario de Formspree para el contacto',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' };
    },
  },
};
