import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id,
    });

    expect(user.avatar).toBe('teste.jpg');
  });

  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id,
    });
    expect(user.avatar).toBe('teste.jpg');

    await updateUserAvatar.execute({
      avatarFilename: 'teste1.jpg',
      user_id: user.id,
    });
    expect(user.avatar).toBe('teste1.jpg');
  });

  it('should not be able to update avatar of inexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        avatarFilename: 'teste.jpg',
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete old avater before update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste1.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('teste.jpg');
    expect(user.avatar).toBe('teste1.jpg');
  });
});
