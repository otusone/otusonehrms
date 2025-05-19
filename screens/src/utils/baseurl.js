import axios from 'axios';
const baseURL = "https://otusonehrms-1utc.onrender.com/api/v1"
//const baseURL = 'http://localhost:8000/api/v1'

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance;
