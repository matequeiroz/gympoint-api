import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MatriculationController from './app/controllers/MatriculationController';
import CheckinController from './app/controllers/CheckinController';
import auth from './app/middlewares/auth';

const routes = new Router();

/**
 * @author Mateus Queiroz
 * ROUTES HTTP GET, POST, PUT, DELETE
 */

// routes of users
routes.post('/user', UserController.store);

// routes of authentication
routes.post('/signin', SessionController.signin);

// routes of plans
routes.post('/plan', auth, PlanController.store);
routes.delete('/plan/:id', auth, PlanController.destroy);
routes.put('/plan/:id', auth, PlanController.update);
routes.get('/plans', auth, PlanController.index);

// routes of students
routes.post('/student', auth, StudentController.store);
routes.get('/students', auth, StudentController.index);
routes.delete('/student/:id', auth, StudentController.destroy);
routes.post('/student/:id/checkin', CheckinController.store);

// routes of matriculations
routes.post('/matriculation', auth, MatriculationController.store);
routes.get('/matriculation/:id', auth, MatriculationController.show);
routes.delete('/matriculation/:id', auth, MatriculationController.destroy);

export default routes;
