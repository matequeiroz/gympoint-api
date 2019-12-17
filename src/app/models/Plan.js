import Sequelize, { Model } from 'sequelize';

/**
 * @author Mateus Queiroz
 * @class
 * @description Model of Plan
 */
class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price_monthly: Sequelize.FLOAT,
      },
      {
        sequelize,
        // define name table
        tableName: 'tb_plans',
      }
    );

    return this;
  }
}

export default Plan;
