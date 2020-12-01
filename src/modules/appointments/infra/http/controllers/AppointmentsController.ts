import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body
    const userId = request.user.id

    const parsedDate = parseISO(date)

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      userId,
      providerId,
      date: parsedDate
    })

    return response.json(appointment)
  }
}
