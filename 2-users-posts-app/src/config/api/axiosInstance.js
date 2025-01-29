import axios from 'axios';

export const usersApi = axios.create({
  baseURL: 'https://dummyjson.com',

  headers: {
    'Content-Type': 'application/json',
  },
});

export default usersApi;
