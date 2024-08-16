import { configureStore } from '@reduxjs/toolkit';

export const setupStore = configureStore({
  reducer: {
    // Add reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
