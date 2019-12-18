import { isBefore, getDate } from 'date-fns';
import Matriculation from '../models/Matriculation';
import Student from '../models/Student';
import Plan from '../models/Plan';
import { schemaMatriculationStore } from '../validators/MatriculationController';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class controller for operations of matriculations
 */
class MatriculationController {
  /**
   * @author Mateus Queiroz
   * @method store
   * @description Method for create one matriculation
   */
  async store(req, res) {
    try {
      try {
        // validate of request
        await schemaMatriculationStore.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }

      // get attributes of request body
      const {
        studentId: student_id,
        planId: plan_id,
        startDate: start_date,
      } = req.body;

      // verify if student exists
      if (!(await Student.findByPk(student_id))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Student not exists',
            },
          ],
        });
      }

      const plan = await Plan.findByPk(plan_id);

      // verify if plan exists and active
      if (!plan) {
        return res.status(404).json({
          errors: [
            {
              message: 'Plan not exists',
            },
          ],
        });
      }

      const matriculation = await Matriculation.findOne({
        where: {
          student_id,
        },
      });

      /**
       * verify if student already have one matriculation
       * and if this matriculation is active
       */
      if (matriculation && !isBefore(matriculation.end_date, new Date())) {
        return res.status(401).json({
          errors: [
            {
              message: 'Student have matriculation active',
            },
          ],
        });
      }

      /**
       * here create this matriculaiton with calc price and end date
       */
      const { id, end_date: endDate, price } = await Matriculation.create({
        student_id,
        plan_id,
        start_date,
        price: plan.duration * plan.price_monthly,
        // calc end date of matriculation
        end_date: new Date(
          new Date(start_date).getFullYear(),
          new Date(start_date).getMonth() + plan.duration,
          getDate(new Date())
        ),
      });

      return res.status(201).json({
        id,
        studentId: student_id,
        planId: plan_id,
        startDate: start_date,
        endDate,
        price,
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

export default new MatriculationController();
