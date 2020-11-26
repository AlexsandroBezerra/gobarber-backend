import { Router } from 'express'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  // tmp
  const usersRepository = new UsersRepository()

  const authenticateUserService = new AuthenticateUserService(usersRepository)

  const { user, token } = await authenticateUserService.execute({
    email,
    password
  })

  return response.json({ user: { ...user, password: undefined }, token })
})

export default sessionsRouter
