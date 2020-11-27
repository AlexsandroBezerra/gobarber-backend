import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json({ ...user, password: undefined })
  }
}
