import dayjs from "dayjs";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let car: Car;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(async () => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );

    car = await carsRepositoryInMemory.create({
      name: "car",
      description: "car desc",
      daily_rate: 50,
      license_plate: "aaa1111",
      fine_amount: 70,
      brand: "car brand",
      category_id: "categoryId",
      id: "car id",
    });
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
    await createRentalUseCase.execute({
      car_id: "car id",
      user_id: "user id",
      expected_return_date: dayAdd24Hours,
    });
    car.available = true;

    await expect(
      createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There is a rental in progress for this user!")
    );
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      car_id: "car id",
      user_id: "user id",
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id2",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("Should not be able to create a new rental with less than the minimal rent time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "car id",
        user_id: "user id",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
