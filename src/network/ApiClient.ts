import axios from "axios";

class ApiClient {
  static shared = new ApiClient();

  baseUrl = "https://g.tenor.com/v1";

  async execute(obj: any) {
    return await axios.request({
      url: obj.path,
      method: obj.method,
      params: obj.params,
      baseURL: this.baseUrl,
    });
  }
}

export default ApiClient;
