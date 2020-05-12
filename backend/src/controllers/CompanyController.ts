import { Request, Response } from 'express';
import { Mark } from '../models/mark';
import { removeFile } from '../config/upload';

class CompanyController {
  public async update(req: Request, res: Response) {
    let filename = null;
    if (req.file) filename = req.file.filename;
    const { name, description, category, phoneNumber } = req.body;
    const { id } = req.params;

    const company = await Mark.findById(id);

    if (!company) return res.status(404).send({ message: 'Company not found' });

    if (!req.user_id.equals(company.owner)) return res.status(401).send();

    company.description = description || company.description;

    company.name = name || company.name;

    company.category = category || company.category;

    company.phoneNumber = phoneNumber || company.phoneNumber;

    company.description = description || company.description;

    if (filename) {
      removeFile(`uploads/${company.thumbnail}`);
      company.thumbnail = filename || company.thumbnail;
    }

    await company.save();

    return res.status(200).send();
  }

  public async store(req: Request, res: Response) {
    const { filename } = req.file;
    const { name, latitude, longitude, description, category , phoneNumber} = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const company = await Mark.create({
      name,
      thumbnail: filename,
      description,
      location,
      category,
      type: 'Company',
      owner: req.user_id,
      phoneNumber
    });

    return res.json(await Mark.findById(company._id));
  }

  public async index(req: Request, res: Response) {
    const {user_id} = req;

    const companies = await Mark.find({owner: user_id, type: 'Company'});

    return res.json(companies);
  }

  public async remove(req: Request, res: Response) {
    const { id } = req.params;
    const company = await Mark.findById(id);
    if (!company?.owner.equals(req.user_id)) return res.status(400).send({ message: 'Operation not permited' });
    removeFile(`uploads/${company.thumbnail}`);
    await company?.remove();
    return res.send();
  }
}

export default new CompanyController();
