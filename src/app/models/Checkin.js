import { Model } from 'sequelize';

/**
 * @author Mateus Queiroz
 * @class
 * @description Model of Checkin
 */
class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        // define name table
        tableName: 'tb_checkins',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Checkin;
