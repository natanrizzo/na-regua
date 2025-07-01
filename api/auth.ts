import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"; 

const bootstrapAuth = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    }
    return null;
}

const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const token = response.data.accessToken;
        await AsyncStorage.setItem('userToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return response.data;
    } catch (err: any) {
        console.error('Login failed', err.response?.data || err.message);
         if (err.response) {
        // The server responded with a status code outside the 2xx range
        console.log('Error response:', err.response);
        } else if (err.request) {
        // The request was made but no response was received
        console.log('Error request:', err.request);
        } else {
        // Something happened in setting up the request that triggered an err
        console.log('Error message:', err.message);
        }
        throw err;
    }
}

const logout = async() => {
    await AsyncStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];
}

const register = async (name:string, email: string, password: string) =>{
    try{
        const response = await api.post('/auth/register', { name, email, password });
        const token = response.data.accessToken;
        await AsyncStorage.setItem('userToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return response.data;
    }
    catch(err: any){
        console.error('Register failed', err.response?.data || err.message);
        throw err;
    }
}
export { bootstrapAuth, login, logout, register };