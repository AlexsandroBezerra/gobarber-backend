import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let listProviderDayAvailability: ListProviderDayAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the mouth availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 14),
      providerId: 'provider-id',
      userId: 'user-id'
    })

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 15),
      providerId: 'provider-id',
      userId: 'user-id'
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 3, 20, 11).getTime()
    })

    const availability = await listProviderDayAvailability.execute({
      providerId: 'provider-id',
      year: 2020,
      mouth: 4,
      day: 20
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true }
      ])
    )
  })
})
