import { getRepository, Raw, Repository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '../entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProvider'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(
    date: Date,
    providerId: string
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, providerId }
    })

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          dateField =>
            `to_char(${dateField}, 'MM-YYY') = '${parsedMonth}-${year}'`
        )
      }
    })

    return appointments
  }

  async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0')
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          dateField =>
            `to_char(${dateField}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        )
      },
      relations: ['user']
    })

    return appointments
  }

  public async create({
    date,
    providerId,
    userId
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date, userId })

    await this.ormRepository.save(appointment)

    return appointment
  }
}
