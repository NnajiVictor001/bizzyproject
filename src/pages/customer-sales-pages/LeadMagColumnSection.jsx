import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styles from './LeadMagColumnSection.module.scss';
import stylesFull from './LeadMagColumnSectionFull.module.scss';

function LeadMagColumnSection(props) {
  const { number, title, content, web } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const {
    main,
    main__header,
    main__header__number,
    main__header__line,
    main__body,
    main__title,
    main__content
  } = stylesToUse;

  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  const websiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

  return (
    <div className={main}>
      <div className={main__header}>
        <p
          className={main__header__number}
          style={{
            backgroundColor: websiteColor && websiteColor,
            color: selectedBaseWebsiteColor
          }}>
          {number}
        </p>
        <div
          className={main__header__line}
          style={{ borderTop: `2px dashed ${websiteColor && websiteColor}` }}
        />
      </div>
      <div className={main__body}>
        <p className={main__title} style={{ color: selectedBaseWebsiteColor }}>
          {title}
        </p>
        <p
          className={main__content}
          style={{
            color: selectedBaseWebsiteColor
          }}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default LeadMagColumnSection;
