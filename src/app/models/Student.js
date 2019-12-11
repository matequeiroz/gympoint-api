import Sequelize, { Model } from 'sequelize';

/**
 * @author Mateus Queiroz
 * @class
 * @description Model of student
 */
class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,

        // define name table
        tableName: 'tb_students',
      }
    );

    return this;
  }
}

export default Student;
