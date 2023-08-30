import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StatDashboard from 'components/StatDashboard/StatDashboard';
import ProductCard from 'components/Cards/ProductCard';
import GetStartedSection from 'components/GetStartedSection/GetStartedSection';
import Button from 'components/Buttons/Button';
import Hotspot from 'components/Hotspot/Hotspot';
import YoutubeEmbed from 'components/YoutubeEmbed/YoutubeEmbed';
import { CircularProgress } from '@mui/material';
import { apiCall } from 'helpers/api-config';
import { goals } from 'helpers/stat-dashboard-goals';
import { COLOR_BLACK, COLOR_LIGHT_ORANGE } from 'constants/Colors';
import ErrorMessageSnackbar from 'helpers/ErrorMessageSnackbar';
import { productBrandingSliceActions } from 'store/product-branding';
import { useBookCreation } from 'hooks/bookCreation';
import { useWebsiteCreation } from 'hooks/websiteCreation';
import styles from './Dashboard.module.scss';
import log from '../../helpers/log';

const productUrl = 'https://www.youtube.com/watch?v=KJwYBJMSbPI';
const websiteUrl = 'https://www.youtube.com/watch?v=N8JD_P2J24g';
const promoteUrl = 'https://www.youtube.com/watch?v=QKQolCv1j28';

function Dashboard() {
  const {
    main,
    main__row1,
    main__row1__container,
    main__row1__video,
    main__title,
    main__statBoard,
    main__getStartText,
    main__row3,
    main__rcProducts,
    main__productCard,
    main__btmBtn,
    main__btmBtnCont,
    main__btmBtnText,
    main__mainBtn,
    main__getStartContainer,
    statdashboard,
    main__loading
  } = styles;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resetBookCreationData } = useBookCreation();
  const { resetWebsiteCreationData } = useWebsiteCreation();
  const firstTime = useSelector((state) => state.dashboardFirstUse.firstTime);
  const showModal = useSelector((state) => state.dashboardFirstUse.showModal);
  const hasCreatedProduct = useSelector((state) => state.productLibrary.hasCreatedProduct);
  const hasCreatedWebsite = useSelector((state) => state.productLibrary.hasCreatedWebsite);

  const [title, setTitle] = useState('How To Build a Product');
  const [embedId, setEmbedId] = useState(productUrl);
  const [recentProducts, setRecentProducts] = useState([]);
  const accessToken = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlanName, setCurrentPlanName] = useState('');
  const [statGoal, setStatGoal] = useState(goals[0]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!hasCreatedProduct) {
      setTitle('How To Build a Product');
      setEmbedId(productUrl);
    } else if (hasCreatedProduct && !hasCreatedWebsite) {
      setTitle('How To Create a Website');
      setEmbedId(websiteUrl);
    } else if (hasCreatedProduct && hasCreatedWebsite) {
      setTitle('How To Promote a Product');
      setEmbedId(promoteUrl);
    } else {
      setTitle('How To Build a Product');
      setEmbedId(productUrl);
    }
  }, [hasCreatedProduct, hasCreatedWebsite]);

  const navigateToProductLibrary = () => {
    navigate('/dashboard/products');
  };

  useEffect(() => {
    resetBookCreationData();
    resetWebsiteCreationData();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall('get', '/book-generator/books', accessToken);
        if (res.status !== 200) throw new Error('Something went wrong.. Please try again');
        setRecentProducts(res.data.results);
        setIsUpdated(false);
        if (res.data.count > 0) {
          setStatGoal(goals[1]);
          const salesPageArray = res.data.results
            .map((book) => book.sale_page)
            .filter((id) => id !== null);
          if (salesPageArray.length > 0) {
            setStatGoal(goals[2]);
            setTitle('How To Promote a Product');
            setEmbedId(promoteUrl);
          }
        }

        const result = await apiCall('get', '/subscriptions/current/', accessToken);
        if (result.status !== 200) throw new Error('Something went wrong.. Please try again');
        const { plan_name } = result.data;
        setCurrentPlanName(plan_name);

        const resCover = await apiCall('get', '/book-generator/pages/?type=cover', accessToken);
        if (resCover.status !== 200) throw new Error('Something went wrong.. Please try again');
        const coversResults = resCover.data.results;
        dispatch(productBrandingSliceActions.setCoversData(coversResults));

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
        setIsUpdated(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    };
    fetchBooks();
  }, [accessToken, navigate, isUpdated]);

  const handleUpdate = (data) => {
    setIsUpdated(data);
  };

  return (
    <div
      className={main}
      style={{
        marginTop: currentPlanName === 'bizzy_free' ? '2.5rem' : '2rem'
      }}>
      <div className={main__row1}>
        <div className={main__row1__container}>
          <p className={main__title}>
            Watch:
            {title}
          </p>
          <div className={main__row1__video}>
            {firstTime && !showModal && (
              <Hotspot
                title="LET’S GET STARTED"
                subTitle="Watch Our Full Tour"
                content="We will show you how to create a product AND have it ready to share or sell in minutes!"
                position="Video"
              />
            )}
            <YoutubeEmbed url={embedId} />
          </div>
        </div>
        <div className={statdashboard}>
          <p className={main__title}>Stat Dashboard</p>
          <div className={main__statBoard}>
            {firstTime && !showModal && (
              <Hotspot
                title="LET’S GET STARTED"
                subTitle="Track Your Stats"
                content="We will tell you your next goal as well as your sales metrics with this dashboard."
                position="StatDashboard"
              />
            )}
            <StatDashboard
              goalTitle={statGoal.title}
              goalPercentage={statGoal.percentage}
              salesGenerated={statGoal.salesGenerated}
              productSold={statGoal.productSold}
              customers={statGoal.customers}
            />
          </div>
        </div>
      </div>
      <p className={main__getStartText}>Get Started</p>
      <div className={main__getStartContainer}>
        <GetStartedSection />
        {firstTime && !showModal && (
          <Hotspot
            title="LET’S GET STARTED"
            subTitle="Build New Products Here!"
            content="All the products you create you have full commercial resale rights!! New templates are added weekly!"
            position="GetStarted"
          />
        )}
      </div>
      <p className={main__rcProducts}>Recent Products</p>
      {isLoading ? (
        <div className={main__loading}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className={main__row3}>
          {recentProducts.length > 5
            ? recentProducts.slice(0, 5).map((item, index) => (
                <div key={index} className={main__productCard}>
                  <ProductCard item={item} callback={handleUpdate} />
                </div>
              ))
            : recentProducts.map((item, index) => (
                <div key={index} className={main__productCard}>
                  <ProductCard item={item} callback={handleUpdate} />
                </div>
              ))}
        </div>
      )}
      {recentProducts.length > 5 && (
        <div className={main__btmBtnCont}>
          <div className={main__btmBtn}>
            <Button
              className={main__mainBtn}
              bgColor={COLOR_LIGHT_ORANGE}
              color={COLOR_BLACK}
              onClick={navigateToProductLibrary}>
              <p className={main__btmBtnText}>Go to My Product Library</p>
            </Button>
          </div>
        </div>
      )}
      <ErrorMessageSnackbar message={errorMessage} severity="error" open={error} />
    </div>
  );
}

export default Dashboard;
