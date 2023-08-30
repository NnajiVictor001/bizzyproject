const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isOpen: false,
  message: '',
  severity: 'error'
};

const alertSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
    setAlert: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

export default alertSlice;

export const alertSliceActions = alertSlice.actions;
