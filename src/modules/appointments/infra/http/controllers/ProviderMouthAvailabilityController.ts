import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMouthAvailabilityService from '@modules/appointments/services/ListProviderMouthAvailabilityService'

export default class ProviderMouthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { mouth, year } = request.body

    const listProviderDayAvailability = container.resolve(
      ListProviderMouthAvailabilityService
    )

    const availability = await listProviderDayAvailability.execute({
      mouth,
      providerId,
      year
    })

    return response.json(availability)
  }
}
