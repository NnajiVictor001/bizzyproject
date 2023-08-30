import { createSlice } from '@reduxjs/toolkit';
import leftImg1 from 'img/web-left.png';

const initialState = {
  webCreationData: [
    {
      id: 0,
      title: 'Website',
      select: true,
      isDark: false,
      completed: false
    },
    {
      id: 1,
      title: 'Order Form',
      select: false,
      isDark: false,
      completed: false
    },
    {
      id: 2,
      title: 'Thank You & Delivery Page',
      select: false,
      isDark: false
    },
    {
      id: 3,
      title: 'Publish and Promote',
      select: false,
      isDark: true,
      completed: false
    }
  ],
  sideImg: leftImg1,
  activeWebCreation: {
    id: 0,
    title: 'Website',
    select: true,
    completed: false
  },
  data: {},
  subDomain: '',
  salesType: 'sales',
  thankYouType: 'basic',
  downloadUrl: '',
  hasSalesPage: false,
  hasSalesPageId: null,
  hasSalesPageData: {},
  customerData: '',
  isStripeConnected: false,
  refreshPhrasesCountByInput: {},
  universalWordings: [],
  wording: {},
  problemWordings: [],
  solutionWordings: [],
  shortSolutionWordings: [],
  batchWordings: [],
  problemWordingsLength: 0
};

const webCreationSlice = createSlice({
  name: 'webCreation',
  initialState,
  reducers: {
    toggleWebCreation(state, action) {
      const { id } = action.payload;

      state.webCreationData = state.webCreationData.map((el) => {
        if (id === el.id) return { ...el, select: !el.select };
        if (id !== el.id) return { ...el, select: false };
        return { ...el };
      });
    },
    setSideImg(state, action) {
      state.sideImg = action.payload;
    },
    selectActiveWebCreation(state, action) {
      const { id } = action.payload;

      const temp = [...state.webCreationData].filter((item) => item.id === id);
      state.activeWebCreation = temp[0];
    },
    setCompleted(state, action) {
      const { id } = action.payload;

      state.webCreationData = state.webCreationData.map((el) => {
        if (id === el.id) return { ...el, completed: true };
        return { ...el };
      });
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setSubDomain(state, action) {
      state.subDomain = action.payload;
    },
    setSalesType(state, action) {
      state.salesType = action.payload;
    },
    setDownloadUrl(state, action) {
      state.downloadUrl = action.payload;
    },
    setHasSalesPage(state) {
      state.hasSalesPage = true;
    },
    setHasSalesPageId(state, action) {
      state.hasSalesPageId = action.payload;
    },
    setHasSalesPageData(state, action) {
      state.hasSalesPageData = action.payload;
    },
    setThankYouType(state, action) {
      state.thankYouType = action.payload;
    },
    setCustomerData(state, action) {
      state.customerData = action.payload;
    },
    setRefreshCounter(state, action) {
      state.refreshPhrasesCountByInput = {
        ...state.refreshPhrasesCountByInput,
        ...action.payload
      };
    },
    setIsStripeConnected(state, action) {
      state.isStripeConnected = action.payload;
    },
    setUniversalWordings(state, action) {
      state.universalWordings = action.payload;
    },
    setWording(state, action) {
      state.wording = action.payload;
    },
    setProblemWordings(state, action) {
      state.problemWordings = action.payload;
    },
    setSolutionWordings(state, action) {
      state.solutionWordings = action.payload;
    },
    setShortSolutionWordings(state, action) {
      state.shortSolutionWordings = action.payload;
    },
    setProblemWordingsLength(state, action) {
      state.problemWordingsLength = action.payload;
    },
    setBatchWordings(state, action) {
      state.batchWordings = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default webCreationSlice;

export const webCreationSliceActions = webCreationSlice.actions;
