import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes';

import errorHandler from '../src/middlewares/errorHandler';
import notFound from '../src/middlewares/notFound';

const server = express();

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());
server.use(cors());
server.use(routes);
server.use(notFound);
server.use(errorHandler);

export default server;
