import api from '../http';
import {AxiosResponse} from 'axios'
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/api/login', {email, password})
  }

 static async logout(): Promise<AxiosResponse<void>> {
    return api.post<void>('/api/logout')
  }

 static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/api/registration', {email, password})
  }
}
