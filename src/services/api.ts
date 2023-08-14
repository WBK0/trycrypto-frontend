import axios from "axios";
  
// Create axios instance for API calls
const api = axios.create({
  baseURL: 'https://api.trycrypto.pl/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;