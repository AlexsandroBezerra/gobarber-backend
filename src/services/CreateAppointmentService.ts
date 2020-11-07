import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  providerId: string
  date: Date
}

export default class CreateAppointmentService {
  public async execute({ providerId, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
