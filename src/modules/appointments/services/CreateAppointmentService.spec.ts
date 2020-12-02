import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService
let fakeNotificationsRepository: FakeNotificationsRepository

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      providerId: 'provider-id',
      userId: 'user-id'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe('provider-id')
  })

  it('should not be able to create two appointment on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime()
    })

    const appointmentDate = new Date(2022, 4, 10, 12)

    await createAppointment.execute({
      date: appointmentDate,
      userId: 'user-id',
      providerId: 'provider-id'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        userId: 'user-id',
        providerId: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new appointment on passed date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        providerId: 'provider-id',
        userId: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        providerId: 'same-user-id',
        userId: 'same-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new appointment before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        providerId: 'provider-id',
        userId: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        providerId: 'provider-id',
        userId: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
