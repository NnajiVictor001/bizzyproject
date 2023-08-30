import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  image_preview: '',
  text__blurp_nolimit_a2: '',
  text__headline_a1: '',
  text__headline_a3: '',
  active: true,
  color__headline_a1: '#000000',
  color__headline_a3: '#000000',
  addPhoto: false,
  addLogo: false,
  customPageId: undefined,
  pages: [],
  aboutMeCheckbox: false
};

const productCustomPagesSlice = createSlice({
  name: 'productCustomPages',
  initialState,
  reducers: {
    setCustomPagesData(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    setCustomPageId(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    setAboutMeCheckbox(state, action) {
      state.aboutMeCheckbox = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default productCustomPagesSlice;

export const productCustomPagesSliceActions = productCustomPagesSlice.actions;
