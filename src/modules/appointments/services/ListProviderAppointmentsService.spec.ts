import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 14),
      providerId: 'provider-id',
      userId: 'user-id'
    })

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 3, 20, 15),
      providerId: 'provider-id',
      userId: 'user-id'
    })

    const appointments = await listProviderAppointmentsService.execute({
      providerId: 'provider-id',
      year: 2020,
      mouth: 4,
      day: 20
    })

    expect(appointments).toEqual([appointment1, appointment2])
  })
})
