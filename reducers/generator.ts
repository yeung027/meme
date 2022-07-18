
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { STEP } from '../models/generator';

export interface GeneratorState {
  steps: STEP[];
}

const initialState: GeneratorState = {
  steps: [],
};

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<STEP[]>) => {
      state.steps = action.payload;
  },
  },
 
});

export const generatorState = (state: RootState) => state.generator;

export const { setSteps } = generatorSlice.actions;

export default generatorSlice.reducer;