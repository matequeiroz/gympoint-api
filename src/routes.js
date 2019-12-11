import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import auth from './app/middlewares/auth';

const routes = new Router();

/**
 * @author Mateus Queiroz
 * ROUTES HTTP GET, POST, PUT, DELETE
 */

routes.post('/user', UserController.store);
routes.post('/signin', SessionController.signin);

routes.post('/student', auth, StudentController.store);

export default routes;
