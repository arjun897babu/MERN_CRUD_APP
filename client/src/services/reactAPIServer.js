import axios from 'axios'
const {
  VITE_API_BASEURI,
} = import.meta.env

const API_URL = VITE_API_BASEURI || 'http://localhost:8080';

const axiosInstance = axios.create({
  withCredentials:true,// send cookies with requests to other domains
  baseURL: API_URL,  // base URL for all the requests 
});

export default axiosInstance;
