import { createSlice } from '@reduxjs/toolkit';

interface IFeedOption {
  sources: string[];
  keywords: string[];
}

export interface IFeeds {
  [K: string]: IFeedOption;
}

interface IListProps {
  item: string;
  newValue?: string | undefined;
  feed: string;
  title: 'sources' | 'keywords';
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
    addSource(state, action) {
      const { source, feed } = action.payload;
      if (state.feeds[feed].sources.includes(action.payload.source)) {
        throw new Error('Source already exists in the list');
      } else {
        state.feeds[feed].sources.push(source);
      }
    },
    addItem(state, action) {
      const { item, feed, title }: IListProps = action.payload;
      if (state.feeds[feed][title].includes(action.payload.item)) {
        throw new Error('Item already exists in the list');
      } else {
        state.feeds[feed][title].push(item);
      }
    },
    editListItem(state, action) {
      const { item, newValue = '', feed, title }: IListProps = action.payload;
      const itemIndex = state.feeds[feed].sources.findIndex((i) => i === item);
      if (itemIndex >= 0)
        state.feeds[feed][title].splice(itemIndex, 1, newValue);
    },
    removeItem(state, action) {
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
      // const itemIndex = state.feeds.findIndex(
      //   (feed) => feed === action.payload.feed
      // );
      // state.feeds.splice(itemIndex, 1);
    },
    addKeyword(state, action) {
      const { keyword, feed } = action.payload;
      if (state.feeds[feed].keywords.includes(action.payload.keyword)) {
        throw new Error('Source already exists in the list');
      } else {
        state.feeds[feed].keywords.push(keyword);
      }
    },
    setCurrentFeed(state, action) {
      const { currentFeed } = action.payload;
      state.currentFeed = currentFeed;
    },
  },
});

export const {
  addSource,
  editListItem,
  addItem,
  addFeed,
  addKeyword,
  removeItem,
  setCurrentFeed,
  removeFeed,
} = settingsSlice.actions;

export default settingsSlice.reducer;
