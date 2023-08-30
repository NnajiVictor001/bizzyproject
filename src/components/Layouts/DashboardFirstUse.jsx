import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import NavButton from 'components/Buttons/NavButton';
import Hotspot from 'components/Hotspot/Hotspot';

import { DashboardFirstUseActions } from 'store/dashboard-first-use';
import { COLOR_YELLOW_LIGHTER } from 'constants/Colors';
import YoutubeEmbed from 'components/YoutubeEmbed/YoutubeEmbed';
import styles from './DashboardFirstUse.module.scss';

const url = 'https://www.youtube.com/watch?v=E7wJTI-1dvQ';

function DashboardFirstUse() {
  const {
    fullScreen,
    fullScreen__info,
    popup,
    popup__close,
    popup__video,
    popup__p,
    popup__btn,
    popup__link
  } = styles;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.dashboardFirstUse.showModal);

  const closeModal = (evt) => {
    dispatch(DashboardFirstUseActions.hideModal());

    if (evt.detail >= 2) dispatch(DashboardFirstUseActions.flipLayout());
  };

  const closeLayout = () => {
    dispatch(DashboardFirstUseActions.flipLayout());
  };

  const handleGoToProductPartOne = () => {
    dispatch(DashboardFirstUseActions.flipLayout());
    navigate('/dashboard/product-type');
  };

  return (
    <div className={fullScreen} onClick={closeModal}>
      <h3 className={fullScreen__info} onClick={closeLayout}>
        Double click anywhere or click here to exit
      </h3>
      <Hotspot
        rotateDirection="left"
        title="LET’S GET STARTED"
        subTitle="See All the Products You Made"
        content="This is your product library.  After you create a product you can manage and acess them here."
        position="Products"
      />
      <Hotspot
        rotateDirection="top"
        title="LET’S GET STARTED"
        subTitle="Get Your Customer List"
        content="Got buyers? Leads? This is where you will get your list so you can follow up if needed."
        position="List"
      />
      <Hotspot
        rotateDirection="top"
        title="LET’S GET STARTED"
        subTitle="Upgrade Your Account"
        content="Need to update your information? Change your plan? This is your account profile."
        position="Profile"
      />
      <Hotspot
        rotateDirection="right"
        title="LET’S GET STARTED"
        subTitle="Get Feedback"
        content="Need help? Found a bug? Stuck?? Let us help you!!"
        position="Help"
      />
      {showModal && (
        <div className={popup}>
          <span className={popup__close} onClick={closeModal} />
          <div className={popup__video}>
            <YoutubeEmbed url={url} />
          </div>
          <QuaternaryHeading txt="Hi Name!" />
          <p className={popup__p}>
            We’re excited for you to experience firsthand how to supercharge <br /> your products.
            How your you like to get started?
          </p>
          <NavButton
            onClick={handleGoToProductPartOne}
            className={popup__btn}
            bgColor={COLOR_YELLOW_LIGHTER}
            txt="Create My First Product"
          />
          <NavLink className={popup__link} to="#">
            Take a quick tour
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default DashboardFirstUse;
