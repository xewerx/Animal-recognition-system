import { Frame } from "../models/frame";
import { FrameRepository } from "../repositories/frame";
import { StorageService } from "../services/storage-service/storage-service";
import { Query } from "./query";

type FrameWithData = Frame & {
  data: string;
};

type GetFrameQueryInput = {
  id: string;
};

export class GetFrameQuery implements Query<FrameWithData, GetFrameQueryInput> {
  async exec(input: GetFrameQueryInput) {
    const frameRepository = new FrameRepository();
    const storageService = new StorageService();

    const frame = await frameRepository.findById(input.id);
    const frameData = await storageService.getFrameData(input.id);

    return {
      ...frame,
      data: frameData,
    };
  }
}
