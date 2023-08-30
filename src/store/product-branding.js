import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addFlag: false,
  systemPalettes: [],
  selectedPallete: {},
  selectedFont: {},
  selectedStyle: {
    id: 0,
    name: 'bold',
    title: 'THICK & BOLD',
    content: 'CAPITALIZED'
  },
  selectedBaseColor: {},
  activeProductKind: {
    id: 0,
    title: 'Branding',
    select: true,
    completed: false
  },
  productsKindData: [
    {
      id: 0,
      title: 'Branding',
      select: true,
      completed: false
    },
    {
      id: 1,
      title: 'Edit The Page',
      select: false,
      completed: false
    },
    {
      id: 2,
      title: 'Add Custom Pages',
      select: false,
      completed: false
    },
    {
      id: 3,
      title: 'Title and Cover',
      select: false,
      completed: false
    },
    {
      id: 4,
      title: 'Mock Up',
      select: false,
      completed: false
    }
  ],
  palleteData: [],
  fontsData: [],
  stylesData: [
    {
      id: 0,
      name: 'bold',
      title: 'THICK & BOLD',
      content: 'CAPITALIZED'
    },
    {
      id: 1,
      name: 'lower',
      title: 'lower case',
      content: 'THIN & AIRY'
    },
    {
      id: 2,
      name: 'normal',
      title: 'Classic Headline',
      content: 'Blended Styles'
    }
  ],
  baseColorsData: [],
  selectedPage: {},
  coversData: [],
  selectedCover: {},
  titleGenerator: '',
  typeValue: '',
  productSubTitle: '',
  mockupsData: [],
  selectedMockup: {},
  productName: '',
  selectedWebsiteColor: '',
  selectedBaseWebsiteColor: '',
  selectedPaletteArr: [],
  defaultPalette: {},
  wordingData: {},
  userPalletData: {}
};

const productBrandingSlice = createSlice({
  name: 'productBranding',
  initialState,
  reducers: {
    addColorsFlag(state, action) {
      state.addFlag = action.payload;
    },
    addPallet(state, action) {
      const { selectedPalleteId, addedColorsArray, colorName } = action.payload;
      state.palleteData = state.palleteData.map((el) => {
        if (selectedPalleteId === el.id)
          return { ...el, name: colorName, mainColors: addedColorsArray };
        return { ...el };
      });
      state.selectedPallete = state.palleteData.filter((el) => selectedPalleteId === el.id)[0];
    },
    selectColorPallete(state, action) {
      state.selectedPallete = action.payload;
    },
    selectFont(state, action) {
      state.selectedFont = action.payload;
    },
    selectStyle(state, action) {
      state.selectedStyle = action.payload;
    },
    selectBaseColor(state, action) {
      state.selectedBaseColor = action.payload;
    },
    toggleProductsKind(state, action) {
      const { id } = action.payload;

      state.productsKindData = state.productsKindData.map((el) => {
        if (id === el.id) return { ...el, select: !el.select };
        return { ...el };
      });
    },
    selectActiveProductKind(state, action) {
      const { id } = action.payload;

      const activeProductAction = [...state.productsKindData].filter((item) => item.id === id);
      state.activeProductKind = activeProductAction[0];
      state.productsKindData = state.productsKindData.map((el) => {
        if (id !== el.id) return { ...el, select: false };
        return { ...el };
      });
    },
    setCompleted(state, action) {
      const { id } = action.payload;

      state.productsKindData = state.productsKindData.map((el) => {
        if (id === el.id) return { ...el, completed: true };
        return { ...el };
      });
    },
    setBaseColorsData(state, action) {
      state.baseColorsData = action.payload;
    },
    setPalleteData(state, action) {
      state.palleteData = action.payload;
    },
    setFontsData(state, action) {
      state.fontsData = action.payload;
    },
    selectPage(state, action) {
      state.selectedPage = action.payload;
    },
    setCoversData(state, action) {
      state.coversData = action.payload;
    },
    selectCover(state, action) {
      state.selectedCover = action.payload;
    },
    setTitleGenerator(state, action) {
      state.titleGenerator = action.payload;
    },
    setTypeValue(state, action) {
      state.typeValue = action.payload;
    },
    setProductSubTitle(state, action) {
      state.productSubTitle = action.payload;
    },
    setMockupsData(state, action) {
      state.mockupsData = action.payload;
    },
    selectMockup(state, action) {
      state.selectedMockup = action.payload;
    },
    selectedPalleteChangeMainColors(state, action) {
      const newColors = action.payload;
      state.selectedPallete.mainColors.map((item, index) => {
        item.value = newColors[index].value;
        return null;
      });
    },
    setProductName(state, action) {
      state.productName = action.payload;
    },
    setSelectedWebsiteColor(state, action) {
      state.selectedWebsiteColor = action.payload;
    },
    setSelectedBaseWebsiteColor(state, action) {
      state.selectedBaseWebsiteColor = action.payload;
    },
    setSelectedPaletteArr(state, action) {
      state.selectedPaletteArr = action.payload;
    },
    setDefaultPalette(state, action) {
      state.defaultPalette = action.payload;
    },
    setWordingData(state, action) {
      state.wordingData = action.payload;
    },
    setUserPalletData(state, action) {
      state.userPalletData = action.payload;
    },
    setSystemPalettes(state, action) {
      state.systemPalettes = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default productBrandingSlice;

export const productBrandingSliceActions = productBrandingSlice.actions;
