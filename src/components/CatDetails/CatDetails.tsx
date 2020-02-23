import React from 'react';
import './CatDetails.scss';
import ReactModal from 'react-modal';
import { setFavorite } from '../../api/userApi';

export interface CatDetailsProps {
  fact: string;
  pictureUrl: string;
  id: string;
}

export default function CatDetails(props: CatDetailsProps) {
  const {
    pictureUrl,
    fact,
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

  const saveToFavorites = () => {
    setFavorite(props)
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
        {showCatModal ? <button onClick={() => saveToFavorites()}>save to favorites</button> : null}
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