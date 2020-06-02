import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    exclude_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (exclude_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(exclude_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ name, email, password });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser || undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });

    return findUser || undefined;
  }

  public async save(user: ICreateUserDTO): Promise<User> {
    const savedUser = await this.ormRepository.save({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return savedUser;
  }
}

export default UsersRepository;
