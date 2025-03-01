// src/store/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  selectedItem: string;
}

const initialState: SearchState = {
  selectedItem: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<string>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = searchSlice.actions;

export default searchSlice.reducer;
