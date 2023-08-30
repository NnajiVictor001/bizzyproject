import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

const initialState = {
  createdBookId: null,
  hasCreatedProduct: true,
  hasCreatedWebsite: true,
  productsData: []
};

const productLibrarySlice = createSlice({
  name: 'productLibrary',
  initialState,
  reducers: {
    setAllProducts(state, action) {
      state.productsData = action.payload;
    },
    duplicate(state, action) {
      const { id } = action.payload;
      const itemToDuplicate = state.productsData.find((item) => item.id === id);
      const indexOfItemToDuplicate = state.productsData.findIndex((item) => item.id === id);
      const duplicatedItem = JSON.parse(JSON.stringify(itemToDuplicate));
      duplicatedItem.id = uuid();
      state.productsData = [
        ...state.productsData.slice(0, indexOfItemToDuplicate),
        duplicatedItem,
        ...state.productsData.slice(indexOfItemToDuplicate)
      ];
    },
    delete(state, action) {
      const { id } = action.payload;
      state.productsData = state.productsData.filter((item) => item.id !== id);
    },
    rename(state, action) {
      const { id, newName } = action.payload;
      state.productsData = state.productsData.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      );
    },
    createdProduct(state) {
      state.hasCreatedProduct = true;
    },
    setBookId(state, action) {
      state.createdBookId = action.payload.id;
    }
  }
});

export default productLibrarySlice;

export const ProductLibrarySliceActions = productLibrarySlice.actions;
