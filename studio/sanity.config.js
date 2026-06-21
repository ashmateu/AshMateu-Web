import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'ashmateu',
  title: 'Ash Mateu',

  projectId: 'p3c01d1l',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Home')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('Configuración del sitio')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Proyectos'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
