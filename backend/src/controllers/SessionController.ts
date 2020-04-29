import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import secret from '../config/auth';

class SessionConotrller {
  public async store(req: Request, res: Response) {
    const { phoneNumber } = req.body;
    console.log(process.env.JWT_SECRET);
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) return res.status(404).send({ messaege: 'User not found' });
    const { _id } = user;
    const token = jwt.sign({ _id }, secret);
    console.log(jwt.verify(token, secret));
    return res.json({ user, token });
  }
}

export default new SessionConotrller()
