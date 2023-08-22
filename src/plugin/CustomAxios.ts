import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
})

function accessToken(): string | null {
    return localStorage.getItem('accessToken');
}

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = accessToken();
    
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default instance