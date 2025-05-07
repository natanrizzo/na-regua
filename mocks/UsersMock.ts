import { User, Role } from "@/types/User";


export const mockUsers: User[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: Role.Administrator,
    },
    {
        id: "2",
        name: "Bruno Carvalho",
        email: "bruno.carvalho@example.com",
        role: Role.Barber,
    },
    {
        id: "3",
        name: "Carla Mendes",
        email: "carla.mendes@example.com",
        role: Role.Client,
    },
    {
        id: "4",
        name: "Daniela Souza",
        email: "daniela.souza@example.com",
        role: Role.Client,
    },
    {
        id: "5",
        name: "Eduardo Lima",
        email: "eduardo.lima@example.com",
        role: Role.Barber,
    },
    {
        id: "6",
        name: "Fernanda Rocha",
        email: "fernanda.rocha@example.com",
        role: Role.Administrator,
    },
];