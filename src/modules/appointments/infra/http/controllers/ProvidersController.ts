import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

export default class AppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({
      userId
    })

    return response.json(providers)
  }
}
