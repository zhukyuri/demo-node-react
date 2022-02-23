import api from '../http';
import {AxiosResponse} from 'axios'
import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';

export default class UserService {
  static async getUsers(email: string, password: string): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/users')
  }
}
