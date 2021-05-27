import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "car id",
      user_id: "user id",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "car id2",
        user_id: "user id",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id2",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with less than the minimal rent time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
