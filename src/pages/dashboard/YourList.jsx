import React, { useEffect, useState } from 'react';

import { CSVLink } from 'react-csv';

import QuaternaryHeading from 'components/Typography/QuaternaryHeading';
import ListFilter from 'components/Layouts/ListFilter';
import YourListTable from 'components/Tables/YourListTable';
import Pagination from 'components/Layouts/Pagination';
import Search from 'components/InputFields/Search';
import DownloadButton from 'components/Buttons/DownloadButton';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import CircularProgress from '@mui/material/CircularProgress';

import { apiCall } from 'helpers/api-config';
import log from '../../helpers/log';
import styles from './YourList.module.scss';

function YourList() {
  const accessToken = localStorage.getItem('token');

  const {
    container,
    filter_container,
    error,
    download_button_container,
    download_button,
    flex_center
  } = styles;

  const Months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const [filterMonth, setFilterMonth] = useState('All');
  const [filterProduct, setFilterProduct] = useState('All');
  const [filterCustomer, setFilterCustomer] = useState('All');

  const [totalData, setTotalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const [searchItem, setSearchItem] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchYourListData() {
      try {
        setIsLoading(true);

        const res = await apiCall('get', '/sales/orders/client-list/', accessToken);

        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');

        setIsLoading(false);
        const { results } = res.data;
        setTotalData(results);
        setDisplayData(results);
        let tempNames = ['All'];
        const temp = results.map((item) => `${item.first_name} ${item.last_name}`);
        tempNames = [...tempNames, ...temp];
        setCustomers(tempNames);
        let tempProducts = ['All'];
        results.map((item) => {
          const tempResults = item.purchased_books.map((el) => `${el.name}(${el.type})`);
          tempProducts = [...tempProducts, ...tempResults];
          return null;
        });
        const uniqueProducts = tempProducts.filter((val, id, array) => array.indexOf(val) === id);
        setProducts(uniqueProducts);
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
        setErrorFlag(true);
        setTimeout(() => {
          setErrorFlag(false);
        }, 3000);
      }
    }
    fetchYourListData();
  }, []);

  useEffect(() => {
    const temp = [...totalData]
      .filter((item) => {
        if (searchItem.length > 0) {
          return (
            `${item.first_name} ${item.last_name}`
              .toLowerCase()
              .includes(searchItem.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.email.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.delivered_at.toLowerCase().includes(searchItem.toLowerCase())
          );
        }
        return true;
      })
      .filter((item) => {
        if (filterMonth === 'All') {
          return true;
        }
        const tempDate = new Date(item.delivered_at);
        const monthIndex = Months.findIndex((e) => e === filterMonth);
        if (tempDate.getMonth() + 1 === monthIndex) {
          return true;
        }
        return false;
      })
      .filter((item) => {
        if (filterProduct === 'All') {
          return true;
        }
        if (item.purchased_books.find((el) => `${el.name}(${el.type})` === filterProduct))
          return true;
        return false;
      })
      .filter((item) => {
        if (filterCustomer === 'All') {
          return true;
        }
        if (`${item.first_name} ${item.last_name}` === filterCustomer) return true;
        return false;
      });
    setDisplayData(temp);
    setCurrentPage(1);
  }, [filterMonth, filterProduct, filterCustomer, searchItem]);

  const callbackMonth = (data) => {
    setFilterMonth(data);
  };

  const callbackProduct = (data) => {
    setFilterProduct(data);
  };

  const callbackCustomer = (data) => {
    setFilterCustomer(data);
  };

  const onSearchHandler = (evt) => {
    setSearchItem(evt.target.value);
  };

  const indexOfLastData = currentPage * recordsPerPage;
  const indexOfFirstData = indexOfLastData - recordsPerPage;
  const currentDatas = displayData.slice(indexOfFirstData, indexOfLastData);
  const nPages = Math.ceil(displayData.length / recordsPerPage);

  const dataToDownload = displayData.map((item, index) => {
    const purchasedBooks = item.purchased_books
      .map((x) => x.name)
      .filter(Boolean)
      .join(', ');

    const lastActivity = new Date(item.delivered_at).toUTCString();

    return {
      No: index + 1,
      Name: `${item.first_name} ${item.last_name}`,
      Phone: item.phone,
      Email: item.email,
      LastActivity: lastActivity,
      Purchased: purchasedBooks
    };
  });

  return (
    <div className={container}>
      <QuaternaryHeading txt="Your List" />
      <div className={filter_container}>
        <ListFilter title="Month" list={Months} callback={callbackMonth} />
        <ListFilter title="All Products" list={products} callback={callbackProduct} />
        <ListFilter title="Customer name" list={customers} callback={callbackCustomer} />
        <Search value={searchItem} onChange={onSearchHandler} />
        <div className={download_button_container}>
          <CSVLink data={dataToDownload} filename="my-file.csv">
            <DownloadButton
              className={download_button}
              type="button"
              txt="Download as CSV"
              bgColor="#ffc800"
            />
          </CSVLink>
        </div>
      </div>
      {isLoading ? (
        <div className={flex_center}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <YourListTable data={currentDatas} />
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
      {currentDatas.length === 0 && <p className={error}>No data found</p>}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={errorFlag} />
    </div>
  );
}

export default YourList;
