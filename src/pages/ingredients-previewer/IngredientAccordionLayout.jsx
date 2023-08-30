import React, { useEffect, useState } from 'react';
import { ingredientPreviewSliceActions } from 'store/ingredient-preview';
import { useSelector, useDispatch } from 'react-redux';
import IngredientAccordionLayoutGeneric from './IngredientAccordionLayoutGeneric';
import IngredientBrandingForm from './IngredientBrandingForm';
import IngredientForm from './IngredientForm';

function IngredientAccordionLayout() {
  const kindData = useSelector((state) => state.ingredientPreview.kindData);
  const activeKind = useSelector((state) => state.ingredientPreview.activeKind);
  const dispatch = useDispatch();

  const [activeComponent, setActiveComponent] = useState(<IngredientForm />);

  useEffect(() => {
    switch (activeKind.id) {
      case 0:
        setActiveComponent(<IngredientBrandingForm />);
        break;
      case 1:
        setActiveComponent(<IngredientForm />);
        break;
      default:
        setActiveComponent(null);
        break;
    }
  }, [activeKind]);

  const handleClickItem = (item) => {
    dispatch(ingredientPreviewSliceActions.toggleKind(item));
    dispatch(ingredientPreviewSliceActions.selectActiveKind(item));
  };

  return (
    <IngredientAccordionLayoutGeneric
      data={kindData}
      handleClickItem={handleClickItem}
      activeTitle={activeKind.title}
      activeComponent={activeComponent}
    />
  );
}

export default IngredientAccordionLayout;
