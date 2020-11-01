import api from '../api';

export function getProviders() {
  return api.get('/providers');
}

export function getProvider(id, token) {
  // return api.get(`/provider`);
  console.log(token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return api.get(`/providers?id=${id}`);
}
