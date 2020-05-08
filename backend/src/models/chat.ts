import { Schema, Types, Document, model } from 'mongoose';

export interface IChat extends Document {
  messages: [Types.ObjectId];
  users: [Types.ObjectId];
}

const ChatSchema: Schema = new Schema(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true },
);

export default model<IChat>('Chat', ChatSchema);
