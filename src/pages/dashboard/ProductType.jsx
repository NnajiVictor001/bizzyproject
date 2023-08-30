import React, { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productTypeSliceActions } from 'store/product-type';
import { createdBookSliceActions } from 'store/created-book';
import { productBrandingSliceActions } from 'store/product-branding';
import { productBatchesSliceActions } from 'store/product-batches';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import ProductTypeCard from 'components/Cards/ProductTypeCard';
import NavButton from 'components/Buttons/NavButton';

import styles from './ProductType.module.scss';

function ProductType() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { container, product_types, bottom_con, bottom_con__Btn } = styles;
  const productTypes = useSelector((state) => state.productType.productTypes);
  const plan = useSelector((state) => state.pricingPlan.plan);

  const handleCancelButton = () => {};

  const handleNextButton = () => {
    dispatch(productTypeSliceActions.select(productTypes[0]));
    navigate('/dashboard/sales-niche-topic');
  };

  const handleProductTypeSelection = (item) => {
    dispatch(productBrandingSliceActions.setTitleGenerator(''));
    dispatch(productBrandingSliceActions.setTypeValue(''));
    dispatch(productBrandingSliceActions.selectColorPallete({}));
    dispatch(productBrandingSliceActions.selectFont({}));
    dispatch(productBrandingSliceActions.selectBaseColor({}));
    dispatch(productBrandingSliceActions.setSelectedWebsiteColor(''));
    dispatch(productBrandingSliceActions.setProductName(''));
    dispatch(productBrandingSliceActions.setProductSubTitle(''));
    dispatch(productBrandingSliceActions.selectMockup({}));
    dispatch(productBatchesSliceActions.setSelectPages([]));
    dispatch(createdBookSliceActions.setCreatedBook({}));
    dispatch(productTypeSliceActions.select(item));
    navigate('/dashboard/sales-niche-topic');
  };

  return (
    <div
      className={container}
      style={{ marginTop: plan.apiTitle === 'bizzy_free' ? '5.2rem' : '0' }}>
      <QuaternaryHeading txt="Choose Your Product Type" />
      <div className={product_types}>
        {productTypes.map((item, index) => (
          <ProductTypeCard key={index} data={item} onClick={handleProductTypeSelection} />
        ))}
      </div>
      <div className={bottom_con}>
        <NavButton
          className={bottom_con__Btn}
          type="button"
          txt="Cancel"
          bgColor="#ffffff"
          onClick={handleCancelButton}
        />
        <NavButton
          className={bottom_con__Btn}
          type="Next&nbsp; >"
          bgColor="#ffc800"
          txt="Next&nbsp; >"
          onClick={handleNextButton}
        />
      </div>
    </div>
  );
}

export default ProductType;
