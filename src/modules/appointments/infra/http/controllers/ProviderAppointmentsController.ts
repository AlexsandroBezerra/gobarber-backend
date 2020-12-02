import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { day, mouth, year } = request.body
    const providerId = request.user.id

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    )

    const appointments = await listProviderAppointments.execute({
      providerId,
      day,
      mouth,
      year
    })

    return response.json(appointments)
  }
}
