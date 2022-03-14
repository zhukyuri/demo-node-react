import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { localStorageTokenName } from '../configs/appConfigs';
import { AuthResponse } from '../models/response/AuthResponse';
import axios from 'axios';
import UserService from '../services/UserService';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
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
      console.log(response); // TODO
      localStorage.setItem(localStorageTokenName, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error delete:', e.response?.data?.message)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response); // TODO
      localStorage.setItem(localStorageTokenName, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error login:', e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = AuthService.logout();
      console.log(response); // TODO
      localStorage.removeItem(localStorageTokenName);
      this.setAuth(false);
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
      console.log(response); // TODO
      localStorage.setItem(localStorageTokenName, response.data.accessToken);
      this.setAuth(true);
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
      console.log(response); // TODO
      localStorage.removeItem(localStorageTokenName);
    } catch (e) {
      console.log(e);
    }
    this.setAuth(false);
    this.setUser({} as IUser);
  }


}
