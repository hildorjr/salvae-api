import NoteController from './../src/controllers/note.controller';
import UserController from './../src/controllers/user.controller';
import AuthMiddleware from '../src/middlewares/auth'

export default (router) => {

  // User
  router.post('/register', UserController.register);
  router.post('/login', UserController.login);

  // Notes
  router.use('/notes', AuthMiddleware);

  router.get('/notes', NoteController.getAll);
  router.post('/notes', NoteController.create);
  router.put('/notes/:id', NoteController.update);
  router.delete('/notes/:id', NoteController.delete);
}