export const PARTICIPANT_ORDERS = {
  messages: 'messages',
  recent: 'recent',
  paid: 'paid',
};

export type ParticipantOrder =
  (typeof PARTICIPANT_ORDERS)[keyof typeof PARTICIPANT_ORDERS];

export interface ChatParticipant {
  author_channel_id: string;
  author_name?: string;
  author_image_url?: string;
  messages_count: number;
  first_message_at?: string;
  last_message_at?: string;
  is_owner: boolean;
  is_moderator: boolean;
  is_sponsor: boolean;
  paid_amount?: string | number;
}
