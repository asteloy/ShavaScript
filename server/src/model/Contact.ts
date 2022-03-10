import { db } from '../config/db.js';
import { Model } from './Model.js';
import { StatusOrder } from '../controllers/decorators/StatusOrder.js';
// import expressSession from 'express-session'

export class Contact extends Model {
    tableName = "contacts";

}