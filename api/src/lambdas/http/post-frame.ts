import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import joi from "joi";
import { logger } from "../../services/logger";
import { BadRequestException, HttpException } from "../../shared/exceptions";
import { HttpStatus } from "../../shared/http-status";
import { makeResponse } from "../../utils/make-response";

const schema = joi
  .object({
    imageBase64: joi.string().required(),
  })
  .required();

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event,
  _
) => {
  logger.info({ event }, "Started lambda execution");

  try {
    const { error } = schema.validate(event.body);

    if (error) {
      throw new BadRequestException(error.message);
    }

    const result = event.body;

    // TODO:
    // Save to Dynamo
    // Send to SQS

    return makeResponse(result, HttpStatus.NO_CONTENT);
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
