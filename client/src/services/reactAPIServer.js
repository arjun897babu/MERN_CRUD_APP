import axios from 'axios'
const {
  VITE_API_BASEURI,
} = import.meta.env

const API_URL = VITE_API_BASEURI || 'http://localhost:8080';

const axiosInstance = axios.create({
  withCredentials:true,
  baseURL: API_URL,
});

export default axiosInstance;
