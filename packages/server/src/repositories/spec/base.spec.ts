import { model } from 'mongoose';
import BaseRepository from '../base';

const mockSave = jest.fn();
const mockCreate = jest.fn(() => ({
  save: mockSave,
}));
const mockFindById = jest.fn();
const mockFindOne = jest.fn();
const mockFind = jest.fn();
const mockDelete = jest.fn();

jest.mock('mongoose', () => ({
  model: jest.fn().mockImplementation(() => ({
    create: mockCreate,
    findById: mockFindById,
    findOne: mockFindOne,
    find: mockFind,
    findByIdAndDelete: mockDelete,
  })),
}));

class TestRepo extends BaseRepository<any> {}
const mockModel = model('test');
const mockRepo = new TestRepo(mockModel);

describe('base repository', () => {
  it('saves', async () => {
    const testObj = { test: 1 };
    await mockRepo.save(testObj);
    expect(mockCreate).toHaveBeenCalledWith(testObj);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('finds item by id', async () => {
    await mockRepo.findById('1');
    expect(mockFindById).toHaveBeenCalledWith('1');
  });

  it('finds item by filter', async () => {
    const filter = { email: 1 };
    await mockRepo.findOne(filter);
    expect(mockFindOne).toHaveBeenCalledWith(filter);
  });

  it('lists items by filter', async () => {
    const filter = { email: 1 };
    await mockRepo.list(filter);
    expect(mockFind).toHaveBeenCalledWith(filter);
  });

  it('deletes item by id', async () => {
    await mockRepo.delete('1');
    expect(mockDelete).toHaveBeenCalledWith('1');
  });
});
