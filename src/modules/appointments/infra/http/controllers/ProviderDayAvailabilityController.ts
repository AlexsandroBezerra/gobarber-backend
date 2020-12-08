import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderMouthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { mouth, year, day } = request.query

    const listProviderMouthAvailability = container.resolve(
      ListProviderDayAvailabilityService
    )

    const availability = await listProviderMouthAvailability.execute({
      providerId,
      day: Number(day),
      mouth: Number(mouth),
      year: Number(year)
    })

    return response.json(availability)
  }
}
