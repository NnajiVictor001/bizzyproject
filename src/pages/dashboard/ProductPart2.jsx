import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductAccordionLayout from 'components/Layouts/ProductAccordionLayout';
import CustomSlideShow from 'components/SlideShow/CustomSlideShow';
import { useBookCreation } from 'hooks/bookCreation';
import { useParams } from 'react-router-dom';
import PageLoader from 'components/Common/PageLoader';
import styles from './ProductPart2.module.scss';

function ProductPart2() {
  const params = useParams();

  const { container, container__left, container__right } = styles;
  const [isLoading, setIsLoading] = useState(true);
  const { loadBook } = useBookCreation();
  const plan = useSelector((state) => state.pricingPlan.plan);

  const editBookId = useSelector((state) => state.createdBook.editBookId);

  useEffect(() => {
    const loadBookData = async () => {
      setIsLoading(true);
      await loadBook(params.id);
      setIsLoading(false);
    };
    if (!editBookId) {
      loadBookData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div
      className={container}
      style={{ marginTop: plan.apiTitle === 'bizzy_free' ? '7.2rem' : '0' }}>
      <div className={container__left}>{!isLoading && <CustomSlideShow />}</div>
      <div className={container__right}>
        {isLoading ? <PageLoader text="Loading Book..." /> : <ProductAccordionLayout />}
      </div>
    </div>
  );
}

export default ProductPart2;
