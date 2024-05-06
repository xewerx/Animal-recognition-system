import { Frame } from "../../domain/entites/frame";

export interface IQueueService {
  sendToQue(frame: Frame): Promise<void>;
}
