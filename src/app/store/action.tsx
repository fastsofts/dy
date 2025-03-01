import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './dataslice';
import { AppDispatch } from './store'
import { DataState } from '../dataType'

export const fetchData = () => async (dispatch: AppDispatch) => {
    dispatch(fetchDataRequest());
    try {
        const response = await fetch('/api/data/kpiData.json');
        const data:DataState[] = await response.json();
        dispatch(fetchDataSuccess(data)); 
    } catch (error) {
        dispatch(fetchDataFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
};