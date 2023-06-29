import { createSlice } from '@reduxjs/toolkit';

export interface ISource {
  url: string;
  titleSelector: string;
  paragraphSelector: string;
}

export interface IFeedOption {
  sources: ISource[];
  keywords: string[];
}

export interface IFeeds {
  [K: string]: IFeedOption;
}

interface IListProps {
  item: string;
  newValue?: string;
  feed: string;
  title: 'sources' | 'keywords';
}

export interface ISourceListProps {
  item: ISource;
  feed: string;
  newValue?: ISource;
}

export interface ISettingsState {
  feeds: IFeeds;
  currentFeed: string;
}

const initialState = {
  feeds: {
    Default: {
      sources: [],
      keywords: [],
    },
  },
  currentFeed: 'Default',
} as ISettingsState;

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addListItem(state, action) {
      const { item, feed, title }: IListProps = action.payload;

      if (state.feeds[feed][title].includes(action.payload.item)) {
        throw new Error('Item already exists in the list');
      } else {
        state.feeds[feed][title].push(item);
      }
    },

    addSourceItem(state, action) {
      const { item, feed }: ISourceListProps = action.payload;
      if (state.feeds[feed].sources.includes(action.payload.item.url)) {
        throw new Error('Item already exists in the list');
      } else {
        state.feeds[feed].sources.unshift(item);
      }
    },
    editListItem(state, action) {
      const { item, newValue = '', feed, title }: IListProps = action.payload;
      const itemIndex = state.feeds[feed].sources.findIndex((i) => i === item);
      if (itemIndex >= 0)
        state.feeds[feed][title].splice(itemIndex, 1, newValue);
    },
    removeListItem(state, action) {
      const { item, feed, title }: IListProps = action.payload;
      const itemIndex = state.feeds[feed][title].findIndex(
        (key) => key === item
      );
      if (itemIndex >= 0) state.feeds[feed][title].splice(itemIndex, 1);
    },
    addFeed(state, action) {
      const { feed } = action.payload;
      state.feeds = { ...state.feeds, [feed]: { sources: [], keywords: [] } };
    },
    removeFeed(state, action) {
      console.log('remove feed reducer', action.payload);
    },
    setCurrentFeed(state, action) {
      const { currentFeed } = action.payload;
      state.currentFeed = currentFeed;
    },
    loadSettings(state, action) {
      const { jsonSettings } = action.payload;
      state.feeds = jsonSettings;
    },
  },
});

export const {
  addListItem,
  editListItem,
  removeListItem,
  addSourceItem,
  addFeed,
  setCurrentFeed,
  removeFeed,
  loadSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
