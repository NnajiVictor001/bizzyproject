import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './LeadMagFooterSection.module.scss';
import stylesFull from './LeadMagFooterSectionFull.module.scss';

function LeadMagFooterSection({ web, webBaseColor }) {
  const stylesToUse = useMemo(() => {
    if (web) {
      return structuredClone(stylesFull);
    }
    return structuredClone(styles);
  }, [styles, stylesFull, web]);
  const { main, main__inner, main__menu_con } = stylesToUse;
  const selectedBaseWebsiteColor = useSelector(
    (state) => state.productBranding.selectedBaseWebsiteColor
  );

  return (
    <div className={main} style={{ color: webBaseColor || selectedBaseWebsiteColor }}>
      <div className={main__inner}>
        {/* <img src={leadLogo} alt="lead logo " /> */}
        <div className={main__menu_con}>
          <ul>
            <li>
              {' '}
              <a
                rel="noreferrer"
                href="https://docs.google.com/document/d/e/2PACX-1vSJvb7uC9fzEZu5-IYT3jUEUiVactnXNo8c4Lt9whBwRTo9tIUCMYTi31Ez5usOEIoqFPDe8HzqkCF5/pub"
                target="_blank">
                Terms
              </a>
            </li>
            <li>
              <a
                rel="noreferrer"
                href="https://docs.google.com/document/d/e/2PACX-1vSJvb7uC9fzEZu5-IYT3jUEUiVactnXNo8c4Lt9whBwRTo9tIUCMYTi31Ez5usOEIoqFPDe8HzqkCF5/pub"
                target="_blank">
                Privacy
              </a>
            </li>
          </ul>
          <p>© 2023 Bizzy.ai and 1CH LLC. All Rights Reserved.</p>
        </div>
        {/* <div className={main__social_con}>
          <img src={iconsDribbble} alt="icons dribbble" />
          <img src={iconsInstagram} alt="icons instagram" />
          <img src={iconsLinkedin} alt="icons linkedin" />
        </div> */}
      </div>
    </div>
  );
}

export default LeadMagFooterSection;
