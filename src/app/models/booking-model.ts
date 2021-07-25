import { booking } from './../interfaces/booking';
export class bookings implements booking {

    user_cnic: string;
    user_email: string;
    user_firstname: string;
    user_id: string;
    user_lastname: string;
    user_phone: string;
    user_address: string;
    user_description: string;
    number_of_orders:number;
    constructor(){

    }
}