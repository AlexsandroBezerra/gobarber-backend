import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'

import uploadConfig from '@config/upload'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUserService = container.resolve(CreateUserService)

  const user = await createUserService.execute({ name, email, password })

  return response.json({ ...user, password: undefined })
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json({ ...user, password: undefined })
  }
)

export default usersRouter
