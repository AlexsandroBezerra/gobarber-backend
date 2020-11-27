import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointmentService = container.resolve(CreateAppointmentService)

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate
    })

    return response.json(appointment)
  }
}
