import {Request, Response} from 'express';
import {Company} from '../models/company';
import {validator} from 'cpf-cnpj-validator';
export default class CompanyController {
    public static async store(req: Request, res: Response) {
        const {
            name,
            cnpj,
            latitude,
            longitude,
            description,
            phoneNumber,
            category,
        } = req.body;
        console.log(validator('123'));
        return res.status(400).send({message: 'Invalid CNPJ'});
        if (true) {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            let company = await Company.findOne({
                phoneNumber,
            });

            if (company)
                return res.status(400).send({mesage: 'Company alredy exists'});
            else {
                company = await Company.create({
                    name,
                    cnpj,
                    description,
                    phoneNumber,
                    location,
                    category,
                });
                return res.json(company);
            }
        }
    }
}