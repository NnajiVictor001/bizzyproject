import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import placeholder from 'img/batch_placeholder.png';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { LinearProgress } from '@mui/material';
import { apiCall } from 'helpers/api-config';
import { ingredientPreviewSliceActions } from 'store/ingredient-preview';
import InfiniteScroll from 'react-infinite-scroll-component';
import { saveAs } from 'file-saver';
import log from '../../helpers/log';
import styles from './IngredientPreview.module.scss';

function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}

function IngredientPreview(props) {
  const { ingredientId } = props;
  const [selectedIngredientImg, setSelectedIngredientImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState([]);
  const inputRef = useRef();
  const [pagesCount, setPagesCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const {
    select_con,
    select_con__download,
    select_con__image,
    autocomplete_con,
    autocomplete_con__search_field,
    autocomplete_con__search_result,
    autocomplete_con__search_item,
    scrollbar,
    loading_more
  } = styles;

  const selectedIngredient = useSelector((state) => state.ingredientPreview.selectedIngredient);

  const ingredientHtml = useSelector((state) => state.ingredientPreview.ingredientHtml);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedIngredientImg(selectedIngredient.image_preview);
    setSearchValue(selectedIngredient.name);
  }, [selectedIngredient]);

  const fetchIngredientId = async (value) => {
    try {
      setIsLoading(true);
      let searchRes;

      if (!Number.isNaN(value)) {
        const resId = await apiCall('get', `/book-generator/ingredients/?id=${value}`);
        if (resId.status !== 200) throw new Error('Something went wrong.. Please try again');
        searchRes = resId.data.results;
      } else {
        const resName = await apiCall('get', `/book-generator/ingredients/?name=${value}`);
        if (resName.status !== 200) throw new Error('Something went wrong.. Please try again');
        searchRes = resName.data.results;
      }

      if (searchRes.length > 0) {
        setSearchValue(searchRes[0].name);
        dispatch(ingredientPreviewSliceActions.setSelectIngredient(searchRes[0]));
        setSelectedIngredientImg(searchRes[0].image_preview);
      }

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

  useEffect(() => {
    fetchIngredientId(ingredientId);
  }, [ingredientId]);

  const onSearchText = async (inputValue) => {
    if (inputValue.length >= 3) {
      try {
        setIsLoading(true);
        const res = await apiCall('get', `/book-generator/ingredients/?search=${inputValue}`);
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        const { count, next, _previous, results } = res.data;
        setPagesCount(count);
        setNextUrl(next);
        if (next) setHasMore(true);
        else setHasMore(false);
        setResult(results);

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
    } else {
      setResult([]);
    }
  };

  useEffect(() => {
    // initialize debounce function to search once user has stopped typing every half second
    inputRef.current = debounce(onSearchText, 500);
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    inputRef.current(inputValue);
  };

  const handleClickItem = (item) => {
    dispatch(ingredientPreviewSliceActions.setSelectIngredient(item));
    setSelectedIngredientImg(item.image_preview);
    setSearchValue(item.name);
    setResult([]);
  };

  const fetchMoreData = async () => {
    if (result.length >= pagesCount) {
      setHasMore(false);
      return;
    }
    try {
      const res = await apiCall(
        'get',
        nextUrl.replace(`${process.env.REACT_APP_API_URL_HTTP}`, '')
      );
      if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

      const { next, results } = res.data;
      setNextUrl(next);
      const temp = result.concat(results);
      setResult(temp);
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
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleClickOutside = () => {
    setResult([]);
    setHasMore(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const download = (format) => {
    if (selectedIngredient.name) {
      if (format === 'pdf') {
        saveAs(selectedIngredient.pdf_preview, `${selectedIngredient.name.split('.')[0]}.pdf`);
      } else if (format === 'html') {
        if (ingredientHtml.length > 0) {
          const child = window.open('Render HTML:blank', 'HTML');
          child.document.write(ingredientHtml);
          child.document.close();
        } else {
          setError(true);
          setErrorMessage('There is not HTML data to render');
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      } else {
        saveAs(selectedIngredient.image_preview, `${selectedIngredient.name.split('.')[0]}.png`);
      }
    }
  };

  return (
    <>
      <div className={autocomplete_con} ref={ref}>
        <input
          type="text"
          className={autocomplete_con__search_field}
          value={searchValue}
          onChange={handleChange}
        />
        {result.length > 0 && (
          <InfiniteScroll
            dataLength={result.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className={loading_more}>Loading More...</h4>}
            height={350}
            className={scrollbar}>
            <ul className={autocomplete_con__search_result}>
              {result.map((item, index) => (
                <li
                  key={index}
                  className={autocomplete_con__search_item}
                  onClick={() => handleClickItem(item)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )}
      </div>
      <div className={select_con}>
        <div className={select_con__download}>
          <a download="file" onClick={() => download('pdf')}>
            PDF
          </a>
          <a download="file" onClick={() => download('png')}>
            PNG
          </a>
          <a download="file" onClick={() => download('html')}>
            HTML
          </a>
        </div>
        <img
          src={selectedIngredientImg || placeholder}
          alt="selected"
          className={select_con__image}
        />
      </div>
      {isLoading && <LinearProgress color="inherit" />}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </>
  );
}

export default IngredientPreview;
