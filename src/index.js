import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import ClarityAnalytics from 'components/Clarity/ClarityAnalyrics';

import store from 'store/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import reportWebVitals from './reportWebVitals';
import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const supportsTouch = matchMedia('(hover: none)').matches;
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <DndProvider backend={supportsTouch ? TouchBackend : HTML5Backend}>
        <Provider store={store}>
          <ClarityAnalytics />
          <App />
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
