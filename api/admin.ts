import api from "./api";
const registerBarber = async(
    name: string,
    email: string,
    password: string,
    city: string,
    country: string,
    postalCode: string,
    state: string,
    street: string,
    number: string,
    complement?: string,)=>{
    try{
        const response = await api.post('/users', {name, email, password, role:'Barber'})
        await addAdress(response.data.id, city, country, postalCode, state, street, number, complement)
        return response.data;
    }
    catch(err: any){
        console.error('Register failed', err.response?.data || err.message);
        throw err;
    }
}
const addAdress = async(
    userId: string,
    city: string,
    country: string,
    postalCode: string,
    state: string,
    street: string,
    number: string,
    complement?: string,
    ) => {
        try{
            const response = await api.post('/addresses/add', {userId, city, country, postalCode, state, street, number, complement});
            return response.data;
        }
        catch(err: any){
            throw err;
        }
        
    }

const getBarbers = async()=>{
    try{
        const response = await api.get('/users/barbers');
        return response.data;
    }
    catch(err: any){
        throw err;
    }
}

const getBarberById = async(userId:string) =>{
    try{
        const response = await api.get(`/users/${userId}`);
        return response.data;
    }
    catch(err:any){
        throw err;
    }
}

const getAppointmentsById = async(userId:string) =>{
    try{
        const response = await api.get(`/${userId}`)
    }
    catch(err:any){
        throw err;
    }
}
const getServicesById = async(userId:string) =>{
    
}
export { registerBarber, getBarbers, getBarberById }