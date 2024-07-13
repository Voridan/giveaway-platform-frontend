import { EntityId } from '../types';
import { Partner } from './Partner';

export interface Giveaway {
  id: EntityId;
  title: string;
  description?: string;
  postUrl?: string;
  imageUrl?: string;
  onModeration: boolean;
  ended: boolean;
  createdAt: Date;
  participantsCount: number;
  partners: Partner[];
}
