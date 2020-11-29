import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe('123')
  })

  it('should not be able to create two appointment on the same date', async () => {
    const appointmentDate = new Date(2020, 10, 27, 9)

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '123'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
