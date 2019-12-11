import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

/**
 * @author Mateus Queiroz
 * ROUTES HTTP GET, POST, PUT, DELETE
 */

routes.post('/user', UserController.store);
routes.post('/signin', SessionController.signin);

export default routes;
