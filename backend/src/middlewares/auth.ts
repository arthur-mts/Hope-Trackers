import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secret from '../config/auth';
import { Types } from 'mongoose';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'token not provided' });

  const [, token] = authHeader.split(' ');
  try {
    const decoded: any = jwt.verify(token, secret).valueOf();
    
    req.user_id =  Types.ObjectId(decoded._id);

    return next();
  } catch (err) {
    return res.status(401).send({ message: 'invalid token' });
  }
};
