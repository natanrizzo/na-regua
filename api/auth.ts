import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

const register = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        const token = response.data.accessToken;
        await AsyncStorage.setItem('userToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch(err: any) {
        console.error('Register failed', err.response?.data || err.message);
        throw err;
    } 
}


const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const token = response.data.accessToken;
        await AsyncStorage.setItem('userToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err: any) {
        console.error('Login failed', err.response?.data || err.message);
        throw err;
    }
}

const logout = async() => {
    await AsyncStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];
}

export { register, login, logout };