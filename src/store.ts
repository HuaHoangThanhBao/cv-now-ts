import { configureStore } from '@reduxjs/toolkit';
import blogSlice from './stories/organisms/Block/block.slice';

export const store = configureStore({
  reducer: { block: blogSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
