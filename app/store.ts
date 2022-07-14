import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import memeReducer from '../reducers/meme';
import generatorReducer from '../reducers/generator';

export const store = configureStore({
  reducer: {
    generator: generatorReducer,
    meme: memeReducer
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


