
import axios from 'axios';


const RAW =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://product-listing-opm7.onrender.com/api';


const BASE = String(RAW).replace(/\/$/, '');

export const api = axios.create({
  baseURL: BASE,        
  timeout: 12000,
});

if (import.meta.env.PROD) {
  console.log('[API BASE]', BASE);
}
