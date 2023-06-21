import axios, { AxiosInstance } from 'axios';
import { API_URL } from "./constants";

const axiosInstance : AxiosInstance = axios.create({
    baseURL: API_URL
});

export default axiosInstance;