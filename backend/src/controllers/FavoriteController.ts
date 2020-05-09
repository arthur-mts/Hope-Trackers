import { Request, Response } from 'express';

import { User } from '../models/user';
import { Mark } from '../models/mark';

class FavoriteController {
  public async store(req: Request, res: Response) {
    const id: any = req.params.id;
    const { user_id } = req;

    const company = await Mark.findOne({ _id: id });
    if (!company) return res.status(404).send({ message: 'Company not found' });

    await User.updateOne({ _id: user_id }, { $addToSet: { favorites: id } }, { new: true });

    const user = await User.findById(user_id);


    return res.json(user?.favorites);
  }

  public async index(req: Request, res: Response) {
    const _id = req.user_id;
    const user = await User.findOne({ _id }).populate('favorites');
    return res.json(user?.favorites);
  }


  public async remove(req: Request, res: Response) {
    const { user_id } = req;
    const companyId: any = req.params.id;

    const user = await User.findOne({ _id: user_id })

    const queryInfo = await user?.update({ $pull: { favorites: companyId } });

    if (!queryInfo.nModified)
      return res.status(400).send({ message: "Company not found" });


    return res.status(200).send();
  }
}

export default new FavoriteController();
