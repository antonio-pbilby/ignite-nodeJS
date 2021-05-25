import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpeficiations/ListSpecificationsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

// specificationsRoutes.use(ensureAuthenticated);

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);
specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
