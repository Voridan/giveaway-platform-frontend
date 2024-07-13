export interface GiveawayListItem {
  id: number;
  title: string;
  onModeration: boolean;
  ended: boolean;
  createdAt: Date;
  participantsCount: number;
}
