import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';

/**
 * @author Mateus Queiroz
 * @class
 * @description Model of user
 */
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
        /**
         * define name of table
         * */
        tableName: 'tb_users',
      }
    );

    // add hooks for before persist user, encrypt this password
    this.addHook('beforeSave', async user => {
      user.password = await hash(user.password, 10);
    });

    return this;
  }

  checkPassword(password) {
    return compare(password, this.password);
  }
}

export default User;
