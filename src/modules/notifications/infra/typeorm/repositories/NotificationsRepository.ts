import { getMongoRepository, MongoRepository } from 'typeorm'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import Notification from '../schemas/Notification'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    content,
    recipientId
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipientId })

    await this.ormRepository.save(notification)

    return notification
  }
}
