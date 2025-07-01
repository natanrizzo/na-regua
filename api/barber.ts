import api from "./api";

const getAppointments = async() =>{
    try{
        const response = await api.get(`/appointments/`);
        return response.data;
    }catch(err:any){
        throw err;
    }
}

const getServices = async() =>{
    try {
        const response = await api.get(`/services`);
        return response.data;
    }
    catch(err:any){
        throw err;
    }
}
const getProducts = async() =>{
    try{
        const response = await api.get('/products');
        return response.data;
    }
    catch(err:any){
        throw err;
    }
}
const getAppointmentById = async (appointmentId: string) => {
    try {
        const response = await api.get(`/appointments/${appointmentId}`);
        return response.data;
    } catch (err: any) {
        console.error(`Falha ao buscar o agendamento ${appointmentId}`, err.response?.data || err.message);
        throw err;
    }
}
export {getAppointments, getServices, getProducts, getAppointmentById}