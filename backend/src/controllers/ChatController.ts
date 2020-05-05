import {Request, Response} from "express";
import Chat from '../models/chat';
import {User} from "../models/user";
import mongoose from 'mongoose'
import {Company} from "../models/company";

class ChatController {
  public async store(req: Request, res: Response){
    const {user_id} = req.body;

    const destiny = mongoose.Types.ObjectId(req.params.destiny);

    let chat = await Chat.findOne({users : {$all:  [user_id, destiny]}});

    if(chat) return res.status(400).send({message: 'Chat alredy  exists'});

    chat = await Chat.create({ users: [user_id, destiny] });
    
   // chat.users.push(user_id, destiny);
    
   //  await chat.save();

    await User.updateOne({_id: destiny}, { $push: { chats: chat }  });

    await User.updateOne({_id: user_id}, {$push: {chats: chat}});

    return res.json(chat);
  }

  public async index(req: Request, res: Response){
    const { user_id } = req.body;

    const destiny  = mongoose.Types.ObjectId(req.params.destiny);
    
    const chat = await Chat.find({ users: {$all:  [user_id, destiny] }}).populate('messages');
    
    return res.json(chat);
  }

  public async list(req: Request, res: Response){
    const {user_id}= req.body;

    let chats = await Chat.find({users: user_id }).populate('messages');
    
    chats  = await Promise.all( chats.map(async (chat)=>{
      const reciverId = chat.users.filter((item, ) => {
        return item != user_id;
      })[0];
      
      let reciver : any = await User.findById(reciverId);
    
      if(!reciver) reciver = await Company.findById(reciverId);

      chat.users[chat.users.indexOf(reciverId)] = reciver;
      return chat;

    }));

    return res.json(chats);
  }
}

export default new ChatController();
