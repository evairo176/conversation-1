import { configureStore } from '@reduxjs/toolkit';
import pointOfSale from './slices/point-of-sale';
import chatGpt from './slices/chat-gpt';

const store = configureStore({
  reducer: {
    pos: pointOfSale,
    chat: chatGpt
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
