import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DashboardLayout from 'components/Layouts/DashboardLayout';
// import BrandKits from "pages/dashboard/BrandKits";
import ClientList from 'pages/dashboard/ClientList';
import Dashboard from 'pages/dashboard/Dashboard';
import Help from 'pages/dashboard/Help';
import Products from 'pages/dashboard/Products';
import PromoPacks from 'pages/dashboard/PromoPacks';
import YourList from 'pages/dashboard/YourList';
import StartSales from 'pages/sales/StartSales';
import SalesNicheTopic from 'pages/sales/SalesNicheTopic';
import AccountSettings from 'pages/dashboard/AccountSettings';
import ProductType from 'pages/dashboard/ProductType';
import CreateYourProduct from 'pages/dashboard/CreateYourProduct';
import ProductPart2 from 'pages/dashboard/ProductPart2';
import NotFound from 'components/NotFound/NotFound';
import WebsiteCreationPre from 'pages/dashboard/WebsiteCreationPre';
import PromoPacksSidebar from 'pages/dashboard/PromoPacksSidebar';
import StripeConnect from 'components/WebsiteCreation/StripeConnect';
import BugReport from 'pages/dashboard/BugReport';
import Referral from 'pages/dashboard/Referral';

function DashboardRoutes() {
  return (
    <DashboardLayout>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<Products />} />
          {/* <Route path="/dashboard/brand-kits" element={<BrandKits />} /> */}
          <Route path="/dashboard/websites" element={<Products website />} />
          <Route path="/dashboard/promo-packs/:bookId" element={<PromoPacks />} />
          <Route path="/dashboard/promo-packs" element={<PromoPacksSidebar />} />
          <Route path="/dashboard/client-list" element={<ClientList />} />
          <Route path="/dashboard/help" element={<Help />} />
          <Route path="/dashboard/your-list" element={<YourList />} />
          <Route path="/dashboard/start-sales" element={<StartSales />} />
          <Route path="/dashboard/sales-niche-topic" element={<SalesNicheTopic />} />
          <Route path="/dashboard/account-settings" element={<AccountSettings />} />
          <Route path="/dashboard/website-creation/:bookId" element={<WebsiteCreationPre />} />

          <Route path="/stripe-connect" element={<StripeConnect />} />
          <Route path="/dashboard/product-type" element={<ProductType />} />
          <Route path="/dashboard/create-product" element={<CreateYourProduct />} />
          <Route path="/dashboard/product-part2/:id" element={<ProductPart2 />} />
          <Route path="/dashboard/bug-report" element={<BugReport />} />
          <Route path="/dashboard/referral" element={<Referral />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
}

export default DashboardRoutes;
