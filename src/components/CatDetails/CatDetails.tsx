import React from 'react';
import './CatDetails.scss';
import classnames from 'classnames';

export interface CatDetailsProps {
  fact: string;
  pictureUrl: string;
}

export default function CatDetails(props: CatDetailsProps) {
  const {
    pictureUrl,
    fact
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  return (
    <div 
      className='cat-details-container'
      onClick={() => setExpanded(!expanded)}
    >
      <div className='cat-image' data-testid='cat-image'>
        <img 
          src={pictureUrl}
          alt=''
        />
      </div>
      <div className='cat-fact' data-testid='cat-fact'>
        <div>{fact}</div>
      </div>
    </div>
  )
}