import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { month, year, day } = request.query

    const listProviderMonthAvailability = container.resolve(
      ListProviderDayAvailabilityService
    )

    const availability = await listProviderMonthAvailability.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    })

    return response.json(availability)
  }
}
