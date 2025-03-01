import { createSlice } from '@reduxjs/toolkit';
import { DataState } from '../dataType';

const initialState: DataState = {  // Use DataState type here
    items: [],  // Initialize with an empty array
    loading: false,
    error: null,
};

const dataItemSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchDataRequest: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = dataItemSlice.actions;

export default dataItemSlice.reducer;