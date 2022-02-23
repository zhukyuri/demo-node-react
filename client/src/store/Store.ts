import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { localStorageTokenName } from '../configs/appConfigs';

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log('Login >>>', response);
      localStorage.setItem(localStorageTokenName, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error:', e.response?.data?.message)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log('Registration >>>', response);
      localStorage.setItem(localStorageTokenName, response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error:', e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem(localStorageTokenName);
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error:', e.response?.data?.message)
    }
  }
}
