
import { db } from '../config/db'
import { Model } from './Model.js';

export class User extends Model {
    tableName = "person";

    getAuthUser = async (email: string) => {
        let result = await db.query(`select * from person where email = $1`, [email]);
               
        return result.rows[0];
    }
 
}