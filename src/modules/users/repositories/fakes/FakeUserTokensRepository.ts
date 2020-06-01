import { uuid } from 'uuidv4';
import IUserTokensRepository from '../IUsersTokenRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

export default class FakeUserTokenssRepository
  implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    userToken.id = uuid();
    userToken.token = uuid();
    userToken.user_id = user_id;

    this.userTokens.push(userToken);
    return userToken;
  }
}
