import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minNumberOfBatches: 1,
  maxNumberOfBatches: 6,
  selectedBatches: [],
  numberOfSelectedBatches: 0,
  batchesData: [],
  selectedTotalPages: [],
  error: ''
};

const productBatchesSlice = createSlice({
  name: 'productBatches',
  initialState,
  reducers: {
    toggleBatches(state, action) {
      const selItem = action.payload;
      if (state.selectedBatches.some((item) => selItem.id === item.id)) {
        const selectedItem = state.selectedBatches.filter((item) => item.id === selItem.id)[0];
        if (
          (!selectedItem.checked && state.numberOfSelectedBatches < state.maxNumberOfBatches) ||
          (selectedItem.checked && state.numberOfSelectedBatches <= state.maxNumberOfBatches)
        ) {
          state.selectedBatches = state.selectedBatches.map((item) =>
            item.id === selItem.id ? { ...item, checked: !item.checked } : item
          );

          if (!selectedItem.checked) {
            state.numberOfSelectedBatches++;
            state.selectedBatches.push({ ...selItem, checked: true });
          } else {
            state.numberOfSelectedBatches--;
            state.selectedBatches = state.selectedBatches.filter((item) => item.id !== selItem.id);
          }
          state.error = '';
        } else {
          state.error = 'The user should pick between 1 to 6 batches';
        }
      } else if (state.numberOfSelectedBatches < state.maxNumberOfBatches) {
        state.selectedBatches.push({ ...selItem, checked: true });
        state.numberOfSelectedBatches++;
        state.error = '';
      } else {
        state.error = 'The user should pick between 1 to 6 batches';
      }
    },
    setSelectPages(state, action) {
      state.selectedTotalPages = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default productBatchesSlice;

export const productBatchesSliceActions = productBatchesSlice.actions;
