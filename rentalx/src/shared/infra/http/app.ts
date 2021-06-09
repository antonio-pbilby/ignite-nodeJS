import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import "reflect-metadata";

import "@shared/container";
import upload from "@config/upload";
import handleError from "@shared/infra/http/middlewares/handleError";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);
app.use(handleError);

/** Middleware de tratamento de erros */

export { app };
