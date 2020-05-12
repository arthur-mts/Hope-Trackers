import { Request, Response } from 'express';
import { User } from '../models/user';
import { cpf as cpfUtil, cnpj as cnpjUtil } from 'cpf-cnpj-validator';
import { hash } from 'bcrypt';

export default class UserController {
  public static async index(req: Request, res: Response) {
    const { phoneNumber } = req.params;
    const user = await User.findOne({ phoneNumber });

    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.json(user);
  }

  public static async store(req: Request, res: Response) {
    const { phoneNumber, name, cpf, cnpj, email, password } = req.body;
    let register;

    if (cpf) {
      if (!cpfUtil.isValid(cpf, false)) return res.status(400).send({ message: 'Invalid CPF' });
      register = cpf;
    } else if (cnpj) {
      if (!cnpjUtil.isValid(cnpj, false)) return res.status(400).send({ message: 'Invalid CNPJ' });
      register = cnpj;
    }

    let user = await User.findOne({
      email,
    });

    if (user) return res.status(400).send({ message: 'User alredy exists' });
    else {
      const hashPassword = await hash(password, 8);

      user = await User.create({
        name,
        phoneNumber,
        register,
        email,
        hashPassword,
      });

      return res.json(await User.findById(user._id).select('-hashPassword'));
    }
  }

  public static async update(req: Request, res: Response) {
    const { name, email } = req.body;

    let user = await User.findById(req.user_id);

    if(user && name)
      user.name = name;

    if(user && email)
      user.email = email;

    await user?.save();

    return res.json(user);
  }

  public static async remove(req: Request, res: Response) {
    await User.remove({ _id: req.user_id });
    return res.status(200).send();
  }
}
