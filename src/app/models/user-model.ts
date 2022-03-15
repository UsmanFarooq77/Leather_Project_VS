import { User } from "../interfaces/user";

export class user implements User {
    id: number | string;
    firstName: string;
    lastName: string;
    password: string;
    username?: string;
    token?: string;

    constructor(value : Object = {}){
        Object.assign(this,value);
    }
}