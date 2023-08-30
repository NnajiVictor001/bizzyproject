import React from 'react';
import webIcon from 'img/webTiny.png';
import pdfIcon from 'img/pdfTiny.png';
import promoteIcon from 'img/promotTiny.png';
import emailIcon from 'img/emailTiny.png';

import styles from './ProductCardFooterLinks.module.scss';

function ProductCardFooterLinks(props) {
  const { handleFooterIconClick, id, bookFile } = props;
  const { card__iconCont, card__state, card__iconText } = styles;

  const footerData = [
    {
      icon: webIcon,
      title: id ? 'Website' : 'Add a website',
      state: true
    },
    {
      icon: pdfIcon,
      title: 'Your Links',
      state: !!bookFile?.file
    },
    {
      icon: emailIcon,
      title: 'Email',
      state: !!id
    },
    {
      icon: promoteIcon,
      title: 'Promote',
      state: !!id
    }
  ];

  return (
    <>
      {footerData.map((item, index) => (
        <div
          className={`${card__iconCont} ${!item.state && card__state}`}
          key={index}
          onClick={() => handleFooterIconClick(item)}>
          <img src={item.icon} alt={item.title} />
          <p className={card__iconText}>{item.title}</p>
        </div>
      ))}
    </>
  );
}

export default ProductCardFooterLinks;
