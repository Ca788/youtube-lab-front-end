export const CHAT_MESSAGE_TYPES = {
  text: 'textMessageEvent',
  super_chat: 'superChatEvent',
  super_sticker: 'superStickerEvent',
  new_sponsor: 'newSponsorEvent',
  member_milestone: 'memberMilestoneChatEvent',
  membership_gift: 'membershipGiftingEvent',
  gift_redemption: 'giftMembershipReceivedEvent',
  message_deleted: 'messageDeletedEvent',
  chat_ended: 'chatEndedEvent',
  sponsor_only: 'sponsorOnlyModeEndedEvent',
};

export type ChatMessageType =
  (typeof CHAT_MESSAGE_TYPES)[keyof typeof CHAT_MESSAGE_TYPES];

export interface ChatMessageAuthor {
  channelId: string;
  name?: string;
  imageUrl?: string;
  isOwner: boolean;
  isModerator: boolean;
  isSponsor: boolean;
  isVerified: boolean;
}

export interface ChatMessage {
  id: string;
  message_type: ChatMessageType;
  text?: string;
  published_at: string;
  author: ChatMessageAuthor;
  external_id?: string;
  currency?: string;
  amount?: string | number;
  created_at?: string;
}

export interface ChatMessageFilters {
  message_type?: ChatMessageType;
  author_channel_id?: string;
  paid_only?: boolean;
}
