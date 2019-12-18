import Plan from '../models/Plan';
import {
  schemaPlanStore,
  schemaPlanUpdate,
} from '../validators/PlanController';

/**
 * @author Mateus Queiroz
 * @class
 * @description Class Controller for operations of plans
 */
class PlanController {
  /**
   * @method store
   * @description Method for create new plan
   */
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

      // verify if exist plan with this title
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

      // persist plan in database
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
  /**
   * @author Mateus Queiroz
   * @description List all plans
   * @method index
   */
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

  /**
   * @author Mateus Queiroz
   * @description Remove one plan
   * @method destroy
   */
  async destroy(req, res) {
    try {
      const { id } = req.params;

      // verify if plan with id exists
      if (!(await Plan.findOne({ where: { id } }))) {
        return res.status(404).json({
          errors: [
            {
              message: 'Plan not exists',
            },
          ],
        });
      }

      // destroy plan of database
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

  /**
   * @author Mateus Queiroz
   * @description Update one plan
   * @method update
   */
  async update(req, res) {
    try {
      try {
        // validate request body
        await schemaPlanUpdate.validate(req.body);
      } catch (error) {
        return res.status(400).json({
          payload: {},
          errors: [{ field: error.path, message: error.errors[0] }],
        });
      }

      const { id } = req.params;
      const { title } = req.body;

      // get plan by id
      const plan = await Plan.findByPk(id);

      // verify if plan exists
      if (!plan) {
        return res.status(404).json({
          errors: [
            {
              message: 'Plan not found',
            },
          ],
        });
      }

      /**
       * Here we check whether the user needs to
       * update the plan title and whether he has
       * entered a different title than the current
       * plan title.
       */
      if (title && title !== plan.title) {
        if (
          await Plan.findOne({
            where: {
              title,
            },
          })
        ) {
          return res.status(401).json({
            errors: [
              {
                message: 'Already plan with title',
              },
            ],
          });
        }

        // here we update the plan
        await Plan.update(req.body, {
          where: {
            id,
          },
        });

        return res.status(204).end();
      }

      // here we update the plan
      await Plan.update(req.body, {
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
