import { IUser } from '../IUser';

export interface AuthResponse {
  token: string;
  user: IUser;
}
