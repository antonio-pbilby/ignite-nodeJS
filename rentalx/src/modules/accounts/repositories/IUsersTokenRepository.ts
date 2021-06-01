import { ICreateTokenDTO } from "../dtos/ICreateTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUsersTokenRepository {
  create(data: ICreateTokenDTO): Promise<UserToken>;
}
