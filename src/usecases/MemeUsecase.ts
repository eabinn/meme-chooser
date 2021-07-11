import MemeType from "@/types/MemeType";
import MemeRepository from "@/repositories/MemeRepository";

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
    const result: any = await new MemeRepository().get(category);
    const meme = new MemeDataMapper(result.data.results[Math.floor(Math.random() * 50)]).get();

    return meme;
  }
}

export default MemeUsecase;
