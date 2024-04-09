import { configureStore } from '@reduxjs/toolkit';
import chargerReducer from './chargersReducer';
import { useDispatch } from 'react-redux';

export const chargerStore = configureStore({
  reducer: {
    chargers: chargerReducer,
  },
});
export type AppDispatch = typeof chargerStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof chargerStore.getState>;
