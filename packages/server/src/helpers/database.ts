import config from 'config';
import mongoose, { SchemaDefinition, SchemaOptions, Schema } from 'mongoose';

export default class Database {
  static createSchema(schema: SchemaDefinition, options?: SchemaOptions) {
    return new Schema(
      schema,
      options || {
        toJSON: {
          virtuals: true,
          versionKey: false,
          transform: (_: any, ret: any) => {
            delete ret._id;
            ret.password && delete ret.password;
          },
        },
      }
    );
  }

  static async connect() {
    const { db, user, password } = config.db;
    const uri = `mongodb+srv://${user}:${password}@cluster0.7hiwp.mongodb.net/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.log('Database connected successfully');
  }
}
