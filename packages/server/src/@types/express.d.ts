declare namespace Express {
  interface CookieOptions {}
  interface Response {
    success: <T>(data: T, code?: number) => void;
    fail: (error: Record<string, unknown> | string, code?: number) => void;
    setCookie: (name: string, val: string, options?: CookieOptions) => void;
  }
  interface Request {
    user: {
      id: string;
    };
  }
}
