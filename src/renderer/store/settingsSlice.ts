import { createSlice } from '@reduxjs/toolkit';

export interface ISettingsState {
  sources: string[];
  keywords: string[];
}

const initialState = { sources: [], keywords: [] } as ISettingsState;

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addSource(state, action) {
      state.sources.push(action.payload.source);
    },
    removeSource(state, action) {
      const itemIndex = state.sources.findIndex(
        (src) => src === action.payload.src
      );
      state.sources.splice(itemIndex, 1);
    },
    editSource(state, action) {
      const itemIndex = state.sources.findIndex(
        (src) => src === action.payload.src
      );
      state.sources.splice(itemIndex, 1, action.payload.newSrc);
    },
  },
});

export const { addSource, removeSource, editSource } = settingsSlice.actions;

export default settingsSlice.reducer;
