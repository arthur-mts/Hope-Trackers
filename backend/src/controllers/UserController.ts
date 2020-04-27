import { Request, Response } from 'express';
import { User } from '../models/user';
import { cpf as cpfUtil } from 'cpf-cnpj-validator';

export default class UserController {
  public static async store(req: Request, res: Response) {
    const { phoneNumber, name, cpf } = req.body;
    if (!cpfUtil.isValid(cpf, false)) return res.status(400).send({ message: 'Invalid CPF' });

    let user = await User.findOne({
      phoneNumber,
    });
    if (user) return res.status(400).send({ message: 'User alredy exists' });
    else {
      user = await User.create({
        name,
        phoneNumber,
        cpf,
      });
      return res.json(user);
    }
  }

  public static async update(req: Request, res: Response) {
    const { name } = req.body;
    const _id = req.body.user_id;
    console.log(_id);

    const user = await User.findOneAndUpdate({ _id }, { name: name });

    if (user) return res.json(await User.findOne({ _id }));
    else return res.status(404).send({ message: 'User not found' });
  }
}