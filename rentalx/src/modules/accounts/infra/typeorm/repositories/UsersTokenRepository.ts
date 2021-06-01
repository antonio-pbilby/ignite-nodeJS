import { getRepository, Repository } from "typeorm";

import { ICreateTokenDTO } from "@modules/accounts/dtos/ICreateTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

import { UserToken } from "../entities/UserToken";

export class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: ICreateTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }
}
