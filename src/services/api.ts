import axios from "axios";
  
const api = axios.create({
  baseURL: 'https://api.trycrypto.pl/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;