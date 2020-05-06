import { Request, Response } from "express";
import { User } from "../models/user";
import { Types } from "mongoose";
import { Mark } from "../models/mark";

class EventController {


  public async remove(req: Request, res: Response) {
    const id = Types.ObjectId(req.params.id);

    const queryInfo = await Mark.remove({ _id: id });

    if (!queryInfo.deletedCount)
      return res.status(400).send();

    return res.status(200).send();
  }



  public async store(req: Request, res: Response) {
    const { user_id, name, description, latitude, longitude } = req.body;


    const location = { type: 'Point', coordinates: [longitude, latitude] };

    const event = await Mark.create({ name, description, location, owner: user_id, type: "Event" });

    await User.findOneAndUpdate({ _id: user_id }, { $push: { marks: event._id } })


    return res.json(event);
  }


  public async index(req: Request, res: Response) {
    const { latitude, longitude } = req.query;
    const page : number = Number(String(req.query.page)) || 0;

    const limit : number = Number(String(req.query.limit)) || 5;



    const events = await Mark.find({
      type: 'Event',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
        },
      },
    })
      .skip(limit * page)
      .limit(limit);

    return res.json(events);
  }

}

export default new EventController();
