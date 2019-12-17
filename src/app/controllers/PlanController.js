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
}

export default new PlanController();
