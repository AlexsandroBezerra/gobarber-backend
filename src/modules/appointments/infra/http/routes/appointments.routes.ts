import { parseISO } from 'date-fns'
import { Router } from 'express'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointmentService = container.resolve(CreateAppointmentService)

  const appointment = await createAppointmentService.execute({
    providerId,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter
