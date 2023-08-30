import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductBrandingForm from 'components/Forms/ProductBrandingForm';
import ProductEndPageForm from 'components/Forms/ProductEndPage';
import ProductAddPagesForm from 'components/Forms/ProductAddPagesForm';
import ProductTitleCoverForm from 'components/Forms/ProductTitleCoverForm';
import ProductMockUpForm from 'components/Forms/ProductMockUpForm';
import accordionDefaultCheckedMark from 'img/accordion_default_checked.svg';
import { productBrandingSliceActions } from 'store/product-branding';
import PreviewModal from 'components/Modals/PreviewModal';
import PublishModal from 'components/Modals/PublishModal';
import PageLoader from 'components/Common/PageLoader';
import { useBookCreation } from 'hooks/bookCreation';
import styles from './ProductAccordionLayout.module.scss';
import ProductAccordionLayoutGeneric from './ProductAccordionLayoutGeneric';

function ProductAccordionLayout() {
  const productsKindData = useSelector((state) => state.productBranding.productsKindData);
  const activeProductKind = useSelector((state) => state.productBranding.activeProductKind);
  const dispatch = useDispatch();
  const { editTitleAndCover, editAboutMePages } = useBookCreation();

  const { container, settings_default_item, settings_default_item__text } = styles;

  const [activeComponent, setActiveComponent] = useState(<ProductBrandingForm />);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [isOpenPublishModal, setIsOpenPublishModal] = useState(false);
  const [publishData, setPublishData] = useState({});
  const [customLoader, setCustomLoader] = useState({
    isLoading: false,
    text: ''
  });

  useEffect(() => {
    switch (activeProductKind.id) {
      case 0:
        setActiveComponent(<ProductBrandingForm />);
        break;
      case 1:
        setActiveComponent(<ProductEndPageForm />);
        break;
      case 2:
        setActiveComponent(<ProductAddPagesForm />);
        break;
      case 3:
        setActiveComponent(<ProductTitleCoverForm />);
        break;
      case 4:
        setActiveComponent(<ProductMockUpForm />);
        break;
      default:
        setActiveComponent(null);
        break;
    }
  }, [activeProductKind]);

  const handleClickItem = async (item) => {
    if (activeProductKind.id === 2 && item.id !== 2) {
      setCustomLoader({ isLoading: true, text: 'Updating About Me Pages...' });
      await editAboutMePages();
      setCustomLoader({ isLoading: false, text: '' });
    }

    // Update title and cover section
    if (activeProductKind.id === 3 && item.id !== 3) {
      setCustomLoader({ isLoading: true, text: 'Updating Title and Cover...' });
      await editTitleAndCover();
      setCustomLoader({ isLoading: false, text: '' });
    }

    dispatch(productBrandingSliceActions.toggleProductsKind(item));
    dispatch(productBrandingSliceActions.selectActiveProductKind(item));
  };

  const handleClickDefaultItem = () => {
    setIsOpenPreviewModal(true);
  };

  const handlePreviewModal = (data) => {
    setPublishData(data);
    setIsOpenPublishModal(true);
  };

  const handlePublishModal = (data) => {
    console.log('return data of Publish modal(default click)=>', data);
  };

  return (
    <div className={container}>
      {customLoader.isLoading ? <PageLoader text={customLoader.text} /> : null}
      <ProductAccordionLayoutGeneric
        data={productsKindData}
        handleClickItem={handleClickItem}
        activeTitle={activeProductKind.title}
        activeComponent={activeComponent}
      />
      <div className={settings_default_item} onClick={handleClickDefaultItem}>
        <img src={accordionDefaultCheckedMark} alt="accordion default check mark" />
        <p className={settings_default_item__text}>Preview and Publish</p>
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

export default ProductAccordionLayout;
