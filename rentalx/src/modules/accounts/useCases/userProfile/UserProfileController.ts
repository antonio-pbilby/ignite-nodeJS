import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserProfileUseCase } from "./UserProfileUseCase";

export class UserProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userProfileUseCase = container.resolve(UserProfileUseCase);
    const { id } = req.user;

    const user = await userProfileUseCase.execute(id);
    return res.json(user);
  }
}
