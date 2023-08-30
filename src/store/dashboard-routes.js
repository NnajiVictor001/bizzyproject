import { createSlice } from '@reduxjs/toolkit';
import dashboardIcon from 'img/dashboard_icon.png';
import productsIcon from 'img/products.png';
import web_logoIcon from 'img/web_logo.png';
import promo_packIcon from 'img/promo_pack.png';
import webbooks_logoIcon from 'img/webbooks_logo.png';
import planners_logoIcon from 'img/planners_logo.png';
import journals_logoIcon from 'img/journals_logo.png';

const initialState = {
  routes: [
    {
      title: 'Dashboard',
      icon: dashboardIcon,
      targetPath: '/dashboard',
      allowedFor: ['Free', 'The Starter', 'Business']
    },
    {
      title: 'Products',
      icon: productsIcon,
      targetPath: '/dashboard/products',
      allowedFor: ['Free', 'The Starter', 'Business'],
      subTitles: [
        {
          title: 'Workbooks',
          icon: webbooks_logoIcon,
          targetPath: '/dashboard/products'
        },
        {
          title: 'Planners',
          icon: planners_logoIcon,
          targetPath: '/dashboard/products'
        },
        {
          title: 'Journals',
          icon: journals_logoIcon,
          targetPath: '/dashboard/products'
        }
      ]
    },
    // Remove the brand kits link from the sidebar
    // {
    //   title: "Brand Kits",
    //   icon: brand_kitIcon,
    //   targetPath: "/dashboard/brand-kits",
    //   allowedFor: ["The Starter", "Business"],
    // },
    {
      title: 'Websites',
      icon: web_logoIcon,
      targetPath: '/dashboard/websites',
      allowedFor: ['Free', 'The Starter', 'Business']
    },
    {
      title: 'Promo Packs',
      icon: promo_packIcon,
      targetPath: '/dashboard/promo-packs',
      allowedFor: ['Free', 'The Starter', 'Business']
    }
  ]
};

const dashboardRoutesSlice = createSlice({
  name: 'dashboardRoutes',
  initialState,
  reducers: {
    reset: () => initialState,
    currentRoutes: (state, action) => {
      state.routes = state.routes.filter((item) => item.allowedFor.includes(action.payload));
    }
  }
});

export default dashboardRoutesSlice;

export const dashboardRoutesActions = dashboardRoutesSlice.actions;
