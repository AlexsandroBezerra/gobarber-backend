import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('oldPassword', { is: Joi.required(), then: Joi.required() })
    }
  }),
  profileController.update
)

export default profileRouter
