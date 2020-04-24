import { Request, Response } from "express";
import { User } from "../models/user";

class UserController {
    public async  store(req: Request, res: Response) {
        const { phoneNumber, name, cpf } = req.body;
        const user = await User.create({
            name,
            phoneNumber,
            cpf
        })
    }
}