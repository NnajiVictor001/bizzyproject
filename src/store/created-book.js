import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookData: {},
  editBookId: undefined
};

const createdBookSlice = createSlice({
  name: 'createdBook',
  initialState,
  reducers: {
    setCreatedBook(state, action) {
      state.bookData = action.payload;
    },
    setEditBookId(state, action) {
      state.editBookId = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default createdBookSlice;

export const createdBookSliceActions = createdBookSlice.actions;
