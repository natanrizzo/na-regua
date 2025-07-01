import api from "./api";

export interface UpdateServicePayload {
    name?: string;
    price?: number;
    duration?: number;
}
export interface ProductPayload {
    name: string;
    salePrice: number;
    profit: number;
    imageUrl?: string;
}
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
const getServices = async() =>{
    try{
        const response = await api.get('/services');
        return response.data;
    }
    catch(err:any){
        throw err;
    }
}

const addService = async(name: string, price: number, duration: number) =>{
    try{
        const response = await api.post('/services', {name, price, duration});
        return response.data;
    }
    catch(err: any){
        throw err;
    }
}

const getServiceById = async(id:string) =>{
    try{
        const response = await api.get(`services/${id}`);
        return response.data;
    }
    catch(err:any){
        throw err;
    }
}

const updateService = async (serviceId: string, data: UpdateServicePayload) => {
    try {
        const response = await api.put(`/services/${serviceId}`, data);
        return response.data;
    } catch (err: any) {
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

const addProduct = async (data: ProductPayload) => {
    try {
        const response = await api.post('/products', data);
        return response.data;
    } catch (err: any) {
        throw err;
    }
}
const getProductById = async (productId: string) => {
    try {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    } catch (err: any) {
        throw err;
    }
}
const updateProduct = async (productId: string, data: Partial<ProductPayload>) => {
    try {
        const response = await api.put(`/products/${productId}`, data);
        
        return response.data;
    } catch (err: any) {
        
        throw err;
    }
}

const deleteProduct = async (productId: string) => {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (err: any) {
        throw err;
    }
}
const getAppointments = async (filters: { barberId?: string; clientId?: string } = {}) => {
    try {
        const response = await api.get('/appointments', {
            params: filters
        });
        return response.data;
    } catch (err: any) {
        throw err;
    }
}

const deleteAppointment = async (appointmentId: string) => {
    try {
        const response = await api.delete(`/appointments/${appointmentId}`);
        return response.data;
    } catch (err: any) {
        console.error(`Falha ao deletar o agendamento ${appointmentId}`, err.response?.data || err.message);
        throw err;
    }
}

const updateUser = async (userId: string, data: { name?: string; email?: string }) => {
    try {
        const response = await api.put(`/users/${userId}`, data);
        return response.data;
    } catch (err: any) {
        console.error(`Falha ao atualizar o usuário ${userId}`, err.response?.data || err.message);
        throw err;
    }
}
export { registerBarber, getBarbers, getBarberById, addService, getServices, getServiceById, updateService, getProducts, addProduct, getProductById, updateProduct, deleteProduct, getAppointments, deleteAppointment, updateUser}