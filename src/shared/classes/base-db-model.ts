import { Types } from 'mongoose';

export class BaseDBOBject {
    // tslint:disable-next-line: variable-name
    _id?: Types.ObjectId;


    createdAt?: Date;
    updatedAt?: Date;
}
