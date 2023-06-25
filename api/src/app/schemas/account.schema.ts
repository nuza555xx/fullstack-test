import { getModelForClass, prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';
export class Account extends Document {
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  displayName!: string;

  @prop({ required: true })
  authenToken!: string;

  @prop({ required: true })
  avatar!: string;

  @prop({ required: true, default: new Date() })
  createdDate!: Date;

  @prop({ required: true, default: new Date() })
  updatedDate!: Date;
}

export const AccountModel = getModelForClass(Account);
