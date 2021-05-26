import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "car name" });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "car brand" });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "categoryid",
    });

    expect(cars).toEqual([car]);
  });

  it("Should not be able to list an unavailable car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    car.available = false;

    const cars = await listAvailableCarsUseCase.execute({ name: "car name" });

    expect(cars).toEqual([]);
  });

  it("Should not be able to list an unavailable car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    car.available = false;

    const cars = await listAvailableCarsUseCase.execute({ brand: "car brand" });

    expect(cars).toEqual([]);
  });

  it("Should not be able to list an unavailable car by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });

    car.available = false;

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "categoryid",
    });

    expect(cars).toEqual([]);
  });

  it("Shoulb be able to list all available cars by more than one parameter", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand",
      category_id: "categoryid",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car2 = await carsRepositoryInMemory.create({
      name: "car name",
      description: "car description",
      daily_rate: 60,
      license_plate: "abc123534321",
      fine_amount: 90,
      brand: "car brand2",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car name",
      brand: "car brand2",
    });

    expect(cars).toEqual([car2]);
  });
});
