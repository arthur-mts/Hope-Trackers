import { Request, Response } from 'express';
import { User, checkPassword } from '../models/user';
import jwt from 'jsonwebtoken';
import secret from '../config/auth';

class SessionConotrller {
  public async store(req: Request, res: Response) {
    const { email, password, signalId } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ messaege: 'User not found' });

    if (! await checkPassword(user.hashPassword, password)) return res.status(400).send({message: 'invalid password'});

    const { _id } = user;
    const token = jwt.sign({ _id }, secret);

    user.oneSignalKeys.push(signalId);

    await user.save();

    return res.json({ user, token });
  }
}

export default new SessionConotrller();
