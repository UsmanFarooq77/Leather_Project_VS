export interface User {
    id: number | string;
    firstName: string;
    lastName: string;
    password: string;
    username?: string;
    token?: string;
}