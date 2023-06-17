import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INews, INewsItem } from 'renderer/types/news';
import { IFeedOption } from './settingsSlice';

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

const getRssFromProxy = (rssSource: string) => {
  return window.electron.ipcRenderer
    .invoke('get-proxy-news', rssSource)
    .catch(console.log);
};

function getRssDetails(src: string) {
  return window.electron.ipcRenderer
    .invoke('get-details', src)
    .catch(console.log);
}

function getRssDetailsFromProxy(src: string) {
  return window.electron.ipcRenderer
    .invoke('get-proxy-details', src)
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

function keyWordCheck(text: string, keywords: string[]) {
  return keywords.some((word) =>
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
  async function (action: IFeedOption, { rejectWithValue }) {
    const { sources, keywords } = action;
    const test: Promise<unknown>[] = [];

    try {
      const requests: Promise<unknown>[] = [];

      sources.forEach((rssSource: string) => {
        requests.push(getRssFromSrc(rssSource));
      });

      ['https://rss.unian.net/site/news_rus.rss'].forEach(
        (rssSource: string) => {
          test.push(getRssFromProxy(rssSource));
        }
      );

      const responses2 = await Promise.all(test)
        .then((response) => response.filter((resp) => isNewsResponse(resp)))
        .catch(console.log);

      console.log(responses2);

      const responses = await Promise.all(requests)
        .then((response) => response.filter((resp) => isNewsResponse(resp)))
        .catch(console.log);

      if (Array.isArray(responses)) {
        const news = responses.reduce((acc: INewsItem[], next) => {
          acc.push(...addSourceTitleToNewsItem(next as INews));
          return acc;
        }, []);

        const fetchNewsDetais = async (newsArr: INewsItem[]) => {
          const updatedData = await Promise.all(
            newsArr.map(async (item) => {
              if (!item.link)
                throw new Error('Link does not exist in news item');
              const response = await getRssDetails(item.link);
              const details = extractDetailsFromHTML(response as string);
              return { ...item, details };
            })
          );

          return updatedData;
        };

        const newsWithDetails = await fetchNewsDetais(news);
        const newsWithKeywordsInDetails = newsWithDetails.filter(
          (item) =>
            keyWordCheck(item.details, keywords) ||
            keyWordCheck(item.title, keywords)
        );

        return newsWithKeywordsInDetails.length > 0
          ? newsWithKeywordsInDetails
          : newsWithDetails;
      }
    } catch (error) {
      console.log('AN ERROR IN NEWS SLICE');
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
