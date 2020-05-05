import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import secret from '../config/auth';
import {Company} from '../models/company';

class SessionConotrller {
  public async storeUser(req: Request, res: Response) {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) return res.status(404).send({ messaege: 'User not found' });
    const { _id } = user;
    const token = jwt.sign({ _id }, secret);
    return res.json({ user, token });
  }
  
  public async storeCompany(req: Request, res: Response) {
    const { phoneNumber } = req.body;
    const company  = await Company.findOne({ phoneNumber: phoneNumber });
    if (!company) return res.status(404).send({ messaege: 'Company not found' });
    const { _id } = company;
    const token = jwt.sign({ _id }, secret);
    return res.json({ company, token });
  }

}

export default new SessionConotrller();
