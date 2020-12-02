import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import ProvidersController from '../controllers/ProvidersController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMouthAvailabilityController from '../controllers/ProviderMouthAvailabilityController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMouthAvailabilityController = new ProviderMouthAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.index)

providersRouter.get(
  '/:providerId/mouth-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required()
    }
  }),
  providerMouthAvailabilityController.index
)
providersRouter.get(
  '/:providerId/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required()
    }
  }),
  providerDayAvailabilityController.index
)

export default providersRouter
