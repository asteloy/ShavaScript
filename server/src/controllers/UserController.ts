import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";
import { get, controller, use, bodyValidator, post } from './decorators';


function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!');
  next();
}

@controller('/user')
class UserController {


  static model = new User();



  @post('/login')
  @bodyValidator('email', 'password')
  async postlogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserController.model.getAuthUser(email);

    if (!user) {
      res.status(401).send('Invalid email');

    } else if (password === user.password) {
      res.send(user)

    } else {
      res.status(401).send('Invalid password');

    }
  }


}