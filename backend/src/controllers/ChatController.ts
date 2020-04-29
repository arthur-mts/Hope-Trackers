import {Request, Response} from "express";
import Chat from '../models/chat';
import {User} from "../models/user";
import mongoose from 'mongoose'

class ChatController {
  public async store(req: Request, res: Response){
    //TODO
    // checar se o chat já existe e retornar erro
    const {user_id} = req.body;

    const destiny = mongoose.Types.ObjectId(req.params.destiny);

    let chat = await Chat.findOne({users : {$all:  [user_id, destiny]}});

    if(chat) return res.status(400).send({message: 'Chat alredy  exists'});

    chat = await Chat.create({});
    
    chat.users.push(user_id, destiny);
    
    await chat.save();

    await User.updateOne({_id: destiny}, { $push: { chats: chat }  });

    await User.update({_id: user_id}, {$push: {chats: chat}});

    return res.json(chat);
  }

  public async index(req: Request, res: Response){
    const { user_id } = req.body;

    const destiny  = mongoose.Types.ObjectId(req.params.destiny);

    console.log(destiny)
    
    const chat = await Chat.find({ users: {$all:  [user_id, destiny] }});

    return res.json(chat);
  }
}

export default new ChatController();
