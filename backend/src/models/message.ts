import {Schema, Types, model, Document} from 'mongoose';

export interface IMessage extends Document{
  content: string;
  owner: Types.ObjectId;
}

const MessageSchema = new Schema({
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

export default model<IMessage>('Message', MessageSchema);
