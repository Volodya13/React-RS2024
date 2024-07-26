import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from './reducers/episodesSlice';
import paginationSlice from './reducers/paginationSlice.ts';
import { episodesAPI } from '../services/episodesApi';

export const setupStore = configureStore({
  reducer: {
    pagination: paginationSlice,
    episodes: episodesReducer,
    [episodesAPI.reducerPath]: episodesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'episodesAPI/executeQuery/pending',
          'episodesAPI/executeQuery/fulfilled',
          'episodesAPI/executeQuery/rejected',
        ],
      },
    }).concat(episodesAPI.middleware),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
