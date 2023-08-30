const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  publicKey: '',
  secretKey: '',
  paymentIntent: '',
  salesPagePublicKey: '',
  salesPageStripeAccount: ''
};

const paymentSlice = createSlice({
  name: 'Payment',
  initialState,
  reducers: {
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
      localStorage.setItem('pk', action.payload);
    },
    setSecretKey: (state, action) => {
      state.secretKey = action.payload;
    },
    setPaymentIntent: (state, action) => {
      state.paymentIntent = action.payload;
    },
    setSalesPagePublicKey: (state, action) => {
      state.salesPagePublicKey = action.payload;
    },
    setSalesPageStripeAccount: (state, action) => {
      state.salesPageStripeAccount = action.payload;
    }
  }
});

export default paymentSlice;

export const paymentSliceActions = paymentSlice.actions;
