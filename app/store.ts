import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import generatorReducer from '../reducers/generator';

export const store = configureStore({
  reducer: {
    generator: generatorReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


