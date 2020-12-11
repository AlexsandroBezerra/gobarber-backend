import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { month, year } = request.query

    const listProviderDayAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    )

    const availability = await listProviderDayAvailability.execute({
      providerId,
      month: Number(month),
      year: Number(year)
    })

    return response.json(availability)
  }
}
