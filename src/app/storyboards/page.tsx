'use client'
import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
 import { DataItem } from '../dataType'; 
import Card from '../components/dataCard'
import {RootState}  from '../store/store';

function Storyboards () {    
    const { items, loading, error } = useSelector((state: RootState) => state.data);  
    const selectedItem = useSelector((state: RootState) => state.search.selectedItem)  
    const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);

    useEffect(() => {
        if (items) {
            if (selectedItem) {
              const filtered = items.filter(item => 
                item.in.indexOf('storyboards') !== -1 && item.title.toLowerCase().includes(selectedItem.toLowerCase())
              );
              setFilteredItems(filtered);
            }else{
              const filtered = items.filter(item => 
                item.in.indexOf('storyboards') !== -1
              );  
              setFilteredItems(filtered);        
            }
        }
    }, [items, selectedItem]);     

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;    

    return (
        <div>
          <div className="card-container">
             {filteredItems && filteredItems.length > 0 ? (
               filteredItems.map((item) => (
                 <Card key={item.id} item={item} /> 
               ))
              ) : (
               <div>No data available</div>
             )}
          </div>
        </div>
    );

}

export default Storyboards