import { model, Document } from 'mongoose';
import Database from '../helpers/database';

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  id: string;
  createdAt?: string;
}

const UserSchema = Database.createSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model<IUser>('user', UserSchema);

export default User;
