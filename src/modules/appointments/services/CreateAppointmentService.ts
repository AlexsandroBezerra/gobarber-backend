import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

interface IRequest {
  providerId: string
  userId: string
  date: Date
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({
    providerId,
    date,
    userId
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.")
    }

    if (userId === providerId) {
      throw new AppError("You can't create an appointment with yourself.")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate
    })

    const formattedDate = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para ${formattedDate}`
    })

    return appointment
  }
}
