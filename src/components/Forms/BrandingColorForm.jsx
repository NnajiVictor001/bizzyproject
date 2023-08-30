import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import NavButton from 'components/Buttons/NavButton';
import PickerColorsCard from 'components/Layouts/PickerColorsCard';

import PickerMyColorPalette from 'components/Layouts/PickerMyColorPalette';
import styles from './BrandingColorForm.module.scss';

function BrandingColorForm() {
  const {
    form,
    form__layout,
    form__fullWidth_new,
    form__fullWidth,
    form__leftBtn,
    form__rightBtn
  } = styles;

  const brandings = useSelector((state) => state.brandingState.brandings);
  const [brandingsDisplay, setBrandingsDisplay] = useState([]);
  const [moreButton, setMoreButton] = useState(false);
  const [allOwnButton, setAllOwnButton] = useState(false);

  useEffect(() => {
    if (!moreButton) {
      let temp = [];
      if (brandings && brandings.length > 4) {
        for (let i = 0; i < 4; i++) {
          temp.push(brandings[i]);
        }
      } else temp = brandings;
      setBrandingsDisplay(temp);
    } else setBrandingsDisplay(brandings);
  }, [moreButton, brandings]);

  const handleSeeMore = () => {
    setMoreButton(!moreButton);
  };

  const handleOwnColors = () => {
    setAllOwnButton(!allOwnButton);
  };

  const submitForm = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className={form}>
      <QuaternaryHeading txt="Choose Your Brand Colors" />
      <form onSubmit={submitForm} className={form__layout}>
        {brandingsDisplay &&
          brandingsDisplay.map((item, index) => <PickerColorsCard key={index} branding={item} />)}
        <div className={form__fullWidth}>
          {brandings && brandings.length > 4 && (
            <button type="button" onClick={handleSeeMore}>
              {!moreButton ? 'See More' : 'See Less'}
            </button>
          )}
          <button type="button" onClick={handleOwnColors}>
            Add my own colors
          </button>
        </div>
        {allOwnButton && (
          <div className={form__fullWidth_new}>
            <PickerMyColorPalette brandings={brandings} />
          </div>
        )}

        <NavButton className={form__leftBtn} type="button" txt="Cancel" bgColor="#ffffff" />
        <NavButton className={form__rightBtn} type="submit" bgColor="#ffc800" txt="Next&nbsp; >" />
      </form>
    </div>
  );
}

export default BrandingColorForm;
