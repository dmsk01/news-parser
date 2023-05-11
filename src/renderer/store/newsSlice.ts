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
  },
});

export const { searchNews } = newsSlice.actions;

export default newsSlice.reducer;
