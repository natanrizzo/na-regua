import api from "./api";

const getAppointments = async() =>{
    try{
        const response = await api.get(`/appointments/`);
        return response.data;
    }catch(err:any){
        throw err;
    }
}
export {getAppointments}