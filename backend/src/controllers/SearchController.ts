import { Response, Request } from 'express';
import { Company } from '../models/company';

class SearchController {
  public async index(req: Request, res: Response) {
    const { latitude, longitude, category } = req.query;
    let { page = 0, limit = 10 } = req.query;
    page = Number(page);
    limit = Number(limit);
    let companiesArray;
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
        {
          page,
          limit,
        },
      );
    } else {
      companiesArray = await Company.paginate(
        {
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
        {
          page,
          limit,
        },
      );
    }

    return res.json(companiesArray);
  }
}

export default new SearchController();
