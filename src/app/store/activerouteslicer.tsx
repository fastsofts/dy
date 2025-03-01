import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveRouterState {
  activeRoute: string;
}

const initialState: ActiveRouterState = {
  activeRoute: '/', 
};

const activeRouteSlice = createSlice({
  name: 'activeRouter',
  initialState,
  reducers: {
    setActiveRoute(state, action: PayloadAction<string>) {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveRoute } = activeRouteSlice.actions;
export default activeRouteSlice.reducer;
