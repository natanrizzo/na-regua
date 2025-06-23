import api from "./api";
const registerBarber = async(name: string, email: string, password: string)=>{
    try{
        const response = await api.post('/users', {name, email, password, role:'Barber'})
        return response.data;
    }
    catch(err: any){
        console.error('Register failed', err.response?.data || err.message);
        throw err;
    }
}

export { registerBarber }