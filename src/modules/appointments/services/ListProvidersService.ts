import { inject, injectable } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  userId: string
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    const cachedUsers = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`
    )

    if (cachedUsers) {
      return cachedUsers
    }

    const users = await this.usersRepository.findAllProviders({
      exceptUserId: userId
    })

    await this.cacheProvider.save(`providers-list:${userId}`, users)

    return users
  }
}
