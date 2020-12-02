import { inject, injectable } from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

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
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    providerId,
    mouth,
    year,
    day
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        providerId,
        mouth,
        year,
        day
      }
    )

    return appointments
  }
}
