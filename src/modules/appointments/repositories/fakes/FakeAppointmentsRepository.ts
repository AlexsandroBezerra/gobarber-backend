import { v4 as uuid } from 'uuid'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '../../infra/typeorm/entities/Appointment'
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProvider'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(
    date: Date,
    providerId: string
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) && appointment.providerId === providerId
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        providerId === appointment.providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        providerId === appointment.providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  public async create({
    date,
    providerId,
    userId
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      providerId,
      userId,
      date
    })

    this.appointments.push(appointment)

    return appointment
  }
}
