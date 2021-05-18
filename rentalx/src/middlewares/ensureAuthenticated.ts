import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing!", 401);

  // authheader vem no padrão "bearer <token>"
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "79d97c411e977124afe88ff2633dba5f"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exist!", 401);

    // console.log(sub);
    next();
  } catch (e) {
    throw new AppError("Invalid token!", 401);
  }
  // bearer <token> vem dentro do header
}
