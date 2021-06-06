import { ICreateTokenDTO } from "@modules/accounts/dtos/ICreateTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokenRepository } from "../IUsersTokenRepository";

export class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersTokens: UserToken[] = [];

  async create(data: ICreateTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, data);

    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return userToken;
  }
}
