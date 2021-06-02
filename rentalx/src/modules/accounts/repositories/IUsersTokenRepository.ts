import { ICreateTokenDTO } from "../dtos/ICreateTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUsersTokenRepository {
  create(data: ICreateTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByToken(refresh_token: string): Promise<UserToken>;
}
