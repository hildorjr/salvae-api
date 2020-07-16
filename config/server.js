import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import setRoutes from './routes';

const server = express();
server.use(cors());
server.use(bodyParser.json());

const router = express.Router();
server.use('/api', router);
setRoutes(router);

export default server;
