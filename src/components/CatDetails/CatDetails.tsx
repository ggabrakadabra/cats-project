import React from 'react';
import './CatDetails.scss';

export interface CatDetailsProps {
  fact: string;
  pictureUrl: string;
}

export default function CatDetails(props: CatDetailsProps) {
  const {
    pictureUrl,
    fact
  } = props;

  return (
    <div className='cat-details-container'>
      <div className='cat-image' data-testid='cat-image'>
        <img 
          src={pictureUrl}
          alt=''
        />
      </div>
      <div className='cat-fact' data-testid='cat-fact'>
        <p>{fact}</p>
      </div>
    </div>
  )
}