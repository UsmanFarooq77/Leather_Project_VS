import { Register } from "../interfaces/register";

export class register implements Register {
    firstName: string;
    lastName: string;
    emailOrPhone: string;
    password: string;
}