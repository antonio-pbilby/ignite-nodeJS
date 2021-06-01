import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./createCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 150,
      license_plate: "ASD-1231",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create more than one car with the same license plate", async () => {
    await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 150,
      license_plate: "ASD-1231",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car name2",
        description: "Car description",
        daily_rate: 150,
        license_plate: "ASD-1231",
        fine_amount: 60,
        brand: "Car brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should be able to create a car with available default value equals true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 150,
      license_plate: "ASD-1231",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
