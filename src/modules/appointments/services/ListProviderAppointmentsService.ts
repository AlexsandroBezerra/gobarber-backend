import { inject, injectable } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  providerId: string
  mouth: number
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
    mouth,
    year,
    day
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${mouth}-${day}`

    const cachedAppointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey
    )

    if (cachedAppointments) {
      return cachedAppointments
    }

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        providerId,
        mouth,
        year,
        day
      }
    )

    await this.cacheProvider.save(cacheKey, appointments)

    return appointments
  }
}
