import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { shade } from 'helpers/custom-functions';

import styles from './LeadMagBottomSection.module.scss';
import stylesFull from './LeadMagBottomSectionFull.module.scss';

function LeadMagBottomSection(props) {
  const { web, color, webBaseColor } = props;
  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, main__txt } = stylesToUse;

  const websiteColor = useSelector((state) => state.productBranding.selectedWebsiteColor);
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div
      className={main}
      style={{
        backgroundColor: web ? shade(color, 0.7) : shade(websiteColor, 0.7),
        color: webBaseColor || selectedBaseWebsiteColor
      }}>
      <p className={main__txt}>It won’t be free for forever.</p>
      <p className={main__txt}>Download it while it’s available!</p>
    </div>
  );
}

export default LeadMagBottomSection;
