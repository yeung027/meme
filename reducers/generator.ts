
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Base64, Editable, STEP } from '../models/generator';

export interface GeneratorState {
  steps: STEP[];
  rawImageUrl: string;
  compiledOutput?:Base64<any>;
  editables:Editable[]
}

const initialState: GeneratorState = {
  steps: [],
  rawImageUrl: 'generator/example/2.jpg',
  editables:[]
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
    setCompiledOutput: (state, action: PayloadAction<Base64<any>>) => {
      state.compiledOutput = action.payload;
    },
    setEditables: (state, action: PayloadAction<Editable[]>) => {
      state.editables = action.payload;
    },
  },
 
});

export const generatorState = (state: RootState) => state.generator;

export const { setSteps, setRawImageUrl, setCompiledOutput, setEditables } = generatorSlice.actions;

export default generatorSlice.reducer;