import { HttpStatus } from "./http-status";

export abstract class HttpException extends Error {
  constructor(message: string, readonly code: number) {
    super(message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
