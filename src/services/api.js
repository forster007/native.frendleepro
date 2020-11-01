import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.clientesmart.com.br',
  // baseURL: 'http://206.189.236.188/api',
  // baseURL: 'http://192.168.31.56:3333/api',
});

export default api;
