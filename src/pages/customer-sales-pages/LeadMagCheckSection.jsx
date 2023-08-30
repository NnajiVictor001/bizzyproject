import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './LeadMagCheckSection.module.scss';
import stylesFull from './LeadMagCheckSectionFull.module.scss';

function CheckSection(props) {
  const { title, content, id, web, color } = props;
  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, main__body } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main}>
      <FontAwesomeIcon icon={faCheck} style={{ fontSize: 50, color: selectedBaseWebsiteColor }} />
      <div className={main__body} id={id}>
        <h3 style={{ color: color || selectedBaseWebsiteColor }}>{title}</h3>
        <p style={{ color: color || selectedBaseWebsiteColor }}>{content}</p>
      </div>
    </div>
  );
}

export default CheckSection;
