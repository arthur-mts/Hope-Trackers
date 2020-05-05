import mongoose from 'mongoose';

export interface IChat extends mongoose.Document {
  messages: [mongoose.Types.ObjectId];
  users: [mongoose.Types.ObjectId];
}

const ChatSchema: mongoose.Schema = new mongoose.Schema({
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  } ],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
  } ]
}, { timestamps: true})


export default mongoose.model<IChat>('Chat', ChatSchema)
