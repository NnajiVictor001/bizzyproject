import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import ImageMockUpSlideShow from 'components/SlideShow/ImageMockUpSlideShow';
import PreviewModal from 'components/Modals/PreviewModal';
import PublishModal from 'components/Modals/PublishModal';
import { productBrandingSliceActions } from 'store/product-branding';
import { useBookCreation } from 'hooks/bookCreation';
import styles from './ProductMockUpForm.module.scss';

function ProductMockUpForm() {
  const {
    form,
    form__body,
    form__body__left,
    form__body__left__choose,
    form__body__left__b_txt,
    form__body__right,
    form__bottom
  } = styles;

  const { editBookMutation } = useBookCreation();
  const dispatch = useDispatch();

  const mockupsData = useSelector((state) => state.productBranding.mockupsData);
  const selectedMockup = useSelector((state) => state.productBranding.selectedMockup);
  const editBookId = useSelector((state) => state.createdBook.editBookId);

  const activeProductKind = useSelector((state) => state.productBranding.activeProductKind);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [isOpenPublishModal, setIsOpenPublishModal] = useState(false);
  const [publishData, setPublishData] = useState({});

  const handleSelectedData = (data) => {
    dispatch(productBrandingSliceActions.selectMockup(data));
  };

  const handlePreviewModal = (data) => {
    setPublishData(data);
    setIsOpenPublishModal(true);
  };

  const handlePublishModal = (data) => {
    console.log('return data of Publish modal=>', data);
  };

  const handleUpdateMockUp = async () => {
    const data = {
      mockup: selectedMockup.id
    };
    return await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
  };

  useEffect(() => {
    const updateMockup = async () => {
      await handleUpdateMockUp();
    };
    if (activeProductKind.id !== 4) {
      updateMockup();
    }
  }, [activeProductKind]);

  const looksGoodInputHandler = async () => {
    await handleUpdateMockUp();
    setIsOpenPreviewModal(true);
  };

  return (
    <div className={form}>
      <div className={form__body}>
        <div className={form__body__left}>
          <p className={form__body__left__choose}>Choose a Mockup.</p>
          <p className={form__body__left__b_txt}>
            This will go on your sales page AND be in your emails & ads.
          </p>
        </div>
        <div className={form__body__right}>
          <ImageMockUpSlideShow
            data={mockupsData}
            selectedData={selectedMockup}
            handleSelectedData={handleSelectedData}
          />
        </div>
      </div>
      <div className={form__bottom}>
        <InputCheckboxCustom
          id="addmockuppage"
          checked
          onChange={looksGoodInputHandler}
          label="Looks Good! NEXT"
        />
      </div>
      {isOpenPreviewModal && (
        <PreviewModal setIsOpenPreviewModal={setIsOpenPreviewModal} callback={handlePreviewModal} />
      )}
      {isOpenPublishModal && (
        <PublishModal
          data={publishData}
          setIsOpenPublishModal={setIsOpenPublishModal}
          callback={handlePublishModal}
        />
      )}
    </div>
  );
}

export default ProductMockUpForm;
