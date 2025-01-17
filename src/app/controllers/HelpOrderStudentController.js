import { schemaHelpOrderStore } from '../validators/HelpOrderStudentController';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

/**
 * @author Mateus Queiroz
 * @description Class controller for operations of Help Order of Students
 * @class
 */
class HelpOrderStudentController {
  /**
   * @author Mateus Queiroz
   * @description Method for create new help order
   */
  async store(req, res) {
    try {
      try {
        // validate of request
        await schemaHelpOrderStore.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }

      const { id: student_id } = req.params;

      // get student and verify if this exists
      if (!(await Student.findByPk(student_id))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Student not exists',
            },
          ],
        });
      }

      // create new Help Order
      const { question } = req.body;
      const { id, createdAt } = await HelpOrder.create({
        student_id,
        question,
      });
      return res.status(201).json({ id, createdAt, question });
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

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const { id: student_id } = req.params;

      if (!(await Student.findByPk(student_id))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Student not exists',
            },
          ],
        });
      }

      // get all helpers orders of student paginate by 12 records
      const { count: total, rows: data } = await HelpOrder.findAndCountAll({
        where: {
          student_id,
        },
        attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
        limit: 12,
        offset: (page - 1) * 12,
      });

      return res.json({
        total,
        data,
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

export default new HelpOrderStudentController();
