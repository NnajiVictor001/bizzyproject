import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavButton from 'components/Buttons/NavButton';
import Input from 'components/InputFields/Input';
import { COLOR_ORANGE } from 'constants/Colors';
import { Badge, LinearProgress } from '@mui/material';
import { StatDashboardSliceActions } from 'store/stat-dashboard-goals';
import { webCreationSliceActions } from 'store/web-creation';

import styles from './DomainSection.module.scss';

function DomainSection(props) {
  const {
    main,
    main__heading,
    main__formContainer,
    main__formHeading,
    main__form,
    main__input,
    main__placeholder,
    main__leftInput,
    main__rightInput,
    main__formLeft,
    main__formRight,
    main__btnCont,
    main__btn,
    main__publishHeading,
    main__text,
    main__funnelsCont
  } = styles;

  const { funnels, onFirstClick, isLoading } = props;

  const [domainName, setDomainName] = useState(`.${process.env.REACT_APP_CUSTOM_DOMAIN}`);
  const dispatch = useDispatch();

  const subDomain = useSelector((state) => state.webCreation.subDomain);

  const inputSubDomainHandler = (evt) => {
    setDomainName(evt.target.value);
  };

  const handleSubDomainInput = (value) => {
    dispatch(webCreationSliceActions.setSubDomain(value));
  };

  return (
    <div className={main}>
      <h4 className={main__heading}>Create Your Link So You Can Publish</h4>
      <div className={main__formContainer}>
        <p className={main__formHeading}>Choose Your Sub-Domain</p>
        <div className={main__form}>
          <div className={main__formLeft}>
            <Input
              placeholderClass={main__placeholder}
              className={`${main__input} ${main__leftInput}`}
              placeholder="Sub-Domain"
              value={subDomain}
              onChange={(e) => handleSubDomainInput(e.target.value?.toLowerCase())}
            />
          </div>
          <div className={main__formRight}>
            <Input
              placeholderClass={main__placeholder}
              className={`${main__input} ${main__rightInput}`}
              defaultValue={domainName}
              placeholder="Domain"
              noPointerEvents
              onChange={inputSubDomainHandler}
            />
          </div>
        </div>
        <div className={main__btnCont}>
          {isLoading ? (
            <LinearProgress color="inherit" />
          ) : (
            <NavButton
              onClick={() => {
                onFirstClick();
                dispatch(StatDashboardSliceActions.selectNextGoal());
              }}
              bgColor={COLOR_ORANGE}
              className={main__btn}
              txt="Awesome!!  Let’s Publish & Promote!"
            />
          )}
        </div>
        <h5 className={`${main__formHeading} ${main__publishHeading}`}>
          OR Publish To Another Funnel Platform
        </h5>
        <p className={main__text}>
          This will take you to that funnel platform to complete your website.{' '}
        </p>
      </div>
      <div className={main__funnelsCont}>
        {funnels.map((item, index) => (
          <div key={index}>
            <Badge
              badgeContent="Coming Soon !"
              sx={{
                '& .MuiBadge-badge': {
                  color: 'white',
                  backgroundColor: '#f54c40'
                }
              }}>
              <img src={item.img} alt={item.alt} />
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DomainSection;
