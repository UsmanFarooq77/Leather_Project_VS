export interface User {
    id: number | string;
    firstName: string;
    lastName: string;
    password: string;
    photoURL: string;
    displayName?: string;
    token?: string;
}