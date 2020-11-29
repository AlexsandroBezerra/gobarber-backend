import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { validate as isUuid } from 'uuid'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import AppError from '@shared/errors/AppError'

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    if (!isUuid(token)) {
      throw new AppError('Invalid token')
    }

    await resetPassword.execute({
      token,
      password
    })

    return response.status(204).send()
  }
}
