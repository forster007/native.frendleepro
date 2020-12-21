import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://api.clientesmart.com.br',
  baseURL: 'http://192.168.1.3:3333',
});

export default api;
