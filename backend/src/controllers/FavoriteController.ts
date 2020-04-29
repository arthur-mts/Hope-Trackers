import { Request, Response } from 'express';
import { Company, ICompanySchema } from '../models/company';
import { User} from '../models/user';

class FavoriteController {
  public async store(req: Request, res: Response) {
    const companyId : any = req.params.id;
    const _id = req.body.user_id;


    const company = await Company.findOne({ _id: companyId });
    if (!company) return res.status(404).send({ message: 'Company not found' });


    await User.findOneAndUpdate({ _id }, { $addToSet: { favorites: companyId} }, { new: true });

    const user = await User.findOne({ _id });

    return res.json(user?.favorites);
  }

  public  async index(req: Request, res: Response) {
    const _id = req.body.user_id;
    const user = await User.findOne({ _id }).populate('favorites');
    return res.json(user?.favorites);
  }


  public async remove(req: Request, res: Response) {
    const {user_id }= req.body;
    const companyId: any = req.params.id;
    
    const user = await User.findOne({_id: user_id})

    const queryInfo = await user?.update({$pull : {favorites: companyId}});

    if(!queryInfo.nModified)
      return res.status(400).send({message: "Company not found"});
    
      
    return res.status(200).send();
    }
  }

export default new FavoriteController();
