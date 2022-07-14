
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface MemeState {
  menuOpen: boolean;
  controlPanelEase: boolean; //true: in, false: out
}

const initialState: MemeState = {
    menuOpen: false,
    controlPanelEase:true
};

export const generatorSlice = createSlice({
  name: 'meme',
  initialState,
  reducers: {
    menuOpen: (state, action: PayloadAction<boolean>) => {
        state.menuOpen = action.payload;
    },
    controlPanelEase: (state, action: PayloadAction<boolean>) => {
        state.controlPanelEase = action.payload;
    },
  },
 
});

export const memeState = (state: RootState) => state.meme;

export const { menuOpen, controlPanelEase } = generatorSlice.actions;

export default generatorSlice.reducer;