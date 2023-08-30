import React from 'react';
import BrandingColorForm from 'components/Forms/BrandingColorForm';
import PDFPreview from 'components/Layouts/PDFPreview';

import styles from './ChooseBrandColor.module.scss';

function ChooseBrandColor() {
  const { container } = styles;

  const brandingColorFormHandler = (data) => {
    console.log(data);
  };

  return (
    <div className={container}>
      <BrandingColorForm brandingColorFormHandler={brandingColorFormHandler} />
      <PDFPreview />
    </div>
  );
}

export default ChooseBrandColor;
