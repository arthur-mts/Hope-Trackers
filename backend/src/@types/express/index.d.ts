import {Schema} from "mongoose";

declare namespace Express {
  export interface Request {
    user_id: Schema.Types.ObjectId;
  }
}
