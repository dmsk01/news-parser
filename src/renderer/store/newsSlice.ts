import { createSlice } from '@reduxjs/toolkit';

export interface appState {
  news: string[];
}

const initialState = { news: [] } as appState;

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    searchNews(state, action) {
      state.news = [...state.news, ...action.payload.news];
    },
    clearNews(state) {
      state.news = [];
    },
  },
});

export const { searchNews, clearNews } = newsSlice.actions;

export default newsSlice.reducer;
