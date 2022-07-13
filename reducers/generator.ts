
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface GeneratorState {
  value: number;
}

const initialState: GeneratorState = {
  value: 0,
};

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
 
});

export const generatorState = (state: RootState) => state.generator;

export const { increment, decrement } = generatorSlice.actions;

export default generatorSlice.reducer;