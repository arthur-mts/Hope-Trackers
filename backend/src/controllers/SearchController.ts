import { Response, Request } from 'express';
import { Company } from '../models/company';

class SearchController {
  public async index(req: Request, res: Response) {
    const { latitude, longitude, category } = req.query;
    console.log(latitude, longitude);
    let { page, limit } = req.query;
    let companiesArray;

    // const options = {page : page || 0 , limit: limit || 10  }

    if (category) {
      companiesArray = await Company.paginate(
        {
          category,
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 5000,
            },
          },
        },
      );
    } else {
      companiesArray = await Company.paginate(
        {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates:  [longitude, latitude],
              },
              $maxDistance: 5000,
            },
          },
        },
      );
    }

    return res.json(companiesArray);
  }
}

export default new SearchController();
