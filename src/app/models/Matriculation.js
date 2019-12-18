import Sequelize, { Model } from 'sequelize';

/**
 * @author Mateus Queiroz
 * @class
 * @description Model of Matriculation
 */
class Matriculation extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
        // define name table
        tableName: 'tb_matriculation',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}

export default Matriculation;
