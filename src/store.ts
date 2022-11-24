import { configureStore } from '@reduxjs/toolkit';
import blogSlice from './stories/organisms/Block/block.slice';
import dragReducer from './stories/organisms/Drag/drag.slice';

export const store = configureStore({
  reducer: { block: blogSlice, drag: dragReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
