import { Request, Response } from 'express';
import { User, checkPassword } from '../models/user';
import jwt from 'jsonwebtoken';
import secret from '../config/auth';

class SessionConotrller {
  public async store(req: Request, res: Response) {
    const { email, password, signalId } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(404).send({ messaege: 'User not found' });

    if (!(await checkPassword(user.hashPassword, password)))
      return res.status(400).send({ message: 'invalid password' });

    const { _id } = user;
    const token = jwt.sign({ _id }, secret);

    if(signalId){
      await user.update({$addToSet : {oneSignalKeys: signalId}});
    }
      
    return res.json({user: await User.findById(_id).select('-hashPassword') , token });
  }
}

export default new SessionConotrller();
