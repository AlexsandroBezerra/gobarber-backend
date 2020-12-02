import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ userId })

    return response.json(classToClass(user))
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      userId: request.user.id,
      name,
      email,
      password,
      oldPassword
    })

    return response.json(classToClass(user))
  }
}
