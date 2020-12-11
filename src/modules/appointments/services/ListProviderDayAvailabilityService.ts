import { inject, injectable } from 'tsyringe'
import { getHours, isAfter } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  providerId: string
  month: number
  year: number
  day: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        providerId,
        day,
        month,
        year
      }
    )

    const hourStart = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    )

    const currentDate = new Date(Date.now())

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
      }
    })

    return availability
  }
}
