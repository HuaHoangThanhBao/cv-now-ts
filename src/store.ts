import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import blockReducer from './stories/organisms/Block/block.slice';
import dragReducer from './stories/organisms/Drag/drag.slice';
import documentReducer from './stories/pages/DocumentList/documentList.slice';

export const store = configureStore({
  reducer: { block: blockReducer, drag: dragReducer, document: documentReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
