const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  firstTime: false,
  showModal: true
};

const dashboardFirstUseSlice = createSlice({
  name: 'DashboardFirstUse',
  initialState,
  reducers: {
    flipLayout: (state) => {
      state.firstTime = !state.firstTime;
    },
    hideModal: (state) => {
      state.showModal = false;
    }
  }
});

export default dashboardFirstUseSlice;

export const DashboardFirstUseActions = dashboardFirstUseSlice.actions;
