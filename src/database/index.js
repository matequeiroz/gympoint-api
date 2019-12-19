import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Matriculation from '../app/models/Matriculation';
import Checkin from '../app/models/Checkin';
import databaseConfig from '../config/database';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class for loader all models in app
 */
class Database {
  constructor() {
    this.models = [User, Student, Plan, Matriculation, Checkin];
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    this.models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default Database;
