import axios from 'axios';
import { AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
const instance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.9.174:8080',
    // baseURL: 'http://localhost:9089', //邹佳
    timeout: 15000, // 设置请求超时时间
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers = {
            'Content-Type': 'application/json',
        } as AxiosRequestHeaders;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做些什么
        return response.data;
    },
    (error) => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default instance;
