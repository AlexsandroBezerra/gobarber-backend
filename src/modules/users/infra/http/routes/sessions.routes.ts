import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUserService = container.resolve(AuthenticateUserService)

  const { user, token } = await authenticateUserService.execute({
    email,
    password
  })

  return response.json({ user: { ...user, password: undefined }, token })
})

export default sessionsRouter
