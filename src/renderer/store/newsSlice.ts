import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INewsItem } from 'renderer/types/news';

export interface INewsState {
  news: INewsItem[];
  status: string | null;
  error: string | null;
}

const initialState = { news: [], status: null, error: null } as INewsState;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async function (sources, { rejectWithValue }) {
    console.log(sources);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
      );
      if (!response.ok) {
        throw new Error('Something went wrong, can not to fetch data.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchNews.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.news = action.payload;
    },
  },
});

export const { searchNews, clearNews } = newsSlice.actions;

export default newsSlice.reducer;
