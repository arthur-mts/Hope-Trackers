import { Request, Response } from 'express';
import Chat from '../models/chat';
import { User, IUserSchema } from '../models/user';
import { IChat } from '../models/chat';
import { Types } from 'mongoose';

class ChatController {
  public async store(req: Request, res: Response) {
    const destiny = Types.ObjectId(req.params.destiny);

    let chat = await Chat.findOne({ users: { $all: [req.user_id, destiny] } });

    if (chat) return res.status(400).send({ message: 'Chat alredy  exists' });

    const userDestiny = await User.findById(destiny);

    if(!userDestiny) return res.status(400).send({message: 'User not exists'});

    chat = await Chat.create({ users: [req.user_id, destiny] });

    await User.updateOne({ _id: destiny}, { $push: { chats: chat._id } });

    await User.updateOne({ _id: req.user_id }, { $push: { chats: chat._id } });


    return res.json({destiny: await User.findById(destiny).select(['name', 'email','thumbnail']), chat});
  }

  public async index(req: Request, res: Response) {

    const destiny = Types.ObjectId(req.params.destiny);

    const chat = await Chat.findOne({ users: { $all: [req.user_id, destiny] } }).populate('messages');

    if (!chat) return res.status(400).send({ message: 'Chat not exists' });

    return res.json({destiny: await User.findById(destiny).select(['name', 'email','thumbnail']), chat});
  }

  public async list(req: Request, res: Response) {
    const id = req.user_id;

    const chatsR = new Array< { destiny: IUserSchema, chat: IChat } >();

    let chats = await Chat.find({ users: id }).populate('messages');

    await Promise.all(
      chats.map(async (chat) => {

        const reciverId = chat.users.find((item) => {
          return !item.equals(id);
        });

        const destiny = await User.findById(reciverId).select(['name','email','thumbnail']);

        if(destiny)
          chatsR.push({destiny, chat});

        return chat;
      }),
    );

    return res.json(chatsR);
  }
}

export default new ChatController();
