import React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { type ModalWrapperProps } from '../types';

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {
  const { open, handleClose, children } = props;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
      data-testid="modal">
      <Fade in={open}>{children}</Fade>
    </Modal>
  );
};

export default ModalWrapper;
