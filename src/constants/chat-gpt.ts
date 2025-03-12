export type ChatGpt = {};

export type ConversationList = {
  conversation_id: string;
  user_id: string;
  created_at: string;
  company_id: string;
  conversation_name: string;
};

export type ConversationDetail = {
  conversation_name: string;
  created_at: string;
  data: DataConversationDetail[];
};

export type DataConversationDetail = {
  chat_history_id: string;
  created_at: string;
  user_chat: string;
  ai_chat: string;
  reference_type: string[];
  reference_content: any;
  reference_user: string[];
};
