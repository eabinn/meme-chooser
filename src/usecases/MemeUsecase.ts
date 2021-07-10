import axios from "axios";
import MemeType from "@/types/MemeType";

class MemeDataMapper {
  data: MemeType;

  constructor(rawData: any) {
    this.data = { gifUrl: rawData.media[0].tinygif.url };
  }

  get() {
    return this.data;
  }
}

class MemeUsecase {
  async get(category: string) {
    const result: any = await axios.get(`https://g.tenor.com/v1/search?q=${category}&key=LIVDSRZULELA&limit=50`);
    const meme = new MemeDataMapper(result.data.results[Math.floor(Math.random() * 50)]).get();

    return meme;
  }
}

export default MemeUsecase;
