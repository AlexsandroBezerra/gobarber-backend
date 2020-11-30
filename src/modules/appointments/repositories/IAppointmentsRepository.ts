import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMouthFromProviderDTO from '../dtos/IFindAllInMouthFromProviderDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>

  findByDate(date: Date): Promise<Appointment | undefined>

  findAllInMouthFromProvider(
    date: IFindAllInMouthFromProviderDTO
  ): Promise<Appointment[]>
}
