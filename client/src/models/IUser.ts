export type IUserID = number;

export interface IUser {
  id: IUserID;
  email: string;
  username: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
