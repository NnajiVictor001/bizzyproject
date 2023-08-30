import * as React from 'react';
// import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import styles from './SimpleDialog.module.scss';

function SimpleDialog(props) {
  const { onClose, open, popupActions, handleItem } = props;
  const { header, item } = styles;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    handleItem(value);

    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={header}>Select your Action</DialogTitle>
      <List sx={{ pt: 0 }}>
        {popupActions.map((value) => (
          <ListItem
            button
            onClick={() => handleListItemClick(value, value.title)}
            key={value.title}>
            <ListItemText className={item} primary={value.title} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired
// };

export default SimpleDialog;
