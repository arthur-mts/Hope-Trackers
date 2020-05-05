import {Request, Response} from "express";
import {Event} from "../models/event";
import {User} from "../models/user";
import {Types} from "mongoose";

class EventController{


  public async remove(req: Request, res: Response){
    const id = Types.ObjectId(req.params.id);
    
    const queryInfo = await Event.remove({_id: id});

    if(!queryInfo.deletedCount)
      return res.status(400).send();

    return res.status(200).send();
  }



  public async store(req: Request, res: Response){
    const {user_id, title, description, latitude, longitude} = req.body;


    const location = {type: 'Point', coordinates: [longitude, latitude]};
    const event = await Event.create({title, description, location, owner: user_id});
    
    await User.findOneAndUpdate({_id: user_id}, {$push : { events: event._id }})


    return res.json(event);
  }


 public async index(req: Request, res: Response) {
    const { latitude, longitude } = req.query;
//    let { page = 0, limit = 10 } = req.query;
 //   page = Number(page);
   // limit = Number(limit);
    //console.log(page, limit);


   const events = await Event.find({
      location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 5000,
            },
          },
   });

     return res.json(events);
  }




}

export default new EventController();
