export enum Role {
    Administrator,
    Barber,
    Client
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
}