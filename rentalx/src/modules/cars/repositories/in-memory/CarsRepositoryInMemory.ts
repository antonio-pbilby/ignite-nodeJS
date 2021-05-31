import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }
  cars: Car[] = [];

  async findAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    let availableCars = this.cars.filter((car) => car.available);

    if (brand) {
      availableCars = availableCars.filter((car) => brand === car.brand);
    }
    if (name) {
      availableCars = availableCars.filter((car) => name === car.name);
    }
    if (category_id) {
      availableCars = availableCars.filter(
        (car) => category_id === car.category_id
      );
    }

    return availableCars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
