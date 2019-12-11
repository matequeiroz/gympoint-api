import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async store(req, res) {
    try {
      const { email } = req.body;

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
