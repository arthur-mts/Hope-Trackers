import { Request, Response } from 'express';
import { Mark } from '../models/mark';

class CompanyController {
  // private removeFile(filename: PathLike) {
  //   fs.unlink(filename, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('succes');
  //     }
  //   });
  // }

  public async update(req: Request, res: Response){
    const { filename } = req.file;
    const { title, description, category } = req.body;
    const { id } = req.params;

    
    const company = await Mark.findById(id);

    if(!company) return res.status(404).send({message: 'Company not found'});


    if(company.owner != req.user_id) 
      return res.status(401).send();


    company.description = description || company.description;

    company.title= title || company.title;

    company.category = category || company.category;

    company.description = description || company.description;

    company.thunbnail = filename || company.thunbnail;


  }

  public async store(req: Request, res: Response) {
    const { filename } = req.file;
    const { name, latitude, longitude, description, category, user_id } = req.body;



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
      owner: user_id
    });
    return res.json(company);
  }


  public async index(req: Request, res: Response) {
    const { latitude, longitude } = req.query;
    const category = String(req.query.category);
    let companiesArray;


    const page = Number(String(req.query.page)) || 0;

    const limit = Number(String(req.query.limit)) || 5;


    if (category) {
      companiesArray = await Mark.find(
        {
          type: 'Company',
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
        }
      ).skip(limit * page).
        limit(limit);
    }
    else {
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
      ).skip(limit * page).
        limit(limit);
    };

    return res.json(companiesArray);
  }



}




export default new CompanyController()