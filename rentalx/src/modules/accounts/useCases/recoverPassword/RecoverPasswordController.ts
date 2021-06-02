import { Request, Response } from "express";
import { container } from "tsyringe";

import { RecoverPasswordUseCase } from "./RecoverPasswordUseCase";

export class RecoverPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const recoverPasswordUseCase = container.resolve(RecoverPasswordUseCase);

    await recoverPasswordUseCase.execute(email);
    return res.send();
  }
}
