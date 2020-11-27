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

  // it('should not be able to create two appointment on the same date', () => {
  //   expect(1 + 1).toBe(2)
  // })
})
