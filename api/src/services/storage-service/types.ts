import { Frame } from "../../domain/entites/frame";

export interface IStorageService {
  saveFrameData(frame: Frame): Promise<void>;
  getFrameData(frameId: string): Promise<string>;
}
