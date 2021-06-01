import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be able to add a new specification to a car", async () => {
    const spec1 = await specificationsRepositoryInMemory.create({
      name: "spec1",
      description: "desc",
    });

    const spec2 = await specificationsRepositoryInMemory.create({
      name: "spec2",
      description: "desc",
    });

    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 150,
      license_plate: "ASD-1231",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    const specifications_id = [spec1.id, spec2.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars.specifications).toEqual([spec1, spec2]);
  });

  it("Should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["1", "2"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exist!"));
  });
});
