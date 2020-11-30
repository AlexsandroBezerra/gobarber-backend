import { v4 as uuid } from 'uuid'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '../../infra/typeorm/entities/Appointment'
import IFindAllInMouthFromProvider from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO'
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProvider'

export default class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async findAllInMouthFromProvider({
    providerId,
    mouth,
    year
  }: IFindAllInMouthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        providerId === appointment.providerId &&
        getMonth(appointment.date) + 1 === mouth &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  async findAllInDayFromProvider({
    providerId,
    day,
    mouth,
    year
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        providerId === appointment.providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === mouth &&
        getYear(appointment.date) === year
    )

    return appointments
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
