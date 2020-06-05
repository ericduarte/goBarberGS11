import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import Appointment from '../infra/typeorm/entities/Appointment';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list appointment on a specific day', async () => {
    const insertedAppointments: Appointment[] = [];
    // eslint-disable-next-line no-plusplus
    for (let hour = 8; hour <= 12; hour++) {
      // eslint-disable-next-line no-await-in-loop
      const appointment = await fakeAppointmentsRepository.create({
        date: new Date(2020, 4, 20, hour, 0, 0),
        provider_id: 'provider',
        user_id: 'user1',
      });
      insertedAppointments.push(appointment);
    }

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([...insertedAppointments]),
    );
  });
});
