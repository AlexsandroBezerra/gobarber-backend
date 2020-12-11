import Appointment from '../infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProvider'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>

  findByDate(date: Date, providerId: string): Promise<Appointment | undefined>

  findAllInMonthFromProvider(
    date: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>

  findAllInDayFromProvider(
    data: IFindAllInDayFromProvider
  ): Promise<Appointment[]>
}
