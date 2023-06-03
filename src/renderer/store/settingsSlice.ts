import { createSlice } from '@reduxjs/toolkit';

export interface ISettingsState {
  sources: string[];
  keywords: string[];
  feeds: string[];
}

const initialState = { sources: [], keywords: [], feeds: [] } as ISettingsState;

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addSource(state, action) {
      if (state.sources.includes(action.payload.source)) {
        throw new Error('Source already exists in the list');
      } else {
        state.sources.push(action.payload.source);
      }
    },
    removeSource(state, action) {
      const itemIndex = state.sources.findIndex(
        (src) => src === action.payload.src
      );
      state.sources.splice(itemIndex, 1);
    },
    addFeed(state, action) {
      console.log(action.payload.feed);
      if (state.feeds.includes(action.payload.feed)) {
        throw new Error('Feed already exists in the list');
      } else {
        state.feeds.push(action.payload.feed);
      }
    },
    removeFeed(state, action) {
      const itemIndex = state.feeds.findIndex(
        (feed) => feed === action.payload.feed
      );
      state.feeds.splice(itemIndex, 1);
    },
    editSource(state, action) {
      const itemIndex = state.sources.findIndex(
        (src) => src === action.payload.src
      );
      state.sources.splice(itemIndex, 1, action.payload.newSrc);
    },
  },
});

export const { addSource, removeSource, editSource, addFeed, removeFeed } =
  settingsSlice.actions;

export default settingsSlice.reducer;
