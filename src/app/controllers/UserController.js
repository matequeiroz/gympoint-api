import jwt from 'jsonwebtoken';
import User from '../models/User';
import { schemaUserStore } from '../validators/UserController';

/**
 * @author Mateus Queiroz
 * @description Class for controled user operations
 * @class
 */

class UserController {
  /**
   *  @author Mateus Queiroz
   *  @description Method used for create new users
   */
  async store(req, res) {
    try {
      try {
        await schemaUserStore.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }
      const { username, email } = req.body;
      // verify if exist one user with username provider
      const userExistWithUsername = await User.findOne({ where: { username } });

      if (userExistWithUsername) {
        return res.status(400).json({
          errors: [
            {
              message: 'Username is already used',
            },
          ],
        });
      }
      // verify if exist one user with email provider
      const userExistWithEmail = await User.findOne({ where: { email } });

      if (userExistWithEmail) {
        return res.status(400).json({
          errors: [
            {
              message: 'Email is already used',
            },
          ],
        });
      }
      // persist user in database
      const { id } = await User.create(req.body);
      return res.status(201).json({
        payload: {
          user: {
            id,
            username,
            email,
          },
          // generate token JWT
          token: jwt.sign({ id }, process.env.APP_SECRET, {
            expiresIn: process.env.JWT_EXPIRE_IN,
          }),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errors: [
          {
            message: 'Internal server error',
          },
        ],
      });
    }
  }
}

export default new UserController();
