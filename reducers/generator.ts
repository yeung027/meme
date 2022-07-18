
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { STEP } from '../models/generator';

export interface GeneratorState {
  steps: STEP[];
  rawImageUrl: string
}

const initialState: GeneratorState = {
  steps: [],
  rawImageUrl: 'generator/example/2.jpg'
};

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<STEP[]>) => {
      state.steps = action.payload;
    },
    setRawImageUrl: (state, action: PayloadAction<string>) => {
      state.rawImageUrl = action.payload;
    },
  },
 
});

export const generatorState = (state: RootState) => state.generator;

export const { setSteps, setRawImageUrl } = generatorSlice.actions;

export default generatorSlice.reducer;