import { Frame } from "../domain/entites/frame";
import { FrameRepository } from "../repositories/frame";
import { QueueService } from "../services/queue-service/queue-service";
import { StorageService } from "../services/storage-service/storage-service";
import { Command } from "./command";

type CreateFrameProps = {
  data: string;
};

export class CreateFrameCommand implements Command<CreateFrameProps, void> {
  async exec(input: CreateFrameProps) {
    const frameRepository = new FrameRepository();
    const storageService = new StorageService();
    const queService = new QueueService();

    const frameModel = await frameRepository.create();

    const frame = new Frame({
      id: frameModel.id,
      timestamp: frameModel.createdAt,
      data: input.data,
    });

    await queService.sendToQue(frame);
    await storageService.saveFrame(frame);
  }
}
