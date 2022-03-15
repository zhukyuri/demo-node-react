import { localStorageTokenName } from '../configs/appConfigs';

export default class LocalToken {
  static save = (token: string): void => {
    localStorage.setItem(localStorageTokenName, token);
  }

  static read = (): string | null => localStorage.getItem(localStorageTokenName);

  static remove = (): void => {
    localStorage.removeItem(localStorageTokenName)
  };
}
