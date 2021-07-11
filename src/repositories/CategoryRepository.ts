import CategoryType from "@/types/CategoryType";
import ApiClient from "@/network/ApiClient";

class CategoryRepository {
  async getAll(): Promise<any> {
    return await ApiClient.shared.execute({ method: "GET", path: "/categories", params: { key: process.env.VUE_APP_API_KEY } });
  }
}

export default CategoryRepository;
