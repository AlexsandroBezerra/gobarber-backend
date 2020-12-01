import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMouthAvailabilityService from './ListProviderMouthAvailabilityService'

let listProviderMouthAvailability: ListProviderMouthAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderMouthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMouthAvailability = new ListProviderMouthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the mouth availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 8, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 9, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 10, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 11, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 12, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 13, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 14, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 15, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 16, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 20, 17, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 3, 21, 17, 0, 0)
    })

    const availability = await listProviderMouthAvailability.execute({
      providerId: 'provider-id',
      year: 2020,
      mouth: 4
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true }
      ])
    )
  })
})
