import { getRepository, Raw, Repository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '../entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMouthFromProvider from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    })

    return findAppointment
  }

  public async findAllInMouthFromProvider({
    providerId,
    mouth,
    year
  }: IFindAllInMouthFromProvider): Promise<Appointment[]> {
    const parsedMouth = String(mouth).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          dateField =>
            `to_char(${dateField}, 'MM-YYY) = '${parsedMouth}--${year}'`
        )
      }
    })

    return appointments
  }

  public async create({
    date,
    providerId
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date })

    await this.ormRepository.save(appointment)

    return appointment
  }
}
