import { Frame } from "../../domain/entites/frame";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { IStorageService } from "./types";
import { checkForEnv } from "../../utils/check-for-env";
import { NotFoundException } from "../../shared/exceptions";

export class StorageService implements IStorageService {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.client = new S3Client();
    this.bucketName = checkForEnv(process.env.BUCKET_NAME);
  }

  async saveFrameData(frame: Frame) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: `${frame.id}.txt`,
      Body: frame.data,
    });

    await this.client.send(command);
  }

  async getFrameData(frameId: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: `${frameId}.txt`,
    });

    const response = await this.client.send(command);

    if (!response || !response.Body) {
      throw new NotFoundException(`Data for Frame ${frameId} not found`);
    }

    const frameData = await response.Body.transformToString();

    return frameData;
  }
}
