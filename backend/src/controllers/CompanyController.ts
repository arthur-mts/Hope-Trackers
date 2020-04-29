import { Request, Response } from 'express';
import { Company } from '../models/company';
import { cnpj as cnpjUtil , cpf as cpfUtil} from 'cpf-cnpj-validator';
import fs, { PathLike } from 'fs';

class CompanyController {
  private removeFile(filename: PathLike) {
    fs.unlink(filename, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('succes');
      }
    });
  }

  public  async store(req: Request, res: Response) {
    const { filename } = req.file;
    const { name, cpf, cnpj, latitude, longitude, description, phoneNumber, category } = req.body;
    let register: String;

    if(cpf && cpfUtil.isValid(cpf, true)) 
      register = cpf;

    else if(cnpj && cnpjUtil.isValid(cnpj, true))
      register = cnpj;
  
    else
      return res.status(400).send({message: 'CPF ou CNPJ não encontrados'})

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    let company = await Company.findOne({
      phoneNumber,
    });

    if (company) {
      this.removeFile(req.file.path);
      return res.status(400).send({ mesage: 'Company alredy exists' });
    } else {
      company = await Company.create({
        name,
        thumbnail: filename,
        register,
        description,
        phoneNumber,
        location,
        category,
      });
      return res.json(company);
    }
  }
  public async update(req: Request, res: Response){
    const {name, description } = req.body
    // TODO
  }
  
}

export default new CompanyController()