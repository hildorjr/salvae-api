import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

import errorHandler from '../src/middlewares/errorHandler';
import notFound from '../src/middlewares/notFound';

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Salvae API',
      version: '1.0.0',
      description: 'Salvae REST API documentation.',
      contact: {
        name: 'Hildor Júnior',
        url: 'https://hildor.com.br',
        email: 'hildorjunior@gmail.com',
      },
      servers: ['http://localhost']
    }
  },
  apis: [
    './config/routes.js',
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());
app.use(routes);
app.use(notFound);
app.use(errorHandler);

export default app;
