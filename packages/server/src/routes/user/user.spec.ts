import { NextFunction, Request, Response } from 'express';
import services from '../../services';
import handlers from './handlers';

jest.mock('../../services', () => ({
  user: { getCurrentUser: jest.fn() },
}));

const mockContext = (
  reqBody: Record<string, unknown>
): [Request, Response, NextFunction] => [
  { ...reqBody } as unknown as Request,
  {
    success: jest.fn(),
    setCookie: jest.fn(),
    clearCookie: jest.fn(),
  } as unknown as Response,
  jest.fn() as NextFunction,
];

describe('user routes', () => {
  it('catches if getCurrentUser fails', async () => {
    const body = { user: { id: '1' } };
    (services.user.getCurrentUser as jest.Mock).mockReturnValue(
      Promise.reject(false)
    );
    const [req, res, next] = mockContext(body);
    await expect(handlers.getMe(req, res, next)).resolves.toBe(undefined);
    expect(services.user.getCurrentUser).toHaveBeenCalledWith(body.user.id);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(false);
  });

  it('gets current user', async () => {
    (services.user.getCurrentUser as jest.Mock).mockReturnValue(
      Promise.resolve(true)
    );
    const [req, res, next] = mockContext({ user: { id: '1' } });
    await expect(handlers.getMe(req, res, next)).resolves.toBe(undefined);
    expect(res.success).toHaveBeenCalledTimes(1);
    expect(res.success).toHaveBeenCalledWith(true);
  });
});
