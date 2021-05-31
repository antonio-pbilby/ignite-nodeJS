import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) carsQuery.andWhere("brand = :brand", { brand });
    if (name) carsQuery.andWhere("name = :name", { name });
    if (category_id)
      carsQuery.andWhere("category_id = :category_id", { category_id });

    const cars = await carsQuery.getMany();
    return cars;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    return this.repository.save(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
}

export { CarsRepository };
