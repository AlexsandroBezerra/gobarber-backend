import { inject, injectable } from 'tsyringe'
import { getDaysInMonth, getDate } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  providerId: string
  mouth: number
  year: number
}

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
export default class ListProviderMountAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    providerId,
    mouth,
    year
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMouthFromProvider(
      {
        providerId,
        year,
        mouth
      }
    )

    const numberOfDaysInMouth = getDaysInMonth(new Date(year, mouth - 1))

    const eachDayArray = Array.from(
      { length: numberOfDaysInMouth },
      (_, index) => index + 1
    )

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      )

      return {
        day,
        available: appointmentsInDay.length < 10
      }
    })

    return availability
  }
}
