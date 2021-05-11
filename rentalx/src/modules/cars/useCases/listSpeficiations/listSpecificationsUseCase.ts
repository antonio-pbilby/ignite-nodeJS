import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
