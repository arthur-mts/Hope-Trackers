import { Request, Response } from 'express';
import { User } from '../models/user';
import { Types } from 'mongoose';
import { Mark } from '../models/mark';

class EventController {
  public async remove(req: Request, res: Response) {
    const id = Types.ObjectId(req.params.id);

    const owner = req.user_id;

    const queryInfo = await Mark.remove({ _id: id, owner });

    if (!queryInfo.deletedCount) return res.status(400).send();

    return res.status(200).send();
  }

  public async store(req: Request, res: Response) {
    const { name, description, latitude, longitude } = req.body;

    const location = { type: 'Point', coordinates: [longitude, latitude] };

    const event = await Mark.create({ name, description, location, owner: req.user_id, type: 'Event' });

    await User.updateOne({ _id: req.user_id }, { $push: { marks: event._id } });

    const returnEvent = await Mark.findById(event._id).select([
      '_id',
      'description',
      'location',
      'owner',
      'type',
      'name',
    ]);

    return res.json(returnEvent);
  }

  public async index(req: Request, res: Response) {

    const { user_id } = req;

    const events = await Mark.find({owner: user_id, type: 'Event'});

    //const events = await User.findById(user_id).populate('marks');

    return res.json(events);

  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name, description } = req.body;

    const event = await Mark.findById(id);

    if (!event?.owner.equals(req.user_id)) return res.status(400).send({ message: 'Operation not permited' });

    event.name = name || event.name;

    event.description = description || event.description;

    return res.json(await event.save());
  }
}

export default new EventController();
