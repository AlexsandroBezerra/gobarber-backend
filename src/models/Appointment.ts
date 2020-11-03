import { v4 as uuid } from 'uuid'

export default class Appointment {
  id: string

  provider: string

  date: Date

  constructor(provider: string, date: Date) {
    this.id = uuid()
    this.provider = provider
    this.date = date
  }
}
