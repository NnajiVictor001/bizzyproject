import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './ConfirmDialog.module.scss';

function ConfirmDialog(props) {
  const { onClose, open, content, value, handleConfirm } = props;
  const { biggerSize, normalSize } = styles;

  const handleClose = () => {
    onClose();
  };

  const handleYes = () => {
    handleConfirm(value);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle className={biggerSize} id="alert-dialog-title">
        Confirm the action!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className={normalSize}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={normalSize}>
          No
        </Button>
        <Button onClick={handleYes} className={normalSize} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
