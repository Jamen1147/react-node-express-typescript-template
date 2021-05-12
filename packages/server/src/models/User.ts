import { model, Document } from 'mongoose';
import { User as UserBase } from '@template/common';
import Database from '../helpers/database';

export interface User extends UserBase, Document {
  id: string;
  password: string;
  tokenRevision: number;
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
  tokenRevision: {
    type: Number,
    default: 1,
  },
});

const UserModel = model<User>('user', UserSchema);

export default UserModel;
