import { Document, Schema, model } from 'mongoose';
import { IChat } from './chat';
import { IMarkSchema } from './mark';

export interface IUserSchema extends Document {
  name: String;
  phoneNumber: String;
  register: String;
  favorites: [IMarkSchema];
  chats: [IChat];
  marks: [IMarkSchema]
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
    }
  ],
  marks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mark'
    }
  ]
});

export const User = model<IUserSchema>('User', UserSchema);