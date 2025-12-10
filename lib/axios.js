// lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://violet-bison-661615.hostingersite.com/api',
  withCredentials: true, // <--- required if using cookie auth (Sanctum)
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
