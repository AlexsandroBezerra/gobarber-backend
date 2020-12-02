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
  providerMouthAvailabilityController.index
)
providersRouter.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.index
)

export default providersRouter
