import MemeType from "@/types/MemeType";
import { MemeRepository } from "@/repositories/MemeRepository";

class MemeDataMapper {
  data: MemeType;

  constructor(rawData: any) {
    this.data = { gifUrl: rawData.media[0].tinygif.url };
  }

  get(): MemeType {
    return this.data;
  }
}

class MemeUsecase {
  private memeRepository: MemeRepository;

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository;
  }

  async get(category: string) {
    const result: any = await this.memeRepository.get(category);
    const meme = new MemeDataMapper(result.data.results[Math.floor(Math.random() * 50)]).get();

    return meme;
  }
}

export default MemeUsecase;
