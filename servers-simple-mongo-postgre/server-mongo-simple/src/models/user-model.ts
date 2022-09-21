import { model, Schema } from "mongoose";

export interface UserModelType {
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string,
}


const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export default model('User', UserSchema);
