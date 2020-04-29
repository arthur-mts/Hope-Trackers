import {Request, Response} from "express";
import {User} from "../models/user";
import Chat from "../models/chat";
import Message from "../models/message";
import {findSocket} from '../services/UserOnlineService'

class MessageController {

  public async store(req: Request, res: Response){
    const emitter = req.body.user_id;
    const {reciver} = req.body;

    const {content} = req.body;
    
    if(!await User.findOne({_id: reciver})) 
      return res.status(400).send({message: "Invalid reciver"});

//    const userEmitter = await User.findOne({_id: emitter});

//  const userReciver = await User.findOne({_id: reciver});
    
    // O primeiro é o emissor, o segundo o receptor
    const chat = await Chat.findOne({ users: {$all:[emitter, reciver] }  });
    
    if(!chat) return res.status(400).send({message: "Chat not found"});

    const message = await Message.create({content, owner: emitter});

    chat.messages.push(message._id);
    
    await chat.save();

    const socket = findSocket(reciver);

    if(socket)
      socket.emit('new_message',`from ${emitter}`);

    return res.json(chat);
  }

}

export default new MessageController();
