import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeKind: {
    id: 0,
    title: 'Page Builder',
    select: true,
    completed: false
  },
  kindData: [
    {
      id: 0,
      title: 'Page Builder',
      select: true,
      completed: false
    }
  ],
  selectedStaffPage: {},
  errorMessage: '',
  isExit: false,
  defaultGlobalVars: {}
};

const staffPageSlice = createSlice({
  name: 'staffPage',
  initialState,
  reducers: {
    setSelectStaffPage(state, action) {
      state.selectedStaffPage = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
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
    },
    setIsExit(state, action) {
      state.isExit = action.payload;
    },
    setDefaultGlobalVars(state, action) {
      state.defaultGlobalVars = action.payload;
    }
  }
});

export default staffPageSlice;

export const staffPageSliceActions = staffPageSlice.actions;
