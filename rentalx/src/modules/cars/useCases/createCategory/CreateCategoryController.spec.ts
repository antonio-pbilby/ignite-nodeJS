import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let refresh_token: string;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}', 'true', 'now()', 'abc1234')`
    );

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    refresh_token = responseToken.body.refresh_token;
  });

  it("Should be able to create a new category", async () => {
    const response = await request(app)
      .post("/categories/")
      .send({
        name: "Category supertest",
        description: "testing supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a duplicate category", async () => {
    const response = await request(app)
      .post("/categories/")
      .send({
        name: "Category supertest",
        description: "testing supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
