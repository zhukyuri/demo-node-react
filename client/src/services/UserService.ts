import api from '../http';
import {AxiosResponse} from 'axios'
import { IUser, IUserID } from '../models/IUser';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/users')
  }

  static async deleteUser(userId: IUserID): Promise<AxiosResponse> {
    return api.delete<string>(`/delete/${userId}`)
  }
}
