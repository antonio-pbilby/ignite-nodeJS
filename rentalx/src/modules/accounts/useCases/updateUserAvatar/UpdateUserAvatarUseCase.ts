import { inject, injectable } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    // adicionar coluna avatar em users
    // configurar upload multer
    // refatorar usuário com coluna avatar
    // regra de negócio do upload
    // controller
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) await this.storageProvider.delete(user.avatar, "avatar");

    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
