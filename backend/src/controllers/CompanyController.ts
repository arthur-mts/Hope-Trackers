import { Request, Response } from 'express';
import { Company } from '../models/company';
import { cnpj as cnpjUtil } from 'cpf-cnpj-validator';

export default class CompanyController {
  public static async store(req: Request, res: Response) {
    console.log(req.body);
    const { filename } = req.file;
    const { name, cnpj, latitude, longitude, description, phoneNumber, category } = req.body;
    console.log(cnpjUtil.isValid('123', false));
    if (!cnpjUtil.isValid(cnpj, false)) return res.status(400).send({ mesage: 'Invalid CNPJ' });

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    let company = await Company.findOne({
      phoneNumber,
    });

    if (company) return res.status(400).send({ mesage: 'Company alredy exists' });
    company = await Company.create({
      name,
      thumbnail: filename,
      cnpj,
      description,
      phoneNumber,
      location,
      category,
    });
    return res.json(company);
  }
}