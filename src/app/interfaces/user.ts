export interface User {
    id: number | string;
    firstName: string;
    lastName: string;
    password: string;
    photoURL: string;
    displayName?: string;
    emailOrPhone: string;
    token?: string;
}