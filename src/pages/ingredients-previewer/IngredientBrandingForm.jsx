import React, { useDispatch } from 'react-redux';
import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import PickMyFonts from 'components/Products/PickMyFonts';
import PickMyBaseTextColor from 'components/Products/PickMyBaseTextColor';

import PalleteSlideShow from 'components/SlideShow/PalleteSlideShow';
import { ingredientPreviewSliceActions } from 'store/ingredient-preview';
import styles from './IngredientBrandingForm.module.scss';

function IngredientBrandingForm() {
  const accessToken = localStorage.getItem('token');

  const dispatch = useDispatch();

  const { form, form__bottom, title_con, title } = styles;

  const looksGoodInputHandler = (_evt) => {
    const nextKind = { id: 1 };
    dispatch(ingredientPreviewSliceActions.toggleKind(nextKind));
    dispatch(ingredientPreviewSliceActions.selectActiveKind(nextKind));
  };

  return (
    <div className={form}>
      {accessToken && (
        <>
          <div className={title_con}>
            <p className={title}>Pick My Colors</p>
          </div>
          <PalleteSlideShow />
          <PickMyFonts />
        </>
      )}
      <div className={form__bottom}>
        {accessToken && <PickMyBaseTextColor />}
        <InputCheckboxCustom
          id="looksGood"
          checked
          onChange={looksGoodInputHandler}
          label="Looks Good! NEXT"
        />
      </div>
    </div>
  );
}

export default IngredientBrandingForm;
