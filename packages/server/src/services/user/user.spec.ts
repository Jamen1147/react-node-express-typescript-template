import { Conflict } from '../../helpers/httpError';
import { hashPassword } from '../../helpers/auth';
import UserService from './user';

jest.mock('../../helpers/auth');

const makeMockUserService = (params?: Record<string, jest.Mock>) =>
  new UserService({
    ...params,
  } as any);

describe('User Services', () => {
  it('checks user existence', async () => {
    const email = 'email@gmail.com';
    const returnedValue = true;
    const mockFindOne = jest.fn().mockReturnValue(returnedValue);
    const user = makeMockUserService({ findOne: mockFindOne });
    const result = await user.isExisting(email);
    expect(result).toBe(returnedValue);
    expect(mockFindOne).toHaveBeenCalledWith({ email });
  });

  it('gets current user', async () => {
    const id = 'id';
    const returnedValue = true;
    const mockFindById = jest.fn().mockReturnValue(returnedValue);
    const user = makeMockUserService({ findById: mockFindById });
    const result = await user.getCurrentUser(id);
    expect(result).toBe(returnedValue);
    expect(mockFindById).toHaveBeenCalledWith(id);
  });

  it('un-registers user', async () => {
    const id = 'id';
    const returnedValue = true;
    const mockDelete = jest.fn().mockReturnValue(returnedValue);
    const user = makeMockUserService({ delete: mockDelete });
    const result = await user.unregister(id);
    expect(result).toBe(returnedValue);
    expect(mockDelete).toHaveBeenCalledWith(id);
  });

  it('throws when email is existing when registering', async () => {
    const email = 'email@gmail.com';
    const user = makeMockUserService();
    jest.spyOn(user, 'isExisting').mockReturnValue(Promise.resolve(true));
    await expect(
      user.register({ email, name: '1', password: '1' })
    ).rejects.toBeInstanceOf(Conflict);
    expect(user.isExisting).toHaveBeenCalledWith(email);
  });

  it('registers a new', async () => {
    const email = 'email@gmail.com';
    const name = 'name';
    const password = 'pw';
    const returnValue = 'returnedUser';
    const hashed = 'hashed-pw';
    const mockSave = jest.fn().mockReturnValue(returnValue);
    const user = makeMockUserService({ save: mockSave });
    (hashPassword as jest.Mock).mockReturnValue(hashed);
    jest.spyOn(user, 'isExisting').mockReturnValue(Promise.resolve(false));
    await expect(user.register({ email, name, password })).resolves.toBe(
      returnValue
    );
    expect(mockSave).toHaveBeenCalledWith({
      email,
      name,
      password: hashed,
    });
  });
});
