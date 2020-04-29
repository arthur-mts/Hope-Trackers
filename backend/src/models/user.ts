import mongoose, {Document} from 'mongoose';
import {ICompanySchema }from './company';
import {IChat} from './chat';

export interface IUserSchema extends Document {
  name: String;
  phoneNumber: String;
  cpf: String;
  favorites: [ICompanySchema];
  chats: [IChat]
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  cpf: String,
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    }
  ]
});

export const User = mongoose.model<IUserSchema>('User', UserSchema);