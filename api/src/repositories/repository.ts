import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { checkForEnv } from "../utils/check-for-env";

export abstract class Repository {
  protected readonly documentClient = new DocumentClient();

  protected readonly tableName: string;

  constructor(tableName: string) {
    this.tableName = checkForEnv(process.env[tableName]);
  }
}
