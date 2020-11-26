import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  // tmp
  const usersRepository = new UsersRepository()

  const createUserService = new CreateUserService(usersRepository)

  const user = await createUserService.execute({ name, email, password })

  return response.json({ ...user, password: undefined })
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    // tmp
    const usersRepository = new UsersRepository()

    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json({ ...user, password: undefined })
  }
)

export default usersRouter
