import React, { useState, useEffect } from 'react';

import styles from './CopyBox.module.scss';

function CopyBox(props) {
  const { text, className, children } = props;
  const { tiny, main, tinyShow } = styles;
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 1500);
  }, [isShow]);

  return (
    <div className={main}>
      <div className={isShow ? tinyShow : tiny}>Copied!</div>
      <div
        onClick={() => {
          navigator.clipboard.writeText(text);
          setIsShow(!!text.length);
        }}
        className={className}>
        {children}
      </div>
    </div>
  );
}

export default CopyBox;
