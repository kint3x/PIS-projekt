import axios from 'axios';

const api = axios.create({
  baseURL: "localhost:9080",
});

export default api;