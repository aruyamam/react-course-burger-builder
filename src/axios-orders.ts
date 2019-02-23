import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
   baseURL: 'https://react-my-burger-96345.firebaseio.com/',
};

const instance: AxiosInstance = axios.create(config);

export default instance;
