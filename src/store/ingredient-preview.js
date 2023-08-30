import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeKind: {
    id: 0,
    title: 'Branding',
    select: true,
    completed: false
  },
  kindData: [
    {
      id: 0,
      title: 'Branding',
      select: true,
      completed: false
    },
    {
      id: 1,
      title: 'Ingredient Form',
      select: false,
      completed: false
    }
  ],
  selectedIngredient: {},
  ingredientHtml: ''
};

const ingredientPreviewSlice = createSlice({
  name: 'ingredientPreview',
  initialState,
  reducers: {
    setSelectIngredient(state, action) {
      state.selectedIngredient = action.payload;
    },
    setIngredientHtml(state, action) {
      state.ingredientHtml = action.payload;
    },
    toggleKind(state, action) {
      const { id } = action.payload;

      state.kindData = state.kindData.map((el) => {
        if (id === el.id) return { ...el, select: !el.select };
        return { ...el };
      });
    },
    selectActiveKind(state, action) {
      const { id } = action.payload;

      const activeKindAction = [...state.kindData].filter((item) => item.id === id);
      state.activeKind = activeKindAction[0];
      state.kindData = state.kindData.map((el) => {
        if (id !== el.id) return { ...el, select: false };
        return { ...el };
      });
    }
  }
});

export default ingredientPreviewSlice;

export const ingredientPreviewSliceActions = ingredientPreviewSlice.actions;
