import { Appointment } from "./Appointment";

export type Service = {
    id: string;
    name: string;
    price: number;
    duration: number;

    appointments?: Appointment[]
}