import jwt from 'jsonwebtoken';
import User from '../models/User';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class for login and logout of user
 */

class SessionController {
  /**
   * @author Mateus Queiroz
   * @description Method used for signin of valid user
   * @returns JWT Token
   * @method signin
   *
   */
  async signin(req, res) {
    const { password, username } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        payload: {},
        errors: [{ message: 'User not found' }],
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        payload: {},
        errors: [{ message: 'Password not valid' }],
      });
    }

    return res.status(200).json({
      payload: {
        token: jwt.sign({ id: user.id }, process.env.APP_SECRET, {
          expiresIn: process.env.JWT_EXPIRE_IN,
        }),
      },
    });
  }
}

export default new SessionController();
