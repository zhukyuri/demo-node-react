export type IUserID = number;

export interface IUser {
  id: IUserID;
  email: string;
  name?: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
