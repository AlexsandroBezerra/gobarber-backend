import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    )

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId: '123'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe('123')
  })

  it('should not be able to create two appointment on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    )

    const appointmentDate = new Date(2020, 10, 27, 9)

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: '123'
    })

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: '123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
