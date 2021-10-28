import { IDocument/*, IListParams, ObjectId*/ } from './types';
import { client } from './client';

export interface IUser {
  username: string;
  name: string;
  email: string;
  role: string;
  permissions?: any[];
}

export interface IUserDocument extends IUser, IDocument {}

const me = () => {
  return client.get<IUserDocument>(`/users/me`);
};

export const user = {
  me,

};
