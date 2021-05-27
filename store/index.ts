import { configureStore } from '@reduxjs/toolkit';
import bitcoinSlice from './bitcoinSlice';

export const store = configureStore({
  reducer: {
    bitcoinSlice,
  },
});
