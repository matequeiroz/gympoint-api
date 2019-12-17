import Plan from '../models/Plan';
import { schemaPlanStore } from '../validators/PlanController';

class PlanController {
  async store(req, res) {
    try {
      try {
        // validate request body
        await schemaPlanStore.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          payload: {},
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }
      if (
        await Plan.findOne({
          where: {
            title: req.body.title,
          },
        })
      ) {
        return res.status(401).json({
          errors: [
            {
              message: 'Plan already register',
            },
          ],
        });
      }

      const plan = await Plan.create(req.body);
      return res.status(201).json(plan);
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

      const plans = await Plan.findAll({
        attributes: ['id', 'title', 'duration', 'price_monthly'],
        limit: 6,
        offset: (page - 1) * 6,
        order: ['created_at'],
      });

      return res.json(plans);
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

  async destroy(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).json({
          errors: [
            {
              message: 'Id not provider',
            },
          ],
        });

      const student = await Plan.findOne({
        where: {
          id,
        },
      });

      if (!student)
        return res.status(404).json({
          errors: [
            {
              message: 'Plan not exist',
            },
          ],
        });

      await Plan.destroy({
        where: {
          id,
        },
      });

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

export default new PlanController();
