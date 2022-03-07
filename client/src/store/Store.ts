import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { localStorageTokenName } from '../configs/appConfigs';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api'

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
      console.log('>>> Error login:', e.response?.data?.message)
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem(localStorageTokenName);
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      // @ts-ignore
      console.log('>>> Error logout:', e.response?.data?.message)
    }
  }

  // async checkAuth() {
  //   this.isAuth = true;
  //   try {
  //     const res = axios.get<AuthResponse>(`${API_URL}/refresh`)
  //   }
  // }
}
