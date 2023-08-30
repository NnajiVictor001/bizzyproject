import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProductCard from 'components/Cards/ProductCard';
import Button from 'components/Buttons/Button';
import Search from 'components/InputFields/Search';

import { ProductLibrarySliceActions } from 'store/product-library';
import { productBrandingSliceActions } from 'store/product-branding';

import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { apiCall } from 'helpers/api-config';
import { CircularProgress } from '@mui/material';
import { COLOR_BLACK, COLOR_LIGHT_ORANGE } from 'constants/Colors';
import log from '../../helpers/log';

import styles from './MyProductLibrary.module.scss';

function MyProductLibrary(props) {
  const { onlyPromoteProducts, website } = props;
  const accessToken = localStorage.getItem('token');

  const {
    main,
    main__top_container,
    main__row3,
    main__rcProducts,
    main__search,
    main__productCard,
    main__btmBtn,
    main__btmBtnCont,
    main__btmBtnText,
    main__mainBtn
  } = styles;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [booksData, setBooksData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall('get', '/book-generator/books/', accessToken);

        if (!res.data.results.length) navigate('/dashboard/product-type');

        const resCover = await apiCall('get', '/book-generator/pages/?type=cover', accessToken);

        const coversResults = resCover.data.results;
        if (onlyPromoteProducts) {
          setBooksData(res.data.results.filter((book) => book.sale_page !== null));
        } else {
          setBooksData(res.data.results);
        }

        dispatch(ProductLibrarySliceActions.setAllProducts(res.data.results));
        dispatch(productBrandingSliceActions.setCoversData(coversResults));
        setNextUrl(res.data.next);
        if (res.data.next) {
          setShowMore(true);
        } else setShowMore(false);

        setIsLoading(false);
        setIsUpdated(false);
      } catch (err) {
        if (err.message === 'Network Error') {
          log.error(JSON.stringify(err));
          setErrorMessage('Connectivity error. Please try again');
        } else if (err.response?.data?.errors[0]?.message) {
          setErrorMessage(err.response?.data?.errors[0]?.message);
        } else {
          log.error(JSON.stringify(err));
          setErrorMessage('Something went wrong. Please try again');
        }
        setIsLoading(false);
        setIsUpdated(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    };
    fetchBooks();
  }, [isUpdated]);

  useEffect(() => {
    const temp = booksData.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setDisplayData(temp);
  }, [searchItem]);

  useEffect(() => {
    setDisplayData(booksData);
  }, [booksData]);

  const onSearchHandler = (evt) => {
    setSearchItem(evt.target.value);
  };

  const onShowMore = async () => {
    try {
      setIsLoading(true);
      const pageNum = nextUrl.split('?')[1];
      const res = await apiCall('get', `/book-generator/books/?${pageNum}`, accessToken);
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      const { results } = res.data;
      const updatedBooksData = booksData.concat(results);
      setBooksData(updatedBooksData);
      dispatch(ProductLibrarySliceActions.setAllProducts(updatedBooksData));
      setNextUrl(res.data.next);

      if (res.data.next) {
        setShowMore(true);
      } else setShowMore(false);

      setIsLoading(false);
    } catch (err) {
      if (err.message === 'Network Error') {
        log.error(JSON.stringify(err));
        setErrorMessage('Connectivity error. Please try again');
      } else if (err.response?.data?.errors[0]?.message) {
        setErrorMessage(err.response?.data?.errors[0]?.message);
      } else {
        log.error(JSON.stringify(err));
        setErrorMessage('Something went wrong. Please try again');
      }
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleUpdate = (data) => {
    setIsUpdated(data);
  };

  return (
    <div className={main}>
      <div className={main__top_container}>
        <p className={main__rcProducts}>My Product Library</p>
        <Search
          placeholder="Search Products"
          className={main__search}
          value={searchItem}
          onChange={onSearchHandler}
        />
      </div>
      <div className={main__row3}>
        {displayData.map((item, index) => (
          <div key={index} className={main__productCard}>
            <ProductCard
              item={item}
              callback={handleUpdate}
              website={website}
              onlyPromoteProducts={onlyPromoteProducts}
            />
          </div>
        ))}
      </div>
      {isLoading && <CircularProgress color="inherit" />}
      {showMore && (
        <div className={main__btmBtnCont}>
          <div className={main__btmBtn}>
            <Button
              className={main__mainBtn}
              bgColor={COLOR_LIGHT_ORANGE}
              color={COLOR_BLACK}
              onClick={onShowMore}>
              <p className={main__btmBtnText}>Show Me More</p>
            </Button>
          </div>
        </div>
      )}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </div>
  );
}

export default MyProductLibrary;
