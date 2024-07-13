import { EntityId } from '../types';

export interface GiveawayListItem {
  id: EntityId;
  title: string;
  onModeration: boolean;
  ended: boolean;
  createdAt: Date;
  participantsCount: number;
}
