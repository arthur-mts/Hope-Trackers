import { Request, Response } from 'express';
import { Company } from '../models/company';
import { User } from '../models/user';

export default class FavoriteController {
  public static async store(req: Request, res: Response) {
    const { companyId } = req.body;
    const _id = req.body.user_id;

    const company = await Company.findOne({ _id: companyId });
    if (!company) return res.status(404).send({ message: 'Company not found' });

    await User.findOneAndUpdate({ _id }, { $addToSet: { favorites: companyId } }, { new: true });

    const user = await User.findOne({ _id });

    return res.json(user);
  }

  public static async index(req: Request, res: Response) {
    const _id = req.body.user_id;
    const user = await User.findOne({ _id }).populate('favorites');
    return res.json(user);
  }
}
