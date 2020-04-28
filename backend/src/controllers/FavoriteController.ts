import { Request, Response } from 'express';
import { Company } from '../models/company';
import { User} from '../models/user';

class FavoriteController {
  public  async store(req: Request, res: Response) {
    const { companyId } = req.body;
    const _id = req.body.user_id;

    const company = await Company.findOne({ _id: companyId });
    if (!company) return res.status(404).send({ message: 'Company not found' });

    await User.findOneAndUpdate({ _id }, { $addToSet: { favorites: companyId } }, { new: true });

    const user = await User.findOne({ _id });

    return res.json(user);
  }

  public  async index(req: Request, res: Response) {
    const _id = req.body.user_id;
    const user = await User.findOne({ _id }).populate('favorites');
    return res.json(user);
  }


  public async remove(req: Request, res: Response) {
    const id = req.body.user_id;
    const _id = req.body.id;
    
    const user = await User.findOne({_id : id})

    const queryInfo = await user?.update({$pull : {favorites: _id}});

    if(!queryInfo.nModified)
      return res.status(400).send({message: "Company not found"});
    
      
    return res.status(200).send();
    }
  }

export default new FavoriteController();
