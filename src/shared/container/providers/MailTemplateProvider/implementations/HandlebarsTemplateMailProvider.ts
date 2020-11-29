import handlebars from 'handlebars'

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

export default class HandlebarsTemplateMailProvider
  implements IMailTemplateProvider {
  async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}
