import { Router } from "express";

import { RecoverPasswordController } from "@modules/accounts/useCases/recoverPassword/RecoverPasswordController";

const passwordRoutes = Router();

const recoverPasswordController = new RecoverPasswordController();

passwordRoutes.post("/forgot", recoverPasswordController.handle);

export { passwordRoutes };
