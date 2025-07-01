import api from "./api";

const createAppointment = async (clientId: string, serviceId: string, dateTime: string) => {
    try {
        const response = await api.post(`/appointments`, { serviceId, clientId, dateTime });
        return response.data;
    } catch (err: any) {
        throw err;
    }
}

export { createAppointment };