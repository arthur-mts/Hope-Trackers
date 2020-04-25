import {Response, Request} from 'express';
import {Company} from '../models/company';

export class SearchController {
    public static async index(req: Request, res: Response) {
        console.log(req.query);
        const {latitude, longitude, category} = req.query;
        console.log(category);
        let companiesArray;
        if (category) {
            companiesArray = await Company.find({
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
            });
        } else {
            companiesArray = await Company.find({
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
        }

        return res.json(companiesArray);
    }
}
