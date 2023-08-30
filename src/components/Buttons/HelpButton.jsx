import React from 'react';

import styles from './HelpButton.module.scss';

function HelpButton(props) {
  const { chatState, showChat } = props;
  const { helpButton } = styles;
  return (
    <button
      style={{
        opacity: chatState !== 'close' ? 0 : 1
      }}
      onClick={showChat}
      className={helpButton}>
      Help
    </button>
  );
}

export default HelpButton;
