import {Request, Response} from "express";
import {Mark} from "../models/mark";

class SearchCompanyController {
  public async index(req: Request, res: Response) {
    const { filter } = req.query;

    const companies = await Mark.find( { type: 'Company'} );
  }
}
