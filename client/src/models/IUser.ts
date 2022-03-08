export interface IUser {
  id: string;
  email: string;
  name?: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
