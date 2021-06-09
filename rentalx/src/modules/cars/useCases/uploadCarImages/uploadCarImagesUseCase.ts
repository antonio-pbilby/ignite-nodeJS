import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
// import { deleteFile } from "@utils/file";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) throw new AppError("Car does not exist!");

    // const carImages = await this.carsImagesRepository.findByCarId(car_id);

    // if (carImages) {
    //   carImages.forEach(async (carImage) => {
    //     await deleteFile(`./tmp/cars/${carImage.image_name}`);
    //   });
    // }

    images_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
