import React from 'react';
import './CatDetails.scss';
import ReactModal from 'react-modal';


export interface CatDetailsProps {
  fact: string;
  pictureUrl: string;
}

export default function CatDetails(props: CatDetailsProps) {
  const {
    pictureUrl,
    fact
  } = props;

  const [showCatDetailsModal, setShowCatDetailsModal] = React.useState(false);

  const catDetailsContainer = () => {
    return (
      <div 
      className='cat-details-container'
      onClick={() => setShowCatDetailsModal(!showCatDetailsModal)}
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

  const catDetailsModal = () => {
    const defaultReactModalProps = {
      isOpen: true,
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEsc: true,
      onRequestClose: () => setShowCatDetailsModal(!showCatDetailsModal),
      className: 'modal',
      overlayClassName: 'modal-overlay',
      ariaHideApp: false
    }
    return (
      <ReactModal {...defaultReactModalProps}>
        {catDetailsContainer()}
      </ReactModal>
    );
  }

  return showCatDetailsModal ? catDetailsModal() : catDetailsContainer()
}