import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document{
  content: string;
  owner: mongoose.Schema.Types.ObjectId;
}

const MessageSchema = new mongoose.Schema({
  content: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

export default mongoose.model<IMessage>('Message', MessageSchema);
