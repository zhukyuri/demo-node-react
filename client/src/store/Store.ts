import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';
import axios from 'axios';
import UserService from '../services/UserService';
import LocalToken from '../services/LocalToken';

export enum AuthStatus {
  Authorized,
  LoginForm ,
  RegistrationForm,
}

export default class Store {
  user = {} as IUser;
  public authStatus = AuthStatus.LoginForm;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthStatus(status: AuthStatus) {
    this.authStatus = status as AuthStatus;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  public setLogout() {

  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      //  TODO implementation logic <if error login>
      LocalToken.save(response.data.accessToken);
      this.setAuthStatus(AuthStatus.Authorized);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error login:', e.response?.data?.message)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      LocalToken.save(response.data.accessToken);
      this.setAuthStatus(AuthStatus.Authorized);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error login:', e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = AuthService.logout();
      // TODO check errors
      LocalToken.remove();
      this.setAuthStatus(AuthStatus.LoginForm);
      this.setUser({} as IUser);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error logout:', e.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true })
      //  TODO implementation logic <if error refresh>
      LocalToken.save(response.data.accessToken);
      this.setAuthStatus(AuthStatus.Authorized);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async removeUser() {
    try {
      const response = await UserService.deleteUser(this.user.id);
      // TODO check errors
      LocalToken.remove();
    } catch (e) {
      console.log(e);
    }
    this.setAuthStatus(AuthStatus.RegistrationForm);
    this.setUser({} as IUser);
  }
}
