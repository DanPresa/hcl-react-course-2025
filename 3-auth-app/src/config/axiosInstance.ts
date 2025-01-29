import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api', // Replace with your API base URL
  timeout: 30000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
