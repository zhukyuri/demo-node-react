import axios from 'axios'
import { localStorageTokenName } from '../configs/appConfigs';
import { AuthResponse } from '../models/response/AuthResponse';
import Store from '../store/Store';
import { store } from '../index';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env['REACT_APP_API_URL']
})

api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem(localStorageTokenName)}`

  return config;
})

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true })
      if (!response) {store.setAuth(false)};
      localStorage.setItem(localStorageTokenName, response.data.accessToken);
      return api.request(originalRequest);
    } catch (e) {
      console.log('Not Authorized')
    }
  }
  throw error;
})

export default api;
