import { getRepository, Repository } from "typeorm";

import { ICreateTokenDTO } from "@modules/accounts/dtos/ICreateTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

import { UserToken } from "../entities/UserToken";

export class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async findByToken(refresh_token: string): Promise<UserToken> {
    return this.repository.findOne({ refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async create(data: ICreateTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }
}
