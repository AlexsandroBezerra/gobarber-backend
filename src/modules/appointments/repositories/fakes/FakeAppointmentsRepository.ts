import { v4 as uuid } from 'uuid'
import { isEqual } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '../../infra/typeorm/entities/Appointment'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async create({
    date,
    providerId
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      providerId,
      date
    })

    this.appointments.push(appointment)

    return appointment
  }
}
