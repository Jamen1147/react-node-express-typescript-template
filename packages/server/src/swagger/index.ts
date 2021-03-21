import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Template Api Server Doc',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerSetups = [swaggerUI.serve, swaggerUI.setup(swaggerDocs)];

export default swaggerSetups;
