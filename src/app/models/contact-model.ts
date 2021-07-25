import { contact } from './../interfaces/contact';
export class contacts implements contact {
    email: string;
    fullname: string;
    message: string;
    phone: string;
    constructor(values : Object = {}){
        Object.assign(this,values);
    }
}