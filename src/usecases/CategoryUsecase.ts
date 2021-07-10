import axios from "axios";

interface Category {
  term: string;
  gifUrl: string;
}

class CategoryDataMapper {
  data: Category;

  constructor(rawData: any) {
    this.data = { term: rawData.searchterm, gifUrl: rawData.image };
  }

  get() {
    return this.data;
  }
}

class CategoryUsecase {
  async getAll() {
    const result: any = await axios.get("https://g.tenor.com/v1/categories?key=LIVDSRZULELA");
    const categories: Array<Category> = result.data.tags.map((tag: any) => {
      return new CategoryDataMapper(tag).get();
    });

    return categories;
  }
}

export default CategoryUsecase;
