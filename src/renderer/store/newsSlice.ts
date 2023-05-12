import { createSlice } from '@reduxjs/toolkit';
import { INewsItem } from 'renderer/types/news';

export interface INewsState {
  news: INewsItem[];
}

const initialState = { news: [] } as INewsState;

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
