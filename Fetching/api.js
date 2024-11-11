// api.js
import axios from 'axios';

// URL dasar API
const baseURL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL,
});

// Fungsi untuk membangun URL lengkap dengan subpath
export const buildURL = (subpath) => `${baseURL}${subpath}`;

export default api;
