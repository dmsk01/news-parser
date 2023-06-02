import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INews, INewsItem } from 'renderer/types/news';

export interface INewsState {
  news: INewsItem[];
  status: string | null;
  error: string | null;
}

const getRssFromSrc = (rssSource: string) => {
  return window.electron.ipcRenderer
    .invoke('get-news', rssSource)
    .catch(console.log);
};

function getRssDetails(src: string) {
  return window.electron.ipcRenderer
    .invoke('get-details', src)
    .catch(console.log);
}

const invokePrintNews = async (html: HTMLElement) => {
  return window.electron.ipcRenderer.sendMessage('print-news', [html]);
};

const isNewsResponse = (sourceResponse: unknown): sourceResponse is INews => {
  if (!sourceResponse) return false;
  return (
    typeof sourceResponse === 'object' &&
    'items' in sourceResponse &&
    'title' in sourceResponse
  );
};

function addSourceTitleToNewsItem({ items, title }: INews) {
  return items.map((newsItem) => {
    return { ...newsItem, sourceName: title };
  });
}

const keyWords: string[] = [
  'Футбол',
  'Турция',
  'Выборы',
  'Эрдоган',
  'Спорт',
  'США',
  'Год',
];

function keyWordCheck(text: string) {
  return keyWords.some((word) =>
    text.toLowerCase().includes(word.toLowerCase())
  );
}

const extractDetailsFromHTML = (html: string) => {
  let text = '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('p').forEach((item) => {
    text += item.innerText;
  });
  return text;
};

const initialState = { news: [], status: null, error: null } as INewsState;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async function (sources: string[], { rejectWithValue }) {
    try {
      const requests: Promise<unknown>[] = [];

      sources.forEach((rssSource: string) => {
        requests.push(getRssFromSrc(rssSource));
      });

      const responses = await Promise.all(requests)
        .then((response) => response.filter((resp) => isNewsResponse(resp)))
        .catch(console.log);

      if (Array.isArray(responses)) {
        const news = responses
          .reduce((acc: INewsItem[], next) => {
            acc.push(...addSourceTitleToNewsItem(next as INews));
            return acc;
          }, [])
          .slice(0, 30);

        const fetchNewsDetais = async () => {
          const updatedData = await Promise.all(
            news.map(async (item) => {
              if (!item.link)
                throw new Error('Link does not exist in news item');
              const response = await getRssDetails(item.link);
              const details = extractDetailsFromHTML(response as string);
              return { ...item, details };
            })
          );

          return updatedData;
        };

        const newsWithDetails = await fetchNewsDetais();
        const newsWithKeywords = newsWithDetails.filter((item) =>
          keyWordCheck(item.details)
        );
        return newsWithKeywords;
      }
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
    printNews(state, action) {
      invokePrintNews(action.payload.str);
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

export const { searchNews, clearNews, printNews } = newsSlice.actions;

export default newsSlice.reducer;
