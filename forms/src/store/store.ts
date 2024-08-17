import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
export const setupStore = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
