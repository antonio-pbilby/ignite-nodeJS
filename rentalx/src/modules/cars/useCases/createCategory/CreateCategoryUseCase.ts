import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/**
 * [x] Definir o tipo de retorno
 * [x] alterar o retorno de erro
 * [x] acessar o repositório
 */

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) throw new AppError("Category already exists!");

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
