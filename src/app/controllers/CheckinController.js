import { Op } from 'sequelize';
import { startOfWeek, endOfWeek } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

/**
 * @author Mateus Queiroz
 * @description Class controller for operations checkins of students
 * @class
 */
class CheckinController {
  /**
   * @author Mateus Queiroz
   * @description Create new checkin of student
   */
  async store(req, res) {
    try {
      // get id provider of student
      const { id: student_id } = req.params;

      // verify if student exists in database
      if (!(await Student.findByPk(student_id))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Student not exists',
            },
          ],
        });
      }

      /**
       * In compliance with the requirement that the student can only
       * perform 5 checkins per week, we have verified how many
       * checkins he has performed from beginning to end of the
       * current week.
       */
      const { count: totalCheckins } = await Checkin.findAndCountAll({
        where: {
          student_id,
          created_at: {
            [Op.between]: [
              startOfWeek(new Date(), {
                weekStartsOn: 1,
              }),
              endOfWeek(new Date(), {
                weekStartsOn: 1,
              }),
            ],
          },
        },
      });

      // check if the student has already done 5 check ins in the week
      if (totalCheckins === 5) {
        return res.status(401).json({
          errors: [
            {
              message:
                'you have already completed all available check ins for this week',
              checkinsOfWeek: totalCheckins,
            },
          ],
        });
      }

      // create new check in in database
      const { id, student_id: studentId, createdAt } = await Checkin.create({
        student_id,
      });
      return res.status(201).json({
        id,
        studentId,
        createdAt,
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

  /**
   * @author Mateus Queiroz
   * @description List all check ins of student
   * @async
   */
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id: student_id } = req.params;

    try {
      // verify if student exists in database
      if (!(await Student.findByPk(student_id))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Student not exists',
            },
          ],
        });
      }

      // get all check ins by paginate with limit 5
      const { count: total, rows: data } = await Checkin.findAndCountAll({
        where: {
          student_id,
        },
        attributes: ['id', 'createdAt'],
        include: {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        limit: 5,
        offset: (page - 1) * 5,
      });

      return res.status(200).json({ total, data });
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

export default new CheckinController();
