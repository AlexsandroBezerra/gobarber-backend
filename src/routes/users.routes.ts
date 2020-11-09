import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUserService = new CreateUserService()

  const user = await createUserService.execute({ name, email, password })

  return response.json({ ...user, password: undefined })
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService()

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json({ ...user, password: undefined })
  }
)

export default usersRouter
