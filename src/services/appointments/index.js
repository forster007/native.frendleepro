import api from '../api';

export function getAppointments() {
  return api.get('/appointments?operation=not&status=opened');
}

export function updateAppointments(obj) {
  return api.put(`/appointments/${obj.appointment_id}`, obj);
}

export function getRequests() {
  return api.get('/appointments?operation=eq&status=opened');
}
