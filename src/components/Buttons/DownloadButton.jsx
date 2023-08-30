import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SyncIcon from '@mui/icons-material/Sync';

import styles from './DownloadButton.module.scss';

function DownloadButton(props) {
  const { className, type, bgColor, txt, onClick } = props;
  const { navButton, innerButton } = styles;

  let icon;
  if (txt === 'Download') {
    icon = <DownloadIcon />;
  } else if (txt === 'Copy') {
    icon = <ContentCopyIcon />;
  } else if (txt === 'Save') {
    icon = <SyncIcon />;
  } else {
    icon = <DownloadIcon />;
  }

  return (
    <button
      type={type}
      className={`${className} ${navButton}`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}>
      <div className={innerButton}>
        <p>{txt}</p>
        {icon}
      </div>
    </button>
  );
}

export default DownloadButton;
