import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import auth from './app/middlewares/auth';

const routes = new Router();

/**
 * @author Mateus Queiroz
 * ROUTES HTTP GET, POST, PUT, DELETE
 */

routes.post('/user', UserController.store);

routes.post('/signin', SessionController.signin);

routes.post('/plan', auth, PlanController.store);
routes.delete('/plan/:id', auth, PlanController.destroy);
routes.put('/plan/:id', auth, PlanController.update);
routes.get('/plans', auth, PlanController.index);

routes.post('/student', auth, StudentController.store);
routes.delete('/student/:id', auth, StudentController.destroy);

export default routes;
