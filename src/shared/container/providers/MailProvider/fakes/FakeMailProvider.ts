import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

export default class FakeMailProvider implements IMailProvider {
  messages: ISendMailDTO[] = []

  async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message)
  }
}
