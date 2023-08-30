import React from 'react';
import uuid from 'react-uuid';
import SimpleDialog from 'helpers/SimpleDialog';

function DialogAndActions(props) {
  const { popupActions, items, returnedItems, returnedItem, showPopup, selectedItem, handleClose } =
    props;

  const handleItem = (value) => {
    if (value.title === 'Duplicate Page') {
      const itemToDuplicate = items.find((item) => item.id === value.item.id);
      const indexOfItemToDuplicate = items.findIndex((item) => item.id === value.item.id);
      const duplicatedItem = structuredClone(itemToDuplicate);
      duplicatedItem.id = uuid();
      const newItems = [
        ...items.slice(0, indexOfItemToDuplicate),
        duplicatedItem,
        ...items.slice(indexOfItemToDuplicate)
      ];
      returnedItems(newItems);
    }
    if (value.title === 'Delete Page') {
      const indexOfItem = items.findIndex((item) => item.id === value.item.id);
      const nextIndex = (indexOfItem + 1) % items.length;
      const nextItem = items[nextIndex];
      const newItems = items.filter((item) => item.id !== value.item.id);
      returnedItem(nextItem);
      returnedItems(newItems);
    }
  };

  return (
    <SimpleDialog
      open={showPopup}
      popupActions={popupActions}
      selectedItem={selectedItem}
      onClose={handleClose}
      handleItem={handleItem}
    />
  );
}

export default DialogAndActions;
