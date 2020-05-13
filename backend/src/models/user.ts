import { Document, Schema, model, Types } from 'mongoose';
import { compare } from 'bcrypt';
import {UserClient} from 'onesignal-node';

export interface IUserSchema extends Document {
  name: string;
  register: string;
  email: string;
  hashPassword: string;
  oneSignalKeys: [string];
  favorites: [Schema.Types.ObjectId];
  chats: [Types.ObjectId];
  marks: [Types.ObjectId];
  thumbnail: string;
  thumbnail_url: string;
}

export const UserSchema: Schema = new Schema({
  name: String,
  thumbnail: String,
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
  oneSignalKeys: [String],
},
  {
    toJSON: {
      virtuals: true,
    }
  }
);

UserSchema.virtual('thumbnail_url').get(function(this: {thumbnail: String}){
  return `http://${process.env.IP}:${process.env.HTTP_PORT}/files/${this.thumbnail}`;
})


export const User = model<IUserSchema>('User', UserSchema);

export function checkPassword(hashPassword: string, password: string) {
  return compare(password, hashPassword);
}
