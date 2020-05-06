import {Request, Response} from 'express';
import {Mark} from '../models/mark';

class MarkController {

  public async index(req: Request, res: Response) {
    const {latitude, longitude} = req.query;

    const page : number = Number(String(req.query.page)) || 0;

    const limit : number = Number(String(req.query.limit)) || 5;


    const marks = await Mark.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
        },
      },
    }).skip(limit * page).limit(limit);

    return res.json(marks);
  }
};

export default new MarkController();
