import {getManager} from '../../config/connection';
import { ObjectID } from 'mongodb';

export class UserBll {

    public async createUser(req: any) {
        try {
            const Users = await getManager().collection('users').find({}).toArray();
            const id = `00${Users.length+1}`;
            const data = {...req.body,id};
            return  await getManager().collection('users').insertOne(data);
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllUsers(req) {
        if (req.query.id) {
            return await getManager().collection('users').find({"id" : req.query.id}).toArray();
        } else {
            return await getManager().collection('users').find({}).toArray();
        }
    }

    public async deleteUser(id: string) {
        try {
            return await getManager().collection('users').deleteOne( {"_id" : new ObjectID(id)} );
        } catch (err) { 
            console.log(err);
        }
    }
}