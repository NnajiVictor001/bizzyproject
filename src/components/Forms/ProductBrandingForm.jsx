import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import PickMyColors from 'components/Products/PickMyColors';
import PickMyFonts from 'components/Products/PickMyFonts';
import PickMyBaseTextColor from 'components/Products/PickMyBaseTextColor';
import PickMyColorPallet from 'components/Products/PickMyColorPallet';
import { looksGoodProductKindActions } from 'helpers/looksGoodProductKindActions';
import { productBatchesSliceActions } from 'store/product-batches';

import { useBookCreation } from 'hooks/bookCreation';
import PageLoader from 'components/Common/PageLoader';
import styles from './ProductBrandingForm.module.scss';

function ProductBrandingForm() {
  const dispatch = useDispatch();
  const { editBookMutation, brandingPayload, updatePreviews, isLoading } = useBookCreation();
  const addFlag = useSelector((state) => state.productBranding.addFlag);
  const editBookId = useSelector((state) => state.createdBook.editBookId);

  const { form, form__bottom } = styles;

  const [showPicker, setShowPicker] = useState(false);

  const activeProductKind = useSelector((state) => state.productBranding.activeProductKind);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);

  const handleUpdateBranding = async () => {
    const data = await brandingPayload();
    const editResponse = await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
    const updatedPages = selectedTotalPages.map((page, index) => ({
      ...page,
      src: editResponse.data.pages[index].image_preview,
      image_preview: editResponse.data.pages[index].image_preview
    }));
    dispatch(productBatchesSliceActions.setSelectPages(updatedPages));
    if (editResponse.status !== 200) {
      throw new Error('Something went wrong.. Please try again');
    }
    await updatePreviews(editBookId);
  };

  useEffect(() => {
    const updateBranding = async () => await handleUpdateBranding();
    if (activeProductKind.id !== 0) {
      updateBranding();
    }
  }, [activeProductKind]);

  const looksGoodInputHandler = async () => {
    const nextProductKindItemId = { id: 1 };
    await handleUpdateBranding();
    looksGoodProductKindActions(nextProductKindItemId);
  };

  return (
    <div className={form}>
      {(editBookMutation.isLoading || isLoading) && <PageLoader text="Applying Branding..." />}
      {!addFlag ? (
        <>
          <PickMyColors />
          <PickMyFonts />
          <div className={form__bottom}>
            <PickMyBaseTextColor />
            <InputCheckboxCustom
              id="looksGood"
              checked
              onChange={looksGoodInputHandler}
              label="Looks Good! NEXT"
            />
          </div>
        </>
      ) : (
        <PickMyColorPallet
          setColors={() => null}
          onCheck={() => setShowPicker(!showPicker)}
          onBackClick={() => setShowPicker(!showPicker)}
        />
      )}
    </div>
  );
}

export default ProductBrandingForm;
