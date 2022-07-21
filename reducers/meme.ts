
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface MemeState {
  menuOpen: boolean;
  exportDialogOpen: boolean;
  controlPanelEase: boolean; //true: in, false: out
  darkMode: boolean,
  iosInnerHeight:number
}

const initialState: MemeState = {
    menuOpen: false,
    exportDialogOpen:false,
    controlPanelEase:true,
    darkMode: false,
    iosInnerHeight:0
};

export const generatorSlice = createSlice({
  name: 'meme',
  initialState,
  reducers: {
    menuOpen: (state, action: PayloadAction<boolean>) => {
        state.menuOpen = action.payload;
    },
    exportDialogOpen: (state, action: PayloadAction<boolean>) => {
        state.exportDialogOpen = action.payload;
    },
    controlPanelEase: (state, action: PayloadAction<boolean>) => {
        state.controlPanelEase = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
        state.darkMode = action.payload;
    },
    setIosInnerHeight: (state, action: PayloadAction<number>) => {
      state.iosInnerHeight = action.payload;
  },
  },
 
});

export const memeState = (state: RootState) => state.meme;

export const { menuOpen, exportDialogOpen, controlPanelEase, setDarkMode, setIosInnerHeight } = generatorSlice.actions;

export default generatorSlice.reducer;