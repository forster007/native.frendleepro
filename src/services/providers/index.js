import api from '../api';

export function getProviders() {
  return api.get('/providers');
}

export function updateProvider(data) {
  return api.put('/providers', data);
}

export async function updateProviderImages(id, data) {
  return api.post(`/providers/${id}/files`, data);
}
