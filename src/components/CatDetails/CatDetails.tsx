import React from 'react';
import './CatDetails.scss';
import ReactModal from 'react-modal';

export interface CatDetailProps {
  fact: string;
  pictureUrl: string;
  id: string;
}

export interface CatDetailsComponentProps {
  fact: string;
  pictureUrl: string;
  id: string;
  saveToFavorites: (hasFavorites: boolean, favorite: CatDetailProps) => void;
}

export default function CatDetails(props: CatDetailsComponentProps) {
  const {
    pictureUrl,
    fact,
    saveToFavorites,
    id,
  } = props;

  const [showCatModal, setShowCatModal] = React.useState(false);

  const defaultReactModalProps = {
    isOpen: true,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    onRequestClose: () => setShowCatModal(!showCatModal),
    className: 'modal',
    overlayClassName: 'modal-overlay',
    ariaHideApp: false
  }

  const catDetails = () => {
    return (
      <div 
        className='cat-details-container'
        onClick={() => setShowCatModal(!showCatModal)}
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
        {showCatModal ? 
          <button onClick={() => saveToFavorites(true, {fact, pictureUrl, id})}>
            save to favorites
          </button> 
          : null}
      </div>
    )
  }
  

  const catFactModal = () => {
    return (
      <ReactModal {...defaultReactModalProps}> 
        {catDetails()}
      </ReactModal>
    )
  }

  return showCatModal ? catFactModal() : catDetails()
}