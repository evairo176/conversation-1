import { createSlice } from '@reduxjs/toolkit';

const loadMessages = () => {
  if (typeof window !== 'undefined') {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  }
  return [];
};

const saveMessages = (messages: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: loadMessages()
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      saveMessages(state.messages);
    },
    clearMessages: (state) => {
      state.messages = [];
      saveMessages([]);
    }
  }
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
