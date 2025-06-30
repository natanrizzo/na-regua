import { Service } from "@/types/Service";
import api from "./api"

export type OccupiedMap = Record<string, string[]>;

const getServices = async() => {
    try {
        const response = await api.get<Service[]>("/services");
        return response.data;
    } catch (err: any) {
        throw err;
    }
}

const getOccupiedSlots = async(serviceIds: string[]) => {
    try {
        const response = await api.get<OccupiedMap>("/services/occupied", {
            params: { serviceIds: serviceIds.join(",") }
        });
        return response.data;
    } catch (err: any) {
        throw err;
    }
}

export {
    getServices,
    getOccupiedSlots
}