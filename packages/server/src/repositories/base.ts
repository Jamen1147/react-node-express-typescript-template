import { Document, DocumentDefinition, FilterQuery, Model } from 'mongoose';

export default abstract class BaseRepository<T extends Document> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async save(
    item: Omit<DocumentDefinition<T>, '_id' | 'id' | 'tokenRevision'>
  ) {
    const result = await this.model.create(item);
    await result.save();
    return result;
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>) {
    return await this.model.findOne(filter);
  }

  async list(filter: FilterQuery<T>) {
    return await this.model.find(filter);
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
