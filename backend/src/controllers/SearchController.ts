import { Request, Response } from 'express';
import {Mark} from '../models/mark';

class SearchController {
  public async indexEvent(req: Request, res: Response){
    const { latitude, longitude } = req.query;
    const page: number = Number(String(req.query.page)) || 0;

    const limit: number = Number(String(req.query.limit)) || 5;

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

  public async indexMark(req: Request, res: Response) {
    const { latitude, longitude } = req.query;

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
    });

    return res.json(marks);
  }


  public async indexCompany(req: Request, res: Response) {
    const { latitude, longitude, category } = req.query;
    //    const category = String(req.query.category);
    let companiesArray;


    if (category) {
      companiesArray = await Mark.find({
        type: 'Company',
        category: String(category),
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
    } else {
      await Mark.find({
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
      companiesArray = await Mark.find({
        type: 'Company',
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
    }

    return res.json(companiesArray);

  }

}
export default new SearchController();
