import { Frame } from "../../domain/entites/frame";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { IQueueService } from "./types";
import { checkForEnv } from "../../utils/check-for-env";

export class QueueService implements IQueueService {
  private readonly client: SQSClient;
  private readonly queueUrl: string;

  constructor() {
    this.client = new SQSClient();
    this.queueUrl = checkForEnv(process.env.QUEUE_URL);
  }

  async sendToQue(frame: Frame) {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      DelaySeconds: 10,
      MessageAttributes: {
        FrameId: {
          DataType: "String",
          StringValue: frame.id,
        },
      },
      MessageBody: "MessageBody",
    });

    await this.client.send(command);
  }
}
