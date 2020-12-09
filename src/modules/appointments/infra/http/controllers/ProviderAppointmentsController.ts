import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'
import { classToClass } from 'class-transformer'

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { day, mouth, year } = request.query
    const providerId = request.user.id

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    )

    const appointments = await listProviderAppointments.execute({
      providerId,
      day: Number(day),
      mouth: Number(mouth),
      year: Number(year)
    })

    return response.json(classToClass(appointments))
  }
}
