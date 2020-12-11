import { inject, injectable } from 'tsyringe'
import { classToClass } from 'class-transformer'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  providerId: string
  month: number
  year: number
  day: number
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    providerId,
    month,
    year,
    day
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`

    const cachedAppointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey
    )

    if (cachedAppointments) {
      return cachedAppointments
    }

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        providerId,
        month,
        year,
        day
      }
    )

    await this.cacheProvider.save(cacheKey, classToClass(appointments))

    return appointments
  }
}
