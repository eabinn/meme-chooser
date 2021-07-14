import { CategoryRepository } from "@/repositories/CategoryRepository";
import CategoryType from "@/types/CategoryType";

class CategoryDataMapper {
  data: CategoryType;

  constructor(rawData: any) {
    this.data = { term: rawData.searchterm, gifUrl: rawData.image };
  }

  get() {
    return this.data;
  }
}

class CategoryUsecase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAll() {
    const result: any = await this.categoryRepository.getAll();

    const categories: Array<CategoryType> = result.data.tags.map((tag: any) => {
      return new CategoryDataMapper(tag).get();
    });

    return categories;
  }
}

export default CategoryUsecase;
