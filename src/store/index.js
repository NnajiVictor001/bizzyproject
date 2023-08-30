import { configureStore } from '@reduxjs/toolkit';

import brandingStateSlice from './branding-state';
import dashboardRoutesSlice from './dashboard-routes';
import footerLinksSlice from './footer-links';
import pricingPlanSlice from './pricing-plan';
import saleNichesTopicsSlice from './sale-niche-topic';
import productTypeSlice from './product-type';
import productBatchesSlice from './product-batches';
import productBrandingSlice from './product-branding';
import webCreationSlice from './web-creation';
import dashboardFirstUseSlice from './dashboard-first-use';
import productLibrarySlice from './product-library';
import userDataSlice from './user-data';
import statDashboardSlice from './stat-dashboard-goals';
import authSlice from './auth';
import paymentSlice from './payment';
import ingredientPreviewSlice from './ingredient-preview';
import staffPageSlice from './staff-preview';
import createdBookSlice from './created-book';
import productCustomPagesSlice from './product-custom-pages';
import alertSlice from './alert';

const store = configureStore({
  reducer: {
    pricingPlan: pricingPlanSlice.reducer,
    saleNichesTopics: saleNichesTopicsSlice.reducer,
    brandingState: brandingStateSlice.reducer,
    dashboardRoutes: dashboardRoutesSlice.reducer,
    footerLinks: footerLinksSlice.reducer,
    productType: productTypeSlice.reducer,
    productBatches: productBatchesSlice.reducer,
    productBranding: productBrandingSlice.reducer,
    productCustomPages: productCustomPagesSlice.reducer,
    webCreation: webCreationSlice.reducer,
    dashboardFirstUse: dashboardFirstUseSlice.reducer,
    productLibrary: productLibrarySlice.reducer,
    userData: userDataSlice.reducer,
    statDashboard: statDashboardSlice.reducer,
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    payment: paymentSlice.reducer,
    ingredientPreview: ingredientPreviewSlice.reducer,
    staffPage: staffPageSlice.reducer,
    createdBook: createdBookSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
