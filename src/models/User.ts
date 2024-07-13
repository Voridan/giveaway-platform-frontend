import { EntityId } from '../types';

export interface User {
  id: EntityId;
  email: string;
  userName: string;
  isAdmin: boolean;
}
