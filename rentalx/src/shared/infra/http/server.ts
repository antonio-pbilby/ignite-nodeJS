import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "@shared/infra/typeorm";

import "@shared/container";

import handleError from "@shared/infra/http/middlewares/handleError";
import { router } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use(handleError);

/** Middleware de tratamento de erros */

app.listen(3333, () => console.log("Server is running on port 3333"));
