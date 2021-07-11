import ApiClient from "@/network/ApiClient";

class MemeRepository {
  async get(category: string) {
    return await ApiClient.shared.execute({
      method: "GET",
      path: "/search",
      params: { q: category, key: process.env.VUE_APP_API_KEY, limit: 50 },
    });
  }
}

export default MemeRepository;
