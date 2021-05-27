import { inject, injectable } from "tsyringe";

import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    category_id,
    brand,
    name,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const carsList = await this.carsRepository.findAvailable({
      brand,
      category_id,
      name,
    });

    return carsList;
  }
}

export { ListAvailableCarsUseCase };
