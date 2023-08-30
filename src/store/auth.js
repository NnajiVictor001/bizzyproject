// import jwt from "jwt-decode";
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  entityId: 0,
  token: '',
  refreshToken: '',
  accessTokenExpireDate: '',
  isLoggedIn: false,
  publicKey: ''
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setEntity: (state, action) => {
      state.entityId = action.payload.entity.id;
      localStorage.setItem('entityId', action.payload.entity.id);
    },
    login: (state, action) => {
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isLoggedIn = true;
      //   const { exp } = jwt(action.payload.access);
      //   state.accessTokenExpireDate = new Date(exp * 1000);

      localStorage.setItem('token', action.payload.access);
      localStorage.setItem('refresh', action.payload.refresh);
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
      localStorage.setItem('publicKey', action.payload);
    },
    logout: (state) => {
      state.token = '';
      state.refreshToken = '';
      state.isLoggedIn = false;

      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('pk');
      localStorage.removeItem('entityId');
    }
  }
});

export default authSlice;

export const authSliceActions = authSlice.actions;
