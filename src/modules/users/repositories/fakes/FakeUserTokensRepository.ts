import { v4 as uuid } from 'uuid'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

import UserToken from '../../infra/typeorm/entities/UserToken'

export default class UserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token
    )

    return userToken
  }
}
