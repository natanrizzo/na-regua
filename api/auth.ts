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
        throw err;
    }
}

const logout = async() => {
    await AsyncStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];
}

// GARANTA QUE bootstrapAuth ESTÁ SENDO EXPORTADO AQUI
export { bootstrapAuth, login, logout };