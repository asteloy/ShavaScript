import { NextFunction, Request, Response } from "express";
import { BasicController } from "./BasicConroller";
import { Contact} from "../model/Contact";
import { get, controller, use, bodyValidator, post } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!');
  next();
}

@controller('/contact')
class ContactController extends BasicController{

  static model = new Contact();
 
  @get('/all')
  async getAll (req: Request, res: Response) {
      const result = await ContactController.model.getAll();
      res.json(result)
  }

}