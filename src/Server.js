import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './routes';
import Database from './database';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class for configure instance of express.
 * Here configuring routes, middlewares and database.
 */

class Server {
  constructor() {
    // loader dotenv
    dotenv.config();
    this.app = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  database() {
    // loader db config
    new Database();
  }

  middlewares() {
    // add security
    this.app.use(helmet());

    // add suport for request and response in JSON
    this.app.use(express.json());

    // add loggins in app
    this.app.use(
      morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common')
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new Server().app;
