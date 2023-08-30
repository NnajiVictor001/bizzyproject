import React from 'react';
import { createPortal } from 'react-dom';

import close from 'img/close-icon.png';
import { COLOR_WHITE } from 'constants/Colors';
import styles from './PopupLayout.module.scss';

function PopupLayout(props) {
  const { onClose, width, bgColor, children } = props;
  const { layout, layout__children, layout__childrenContent, layout__close } = styles;
  const handleParentClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div onClick={handleParentClick} className={layout}>
      <div
        style={{
          backgroundColor: bgColor || COLOR_WHITE,
          width: width || 'auto'
        }}
        className={layout__children}>
        <img onClick={onClose} src={close} alt="Close icon" className={layout__close} />
        <div className={layout__childrenContent}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default PopupLayout;
