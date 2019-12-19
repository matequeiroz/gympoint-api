import Sequelize, { Model } from 'sequelize';

/**
 * @author Mateus Queiroz
 * @class
 * @description Model of HelpOrder
 */
class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
        // define name table
        tableName: 'tb_help_orders',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
