import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from 'components/InputFields/Input';
import { COLOR_ORANGE } from 'constants/Colors';
import NavButton from 'components/Buttons/NavButton';

import PublishImage from 'img/publishImage.png';
import CopyBox from 'components/CopyBox/CopyBox';
import styles from './PublishSection.module.scss';
import { getCustomWebsiteUrl } from '../../helpers/custom-functions';

function PublishSection(props) {
  const { subDomain } = props;
  const params = useParams();
  const { bookId } = params;

  const initialFormData = {
    url1: getCustomWebsiteUrl(subDomain),
    url2: `PRODUCTNAME.${process.env.REACT_APP_CUSTOM_DOMAIN}/Order`,
    url3: `PRODUCTNAME.${process.env.REACT_APP_CUSTOM_DOMAIN}/Deliver`
  };

  const navigate = useNavigate();
  const [urls, setUrls] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUrls({
      ...urls,
      [name]: value
    });
  };

  const {
    main,
    main__inputsMainContainer,
    main__leftRow,
    main__inputContainer,
    main__inputWidth,
    main__input,
    main__inputButton,
    main__publishImage,
    main__btnCont,
    main__open_btn,
    main__btn,
    main__title,
    main__description
  } = styles;

  const navigateToPromote = () => {
    navigate(`/dashboard/promo-packs/${bookId}`);
  };

  return (
    <div className={main}>
      <div className={main__inputsMainContainer}>
        <div className={main__leftRow}>
          <div className={main__inputContainer}>
            <div className={main__inputWidth}>
              <Input
                type="text"
                placeholder="Sales Page URL"
                className={main__input}
                defaultValue={urls.url1}
                noPointerEvents
                onChange={handleInputChange}
                name="url1"
              />
            </div>
            <CopyBox text={urls.url1} className={main__inputButton}>
              Copy
            </CopyBox>
            <div className={main__open_btn} onClick={() => window.open(urls.url1, '_blank')}>
              Open
            </div>
          </div>
          {/* <div className={main__inputContainer}>
            <div className={main__inputWidth}>
              <Input
                type="text"
                placeholder="Order Form URL"
                className={main__input}
                name="url2"
                defaultValue={urls.url2}
                noPointerEvents={true}
                onChange={handleInputChange}
              />
            </div>
            <CopyBox text={urls.url2} className={main__inputButton}>
              Copy
            </CopyBox>
          </div> */}
          {/* <div className={main__inputContainer}>
            <div className={main__inputWidth}>
              <Input
                type="text"
                placeholder="Delivery Page URL"
                className={main__input}
                name="url3"
                defaultValue={urls.url3}
                noPointerEvents={true}
                onChange={handleInputChange}
              />
            </div>
            <CopyBox text={urls.url3} className={main__inputButton}>
              Copy
            </CopyBox>
          </div> */}
        </div>
        <div>
          <img className={main__publishImage} src={PublishImage} alt="publish" />
        </div>
      </div>
      <div>
        <p className={main__title}>
          Copy your sales page URL and share that to promote your product.
        </p>
        <p className={main__description}>
          In the final step we will give you some easy ways to promote your product so you can start
          EARNING!!
        </p>
      </div>
      <div className={main__btnCont}>
        <NavButton
          bgColor={COLOR_ORANGE}
          className={main__btn}
          onClick={navigateToPromote}
          txt="YES!  Let’s Promote & EARN!"
        />
      </div>
    </div>
  );
}

export default PublishSection;
