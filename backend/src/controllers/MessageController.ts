import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user';
import Chat from '../models/chat';
import Message from '../models/message';
import { findSocket } from '../services/UserOnlineService';

class MessageController {
  public async store(req: Request, res: Response) {
    const emitter = req.user_id;
    const destiny = mongoose.Types.ObjectId(req.params.destiny);
    const { content } = req.body;

    if (!(await User.findOne({ _id: destiny }))) return res.status(400).send({ message: 'Invalid reciver' });

    let chat = await Chat.findOne({ users: { $all: [emitter, destiny] } });

    if (!chat) return res.status(400).send({ message: 'Chat not found' });

    const message = await Message.create({ content, owner: emitter });

    chat.messages.push(message._id);

    console.log(chat.messages);

    await chat.save();

    const socket = findSocket(String(destiny));

    if (socket) socket.emit('new_message', `from ${emitter}`);

    return res.status(200).send();
  }
}

export default new MessageController();
