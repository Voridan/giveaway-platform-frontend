import { User } from './User';

export interface Auth extends User {
  accessToken: string;
}
