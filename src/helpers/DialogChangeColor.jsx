import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import styles from './SimpleDialog.module.scss';

function DialogChangeColor(props) {
  const { onClose, open, pallete } = props;
  const { header } = styles;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={header}>Pick one of your colors</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => handleListItemClick()}>
          {pallete}
        </ListItem>
      </List>
    </Dialog>
  );
}

export default DialogChangeColor;
