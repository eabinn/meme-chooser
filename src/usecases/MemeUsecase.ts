import MemeType from "@/types/MemeType";
import { MemeRepository } from "@/repositories/MemeRepository";

class MemeDataMapper {
  data: MemeType;

  constructor(rawData: any) {
    this.data = { gifUrl: rawData.data.results[Math.floor(Math.random() * 50)].media[0].tinygif.url };
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
    return new MemeDataMapper(await this.memeRepository.get(category)).get();
  }
}

export default MemeUsecase;
