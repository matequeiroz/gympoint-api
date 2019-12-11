import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

/**
 * @author Mateus Queiroz
 * ROUTES HTTP GET, POST, PUT, DELETE
 */

routes.post('/user', UserController.store);

export default routes;
