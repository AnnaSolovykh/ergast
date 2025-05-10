import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ergast.com/api/f1/',
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
});

export default api;
