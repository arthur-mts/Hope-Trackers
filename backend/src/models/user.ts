import mongoose, {Document} from 'mongoose';
import {ICompanySchema }from './company';

export interface IUserSchema extends Document {
  name: String;
  phoneNumber: String;
  cpf: String;
  favorites: [ICompanySchema];
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
});

export const User = mongoose.model<IUserSchema>('User', UserSchema);