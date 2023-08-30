import React, { useEffect, useState } from 'react';
import { staffPageSliceActions } from 'store/staff-preview';
import { useSelector, useDispatch } from 'react-redux';
import StaffPageAccordionLayoutGeneric from './StaffPageAccordionLayoutGeneric';
import StaffPageForm from './StaffPageForm';

function IngredientAccordionLayout() {
  const kindData = useSelector((state) => state.staffPage.kindData);
  const activeKind = useSelector((state) => state.staffPage.activeKind);
  const dispatch = useDispatch();

  const [activeComponent, setActiveComponent] = useState(<StaffPageForm />);

  useEffect(() => {
    switch (activeKind.id) {
      case 0:
        setActiveComponent(<StaffPageForm />);
        break;
      default:
        setActiveComponent(null);
        break;
    }
  }, [activeKind]);

  const handleClickItem = (item) => {
    dispatch(staffPageSliceActions.toggleKind(item));
    dispatch(staffPageSliceActions.selectActiveKind(item));
  };

  return (
    <StaffPageAccordionLayoutGeneric
      data={kindData}
      handleClickItem={handleClickItem}
      activeTitle={activeKind.title}
      activeComponent={activeComponent}
    />
  );
}

export default IngredientAccordionLayout;
