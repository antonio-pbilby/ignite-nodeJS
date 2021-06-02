import { Request, Response } from "express";
import { container } from "tsyringe";

import { ForgotPasswordMailUseCase } from "./ForgotPasswordMailUseCase";

export class ForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const forgotPasswordMailUseCase = container.resolve(
      ForgotPasswordMailUseCase
    );

    await forgotPasswordMailUseCase.execute(email);
    return res.send();
  }
}
