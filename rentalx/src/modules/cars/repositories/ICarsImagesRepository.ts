import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage>;
  findByCarId(id: string): Promise<CarImage[]>;
}

export { ICarsImagesRepository };
