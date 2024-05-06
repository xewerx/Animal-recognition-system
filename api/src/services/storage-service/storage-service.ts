import { Frame } from "../../domain/entites/frame";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IStorageService } from "./types";
import { checkForEnv } from "../../utils/check-for-env";

export class StorageService implements IStorageService {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.client = new S3Client();
    this.bucketName = checkForEnv(process.env.BUCKET_NAME);
  }

  async saveFrame(frame: Frame) {
    console.log(this.bucketName);
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: `${frame.id}.txt`,
      Body: frame.data,
    });

    await this.client.send(command);
  }
}
