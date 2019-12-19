import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import { schemaHelpOrderStore } from '../validators/HelpOrderController';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class for control operations of help orders for academy
 */
class HelpOrderController {
  /**
   * @author Mateus Queiroz
   * @method index
   * @description return all help orders filter by help orders 'open', 'closed' or 'all'
   */
  async index(req, res) {
    try {
      const { page = 1, status = '' } = req.query;

      // get all help order basead in status query param
      const { count: total, rows: data } = await HelpOrder.findAndCountAll({
        where: {
          answer:
            status === 'answer'
              ? { [Op.ne]: true }
              : status === 'all'
              ? { [Op.or]: [{ [Op.is]: null }, { [Op.is]: false }] }
              : null,
        },
        attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
        include: {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        limit: 12,
        offset: (page - 1) * 12,
        order: ['created_at'],
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

  /**
   * @author Mateus Queiroz
   * @method update
   * @description update help order
   */
  async update(req, res) {
    try {
      try {
        // validate of request
        await schemaHelpOrderStore.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }
      const { id } = req.params;

      if (!(await HelpOrder.findByPk(id))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Help order not found',
            },
          ],
        });
      }

      const { answer } = req.body;

      await HelpOrder.update(
        { answer, answer_at: new Date() },
        {
          where: {
            id,
          },
          limit: 1,
        }
      );

      return res.status(204).end();
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

export default new HelpOrderController();
