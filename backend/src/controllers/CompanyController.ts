import { Request, Response } from 'express';
import { Company } from '../models/company';
import { cnpj as cnpjUtil } from 'cpf-cnpj-validator';
import fs, { PathLike } from 'fs';

export default class CompanyController {
  private static removeFile(filename: PathLike) {
    fs.unlink(filename, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('succes');
      }
    });
  }

  public static async store(req: Request, res: Response) {
    const { filename } = req.file;
    const { name, cnpj, latitude, longitude, description, phoneNumber, category } = req.body;
    if (!cnpjUtil.isValid(cnpj, false)) {
      CompanyController.removeFile(req.file.path);
      return res.status(400).send({ mesage: 'Invalid CNPJ' });
    }

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    let company = await Company.findOne({
      phoneNumber,
    });

    if (company) {
      CompanyController.removeFile(req.file.path);
      return res.status(400).send({ mesage: 'Company alredy exists' });
    } else {
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
}