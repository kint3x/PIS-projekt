import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:9080/crm/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;