import { Document, Schema, model, Types } from 'mongoose';

export interface IUserSchema extends Document {
  name: String;
  phoneNumber: String;
  register: String;
  favorites: [Schema.Types.ObjectId];
  chats: [Types.ObjectId];
  marks: [Types.ObjectId];
}

export const UserSchema: Schema = new Schema({
  name: String,
  phoneNumber: String,
  register: String,
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
  ],
  marks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mark',
    },
  ],
});

export const User = model<IUserSchema>('User', UserSchema);
