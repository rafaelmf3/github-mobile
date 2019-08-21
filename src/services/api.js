import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.github.com",
  timeout: 1000,
});

export default api;
