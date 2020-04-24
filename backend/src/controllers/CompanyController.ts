import { Request, Response } from "express";
import { Company } from "../models/company";

export default class CompanyController {
    public static async store(req: Request, res: Response) {
        const { name, cnpj, latitude, longitude, description, phoneNumber } = req.body;
        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }


        let company = await Company.findOne({
            phoneNumber
        })
        if (company)
            return res.status(400).send({ mesage: "Company alredy exists" })

        company = await Company.create({
            name,
            cnpj,
            description,
            phoneNumber,
            location
        })
    }
}