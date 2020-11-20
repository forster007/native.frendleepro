import api from '../api';

export function getProviders() {
  return api.get('/providers');
}
export function updateProvider(data) {
  console.log(data);
  return api.put('/providers', data);
}
