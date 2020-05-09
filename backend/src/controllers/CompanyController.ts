import { Request, Response } from 'express';
import { Mark } from '../models/mark';
import { removeFile } from '../config/upload';

class CompanyController {
  
  public async update(req: Request, res: Response){
    let filename = null;
    if(req.file) filename = req.file.filename;
    const { name, description, category } = req.body;
    const { id } = req.params;

    const company = await Mark.findById(id);


    if(!company) return res.status(404).send({message: 'Company not found'});


    if(! req.user_id.equals(company.owner))
      return res.status(401).send();


    company.description = description || company.description;

    company.name= name || company.name;

    company.category = category || company.category;

    company.description = description || company.description;

    if(filename){
      removeFile(`uploads/${company.thumbnail}`);
      company.thumbnail = filename || company.thumbnail;
    }

    await company.save();

    return res.status(200).send();
  }

  public async store(req: Request, res: Response) {
    const { filename } = req.file;
    const { name, latitude, longitude, description, category} = req.body;

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
      type: "Company",
      owner: req.user_id
    });

    console.log(company.owner);
    return res.json(company);
  }


  public async index(req: Request, res: Response) {
    const { latitude, longitude, category } = req.query;
    //    const category = String(req.query.category);
    let companiesArray;


    const page = Number(String(req.query.page)) || 0;

    const limit = Number(String(req.query.limit)) || 5;

    if (category) {
      companiesArray = await Mark.find(
        {
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
        }
      ).skip(limit * page).
        limit(limit);
    }
    else {
      await Mark.find(
        {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 5000,
            },


          }}
      );
      companiesArray = await Mark.find(
        {
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
        },
      ).limit(limit).skip(limit * page);
    };

    return res.json(companiesArray);
  }

  public async remove(req: Request, res: Response) {
    const {id} = req.params;
    const company = await Mark.findById(id);
    if(! company?.owner.equals(req.user_id)) return res.status(400).send({message: 'Operation not permited'});
    removeFile(`uploads/${company.thumbnail}`);
    await company?.remove();
    return res.send();
  }

}




export default new CompanyController()