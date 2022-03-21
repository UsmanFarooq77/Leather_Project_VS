import { Login } from "../interfaces/login";

export class login implements Login {
    emailOrPhone: string;
    password: string;
}