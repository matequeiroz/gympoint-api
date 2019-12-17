import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import databaseConfig from '../config/database';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class for loader all models in app
 */
class Database {
  constructor() {
    this.models = [User, Student, Plan];
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    this.models.map(model => model.init(this.connection));
  }
}

export default Database;
