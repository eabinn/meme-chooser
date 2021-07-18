import ApiClient from "@/network/ApiClient";

abstract class CategoryRepository {
  abstract getAll(): Promise<any>;
}

class CategoryRepositoryImpl extends CategoryRepository {
  async getAll(): Promise<any> {
    return await ApiClient.shared.execute({ method: "GET", path: "/categories", params: { key: process.env.VUE_APP_API_KEY } });
  }
}

export { CategoryRepository, CategoryRepositoryImpl };
