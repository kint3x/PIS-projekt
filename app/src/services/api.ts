import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:9080/crm/api",
});

export default api;