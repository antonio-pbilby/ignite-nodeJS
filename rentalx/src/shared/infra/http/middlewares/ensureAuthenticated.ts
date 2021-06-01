import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const usersTokenRepository = new UsersTokenRepository();

  if (!authHeader) throw new AppError("Token missing!", 401);

  // authheader vem no padrão "bearer <token>"
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) throw new AppError("User does not exist!", 401);

    req.user = {
      id: user_id,
    };

    next();
  } catch (e) {
    throw new AppError("Invalid token!", 401);
  }
  // bearer <token> vem dentro do header
}
