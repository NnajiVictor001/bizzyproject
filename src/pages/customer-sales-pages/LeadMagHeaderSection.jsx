import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { Link } from 'react-scroll';

import styles from './LeadMagHeaderSection.module.scss';
import stylesFull from './LeadMagHeaderSectionFull.module.scss';

function LeadMagHeaderSection(props) {
  const { websiteMainData, web, webHeading, webButton, webButtonColor, color } = props;

  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { heading, heading__title, heading__button, heading__button_txt, heading__wrapper } =
    stylesToUse;

  const websiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);

  return (
    <div className={heading} style={{ backgroundColor: web ? color : websiteColor }} id="header">
      {web ? (
        <div className={heading__wrapper}>
          <div className={heading__title}>{webHeading}</div>
          <Link
            to="form"
            className={heading__button}
            spy
            smooth
            duration={500}
            style={{ backgroundColor: webButtonColor }}>
            <p className={heading__button_txt}>{webButton}</p>
          </Link>
        </div>
      ) : (
        <>
          <div className={heading__title}>{websiteMainData?.sp_stickybar_heading_b?.val}</div>
          <div
            className={heading__button}
            style={{ backgroundColor: websiteMainData?.sp_button?.color }}>
            <p className={heading__button_txt}>{websiteMainData?.sp_button?.val}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default LeadMagHeaderSection;
