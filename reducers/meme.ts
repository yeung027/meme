
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface MemeState {
  menuOpen: boolean;
}

const initialState: MemeState = {
    menuOpen: false,
};

export const generatorSlice = createSlice({
  name: 'meme',
  initialState,
  reducers: {
    menuOpen: (state, action: PayloadAction<boolean>) => {
        state.menuOpen = action.payload;
    },
  },
 
});

export const memeState = (state: RootState) => state.meme;

export const { menuOpen } = generatorSlice.actions;

export default generatorSlice.reducer;