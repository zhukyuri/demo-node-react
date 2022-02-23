import axios from 'axios'
import { localStorageTokenName } from '../configs/appConfigs';

const BASE_URL = 'http://localhost:5001'

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem(localStorageTokenName)}`;

  return config;
})

export default api;
