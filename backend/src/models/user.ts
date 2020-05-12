import { Document, Schema, model, Types } from 'mongoose';
import { compare } from 'bcrypt'

export interface IUserSchema extends Document {
  name: String;
  phoneNumber: String;
  register: String;
  email: String;
  hashPassword: String;
  favorites: [Schema.Types.ObjectId];
  chats: [Types.ObjectId];
  marks: [Types.ObjectId];
}

export const UserSchema: Schema = new Schema({
  name: String,
  phoneNumber: String,
  register: String,
  email: String,
  hashPassword: String,
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Mark',
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

export function checkPassword(hashPassword: String, password: String) {
  return compare(password, hashPassword); 
}
