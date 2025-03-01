'use client'
import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
 import { DataItem } from '../dataType'; 
import Card from '../components/dataCard'
import {RootState}  from '../store/store';

function Featured () {    
    const { items, loading, error } = useSelector((state: RootState) => state.data);  
    const selectedItem = useSelector((state: RootState) => state.search.selectedItem)  
    const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
    const [filteredItemsTrending, setFilteredItemsTrending] = useState<DataItem[]>([]);
    useEffect(() => {
        if (items) {
            if (selectedItem) {
              const filtered = items.filter(item => 
                item.in.indexOf('featured') !== -1 && item.title.toLowerCase().includes(selectedItem.toLowerCase())
              );
              setFilteredItems(filtered);
              const filteredtrending = items.filter(item => 
                item.in.indexOf('trending') !== -1 && item.title.toLowerCase().includes(selectedItem.toLowerCase())
              );       
              setFilteredItemsTrending(filteredtrending);       
            }else{
              const filtered = items.filter(item => 
                item.in.indexOf('featured') !== -1
              );  
              setFilteredItems(filtered);   
              const filteredtrending = items.filter(item => 
                item.in.indexOf('trending') !== -1
              );       
              setFilteredItemsTrending(filteredtrending);                     
            }
        }
    }, [items, selectedItem]);     

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;    

    return (
        <div>
           <div style = {{position:"relative"}}>
             <div className="maintitle">Featured</div>
             <div className="mainnote">Most featured and important Sales KPI's</div>
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
           <div style = {{position:"relative", paddingTop:"25px"}}>
             <div className="maintitle">Trending</div>
             <div className="mainnote">Trending Sales KPI's</div>
             <div className="card-container">
                {filteredItemsTrending && filteredItemsTrending.length > 0 ? (
                  filteredItemsTrending.map((item) => (
                    <Card key={item.id} item={item} /> 
                  ))
                 ) : (
                  <div>No data available</div>
                )}
             </div>           
           </div>          
        </div>
    );

}

export default Featured