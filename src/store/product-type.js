import { createSlice } from '@reduxjs/toolkit';

import journal from 'img/Journal1.png';
import planner from 'img/Planner.png';
import workbook from 'img/Workbook1.png';

const initialState = {
  selectedProductType: null,
  productTypes: [
    {
      name: 'Planner',
      description: 'Create your year, month or day calendar, schedule or plan.',
      image: planner
    },
    {
      name: 'Journal',
      description: 'Craft a thought-provoking diary, a place to brainstorm, a journal.',
      image: journal
    },
    {
      name: 'Workbook',
      description: 'Build a guidebook, workbook or resource for your program.',
      image: workbook
    }
  ],
  productPrice: 7.99,
  TPColors: {
    tx_cta_v2_heading_b: '',
    tx_cta_v2_heading_a: '',
    tx_cta_v3_heading_a: '',
    tx_cta_v3_heading_b: '',
    tx_cta_v3_heading_c: '',
    tx_cta_v3_heading_d: '',
    tx_sidebar_subheading: ''
  },
  aboutImage: null,
  newAboutImage: null,
  newAboutImageFile: null,
  bookMediaImage: null
};

const productTypeSlice = createSlice({
  name: 'productType',
  initialState,
  reducers: {
    select(state, action) {
      state.selectedProductType = action.payload;
    },
    changeProductPrice(state, action) {
      state.productPrice = action.payload;
    },
    addNewAboutImage(state, action) {
      state.newAboutImage = action.payload;
    },
    addNewAboutImageFile(state, action) {
      state.newAboutImageFile = action.payload;
    },
    addAboutImage(state, action) {
      state.aboutImage = action.payload;
    },
    changeThankYouColor(state, action) {
      state.TPColors[action.payload.el] = action.payload.color;
    },
    setBookMediaImage(state, action) {
      state.bookMediaImage = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default productTypeSlice;

export const productTypeSliceActions = productTypeSlice.actions;
