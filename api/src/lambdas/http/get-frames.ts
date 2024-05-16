import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import { logger } from "../../services/logger";
import { HttpException } from "../../shared/exceptions";
import { HttpStatus } from "../../shared/http-status";
import { makeResponse } from "../../utils/make-response";
import { GetFramesQuery } from "../../queries/get-frames";

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event,
  _
) => {
  logger.info({ event }, "Started lambda execution");

  try {
    const getFramesQuery = new GetFramesQuery();
    const frames = await getFramesQuery.exec();

    return makeResponse(frames, HttpStatus.OK);
  } catch (err) {
    if (err instanceof HttpException) {
      logger.info({ event }, "User error while executing lambda");

      return makeResponse(err.message, err.code);
    }

    logger.error({ err }, "Error while executing lambda");
    return makeResponse(
      "Internal server error",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
