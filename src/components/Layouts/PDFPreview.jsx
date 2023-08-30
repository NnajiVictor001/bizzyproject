import React from 'react';
import styles from './PDFPreview.module.scss';

function PDFPreview() {
  const { preview_contain, preview_contain__title } = styles;

  return (
    <div className={preview_contain}>
      <h1 className={preview_contain__title}>PDFPreview</h1>
    </div>
  );
}

export default PDFPreview;
