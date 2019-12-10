import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

const routes = new Router();

/**
 * @author Mateus Queiroz
 * ROUTES HTTP GET, POST, PUT, DELETE
 */

export default routes;
