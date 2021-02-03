declare namespace Express {
  interface Response {
    success: <T>(data: T, code?: number) => void;
    fail: (error: Record<string, unknown> | string, code?: number) => void;
  }
  interface Request {
    user?: {
      id: string;
    };
  }
}
