import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const logedUser = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jonh Jones 1',
      email: 'jon@email.com',
      password: '12345',
    });

    const providers = await listProvidersService.execute({
      user_id: logedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
