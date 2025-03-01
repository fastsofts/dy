import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox,faUserTie,faRepeat,faCheckCircle,faPercent,faCogs,faShoppingCart,faChartLine,faDollarSign, faComments,faGlobe,faFile } from '@fortawesome/free-solid-svg-icons';
import { DataItem } from '../dataType';
import Link from 'next/link';

interface CardProps {
  item: DataItem;
}  

const iconMap = {
    faBox,
    faUserTie,
    faCheckCircle,
    faRepeat,
    faPercent,
    faCogs,
    faShoppingCart,
    faChartLine,
    faDollarSign,
    faComments,
    faGlobe,
    faFile
};

const Card: React.FC<CardProps> = ({ item }) => {
  const icon = iconMap[item.icon as keyof typeof iconMap];
  return (
      <div className="card">    
          <div className="card-header">
            <FontAwesomeIcon icon={icon} className="card-icon" />
            <Link href={`/charts/${item.id}`} className='card-title'>
               <h2 className="card-title">{item.title}</h2>
            </Link>
          </div>
          <p className="card-description">{item.description}</p>
          <div className="card-footer">
          </div>  
      </div>  
  );
};

export default Card;
