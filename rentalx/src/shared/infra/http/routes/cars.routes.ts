import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

// carsRoutes.use(ensureAuthenticated);

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
