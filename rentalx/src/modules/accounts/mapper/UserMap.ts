import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatarUrl,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatarUrl,
    });
    return user;
  }
}
