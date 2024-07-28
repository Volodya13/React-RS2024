import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from './reducers/episodesSlice';
import paginationSlice from './reducers/paginationSlice';
import { episodesAPI } from '../services/episodesApi';
import selectedItemsReducer from './reducers/selectedItemsSlice';

export const setupStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    pagination: paginationSlice,
    episodes: episodesReducer,
    [episodesAPI.reducerPath]: episodesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(episodesAPI.middleware),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
