"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt,faBox,faUserTie,faRepeat,faCheckCircle,faPercent,faCogs,faShoppingCart,faChartLine,faDollarSign } from '@fortawesome/free-solid-svg-icons';
import AutocompleteSearch from '../components/SearchItems'
import React, { useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchData } from '../store/action';
import { DataState, DataItem } from '../dataType'; 
import { AppDispatch } from '../store/store'

function Home () {
 //   const [items, setItems] = useState<DataState[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading, error } = useSelector((state: { data: DataState }) => state.data);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const itemlist = items.map((item: DataItem) => item.title);

    return (
        <div>
            <div className="button-request">
               <FontAwesomeIcon icon={faExternalLinkAlt} size="2x" className='iconsize' /><a className="request">Request</a>
            </div>            
            <nav className="navbar navbar-light bg-light header">
                My Library
            </nav>
            <div className="footnote">Browse for assets needed to report and present analysis</div>
            <div>
                <AutocompleteSearch Items={itemlist} placeholder={''}/>
            </div>
        </div>
    );

}

export default Home