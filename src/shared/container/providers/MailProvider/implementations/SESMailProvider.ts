import aws from 'aws-sdk'
import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'

import mailConfig from '@config/mail'

import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    })
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from

    const parsedTemplate = await this.mailTemplateProvider.parse(templateData)

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: parsedTemplate
    })
  }
}
