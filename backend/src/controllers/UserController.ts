import { Request, Response } from 'express';
import { User } from '../models/user';
import { cpf as cpfUtil, cnpj as cnpjUtil } from 'cpf-cnpj-validator';

export default class UserController {
  public static async index(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.json(user);
  }

  public static async store(req: Request, res: Response) {
    const { phoneNumber, name, cpf, cnpj } = req.body;
    let register;

    if (cpf) {
      if (!cpfUtil.isValid(cpf, false)) return res.status(400).send({ message: 'Invalid CPF' });
      register = cpf;
    } else if (cnpj) {
      if (!cnpjUtil.isValid(cnpj, false)) return res.status(400).send({ message: 'Invalid CNPJ' });
      register = cnpj;
    }

    let user = await User.findOne({
      register,
    });

    if (user) return res.status(400).send({ message: 'User alredy exists' });
    else {
      user = await User.create({
        name,
        phoneNumber,
        register,
      });
      return res.json(user);
    }
  }

  public static async update(req: Request, res: Response) {
    const { name } = req.body;

    await User.updateOne({ _id: req.user_id }, { name });

    return res.json(await User.findById(req.user_id));
  }

  public static async remove(req: Request, res: Response) {
    await User.remove({ _id: req.user_id });
    return res.status(200).send();
  }
}
