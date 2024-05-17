import { Frame } from "../models/frame";
import { FrameRepository } from "../repositories/frame";
import { Query } from "./query";

export class GetFramesQuery implements Query<Frame[]> {
  async exec() {
    const frameRepository = new FrameRepository();
    const frames = await frameRepository.findAll();

    return frames;
  }
}
