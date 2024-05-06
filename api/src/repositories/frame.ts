import { Frame as FrameModel } from "../models/frame";
import { Repository } from "./repository";
import { v4 } from "uuid";
export class FrameRepository extends Repository {
  constructor() {
    super("FRAME_TABLE");
  }

  async create() {
    const now = new Date().toISOString();

    const frameModel: FrameModel = {
      id: v4(),
      createdAt: now,
      updatedAt: now,
      predictedClass: null,
      predictionConfidence: null,
      processedAt: null,
    };

    await this.documentClient
      .put({
        TableName: this.tableName,
        Item: frameModel,
        ConditionExpression: "attribute_not_exists(id)",
      })
      .promise();

    return frameModel;
  }
}
