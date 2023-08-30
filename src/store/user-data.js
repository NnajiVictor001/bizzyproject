const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  hasStripeAccount: false,
  userHasStripeAccount: false
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setStripeAccount: (state) => {
      state.hasStripeAccount = true;
    },
    setUserStripeAccount: (state) => {
      state.userHasStripeAccount = true;
    }
  }
});

export default userDataSlice;

export const UserDataSliceActions = userDataSlice.actions;
