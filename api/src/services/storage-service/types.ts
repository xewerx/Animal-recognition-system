import { Frame } from "../../domain/entites/frame";

export interface IStorageService {
  saveFrame(frame: Frame): Promise<void>;
}
