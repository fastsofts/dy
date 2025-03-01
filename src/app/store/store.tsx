import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataslice';
import searchReducer from './searchslice';
import ActiveRouteReducer from './activerouteslicer';

const store = configureStore({
    reducer: {
        data: dataReducer, 
        search: searchReducer,
        activeroute:ActiveRouteReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;