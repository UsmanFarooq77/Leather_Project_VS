import { Review } from "../interfaces/review";

export class reviews implements Review{
    user_name: string;
    user_city: string;
    user_phone_num: string;
    user_address: string;
    user_content: string;
    date: string;
    image1: string;
    image2: string;
    user_status: boolean;
    $key: string;
    constructor(value : Object = {}){
        Object.assign(this,value);
    }
}