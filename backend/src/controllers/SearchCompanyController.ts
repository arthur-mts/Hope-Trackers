import {Request, Response} from "express";
import {Mark} from "../models/mark";

class SearchCompanyController {
  public async index(req: Request, res: Response) {
    const { filter } = req.params;

    const companies = await Mark.find( { type: 'Company', name: { $regex: new RegExp(String(filter)), $options: 'i' }} );

    return res.json(companies);
  }
}

export default new SearchCompanyController();
