import ApiClient from "@/network/ApiClient";

abstract class MemeRepository {
  abstract get(category: string): Promise<any>;
}

class MemeRepositoryImpl extends MemeRepository {
  async get(category: string): Promise<any> {
    return await ApiClient.shared.execute({
      method: "GET",
      path: "/search",
      params: { q: category, key: process.env.VUE_APP_API_KEY, limit: 50 },
    });
  }
}

export { MemeRepository, MemeRepositoryImpl };
