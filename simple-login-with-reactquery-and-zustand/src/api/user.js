import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3099';
axios.defaults.withCredentials = true;

export function logInAPI(data) {
  return axios.post('/user/login', data).then((response) => response.data);
}

export function logOutAPI() {
  return axios.post('/user/logout').then((response) => response.data);
}
