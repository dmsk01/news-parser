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
      state.sources.filter((src) => src !== action.payload.src);
    },
  },
});

export const { addSource, removeSource } = settingsSlice.actions;

export default settingsSlice.reducer;
