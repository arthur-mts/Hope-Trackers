import { Request, Response } from 'express';
import Chat from '../models/chat';
import { User } from '../models/user';
import { Types } from 'mongoose';

class ChatController {
  public async store(req: Request, res: Response) {
    const destiny = Types.ObjectId(req.params.destiny);

    let chat = await Chat.findOne({ users: { $all: [req.user_id, destiny] } });

    if (chat) return res.status(400).send({ message: 'Chat alredy  exists' });

    chat = await Chat.create({ users: [req.user_id, destiny] });

    await User.updateOne({ _id: destiny }, { $push: { chats: chat._id } });

    await User.updateOne({ _id: req.user_id }, { $push: { chats: chat._id } });

    return res.json(chat);
  }

  public async index(req: Request, res: Response) {
    const destiny = Types.ObjectId(req.params.destiny);

    const chat = await Chat.findOne({ users: { $all: [req.user_id, destiny] } }).populate('messages');

    if (!chat) return res.status(400).send({ message: 'Chat not exists' });
    return res.json(chat);
  }

  public async list(req: Request, res: Response) {
    const id = req.user_id;

    let chats = await Chat.find({ users: id }).populate('messages');

    chats = await Promise.all(
      chats.map(async (chat) => {
        const reciverId = chat.users.filter((item) => {
          return item != id;
        })[0];

        console.log(reciverId);

        const reciver: any = await User.findById(reciverId).select(['name','email','thumbnail']);
        
        console.log(reciver);

        chat.users[chat.users.indexOf(reciverId)] = reciver;
        return chat;
      }),
    );

    return res.json(chats);
  }
}

export default new ChatController();
