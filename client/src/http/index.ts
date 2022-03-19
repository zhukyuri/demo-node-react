import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse';
import { store } from '../index';
import LocalToken from '../services/LocalToken';
import { AuthStatus } from '../store/Store';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${LocalToken.read()}`

  return config;
})

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true })
      if (!response) store.setAuthStatus(AuthStatus.LoginForm)
      LocalToken.save(response.data.token);
      return api.request(originalRequest);
    } catch (e) {
      console.log('Not Authorized')
      store.setAuthStatus(AuthStatus.LoginForm)
    }
  }
  throw error;
})

export default api;
