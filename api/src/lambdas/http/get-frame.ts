import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import { logger } from "../../services/logger";
import { HttpException } from "../../shared/exceptions";
import { HttpStatus } from "../../shared/http-status";
import { makeResponse } from "../../utils/make-response";
import { GetFramesQuery } from "../../queries/get-frames";
import { GetFrameQuery } from "../../queries/get-frame";

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event,
  _
) => {
  logger.info({ event }, "Started lambda execution");

  try {
    const getFrameQuery = new GetFrameQuery();

    const frameId = event.pathParameters!.id as string;
    const frame = await getFrameQuery.exec({ id: frameId });

    return makeResponse(frame, HttpStatus.OK);
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
