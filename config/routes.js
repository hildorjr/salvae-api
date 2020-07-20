import express from 'express';

import NoteController from './../src/controllers/note.controller';
import UserController from './../src/controllers/user.controller';
import AuthMiddleware from '../src/middlewares/auth'

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({
    name: 'salvae-api',
    version: '1.0.0',
  });
});

// User
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

// Notes
routes.use('/notes', AuthMiddleware);

routes.get('/notes', NoteController.getAll);
routes.post('/notes', NoteController.create);
routes.put('/notes/:id', NoteController.update);
routes.delete('/notes/:id', NoteController.delete);

module.exports = routes;