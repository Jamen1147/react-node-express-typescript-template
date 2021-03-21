export class HttpError {
  static StatusCode: Record<string, number> = {
    BadRequest: 400,
    Unthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    Conflict: 409,
  };

  message: string;

  constructor(message: string) {
    this.message = message;
  }

  getCode() {
    return HttpError.StatusCode[this.constructor.name] || 500;
  }
}

export class BadRequest extends HttpError {}
export class Unthorized extends HttpError {}
export class Forbidden extends HttpError {}
export class NotFound extends HttpError {}
export class Conflict extends HttpError {}
