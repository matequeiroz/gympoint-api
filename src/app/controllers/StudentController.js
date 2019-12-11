import Student from '../models/Student';
import User from '../models/User';
import { schemaUserStore } from '../validators/StudentController';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class for operations of Student
 */
class StudentController {
  /**
   * @author Mateus Queiroz
   * @description Method for create new student
   * @method store
   */
  async store(req, res) {
    try {
      try {
        // validate of request
        await schemaUserStore.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }

      const { email } = req.body;

      // verify if this email provider is alredy used
      const existsUserWithEmail = await User.findOne({ where: { email } });
      const existsStudentWithEmail = await Student.findOne({
        where: { email },
      });

      if (existsUserWithEmail || existsStudentWithEmail) {
        return res.status(400).json({
          errors: [
            {
              message: 'Email already used',
            },
          ],
        });
      }

      // persist new student
      const { id, name } = await Student.create(req.body);

      return res.status(201).json({
        payload: { id, name },
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

export default new StudentController();
