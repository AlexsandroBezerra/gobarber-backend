import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../../../repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointmentService = new CreateAppointmentService()

  const appointment = await createAppointmentService.execute({
    providerId,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter
