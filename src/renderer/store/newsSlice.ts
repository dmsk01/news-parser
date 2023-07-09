import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INews, INewsItem } from 'renderer/types/news';
import { v4 as uuidv4 } from 'uuid';
import { Cluster } from 'puppeteer-cluster';
import { IFeedOption, ISource } from './settingsSlice';

export interface INewsState {
  news: INewsItem[];
  status: string | null;
  error: string | null;
}

const initialState = { news: [], status: null, error: null } as INewsState;

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

function getRssDetailsFromProxy({
  src,
  textSelector,
}: {
  src: string;
  textSelector: string;
}) {
  return window.electron.ipcRenderer
    .invoke('get-proxy-details', { src, textSelector })
    .catch(console.log);
}
function getRssDetailsFromProxyCuncurently(newsArr: INewsItem[]): INewsItem[] {
  return window.electron.ipcRenderer
    .invoke('get-proxy-details-cuncurently', newsArr)
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

function addSourceInfoToNewsItem({
  items,
  title,
  titleSelector,
  paragraphSelector,
}: INews) {
  return items.map((newsItem) => {
    return {
      ...newsItem,
      sourceName: title,
      titleSelector,
      paragraphSelector,
      id: uuidv4(),
    };
  });
}

function keyWordCheck(text: string, keywords: string[]) {
  return keywords.some((word) =>
    text.toLowerCase().includes(word.toLowerCase())
  );
}

const extractDetailsFromHTML = (
  html: string,
  titleSelector: string,
  paragraphSelector: string
) => {
  let text = '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll(paragraphSelector).forEach((item) => {
    const itemText = (<HTMLElement>item).innerText;
    text += itemText;
  });
  return text;
};

const fetchNewsDetais = async (newsArr: INewsItem[]) => {
  const start = Date.now();
  const newsWithHtml = await getRssDetailsFromProxyCuncurently(newsArr);
  const timeTaken = Date.now() - start;
  console.log(`Total time taken : ${timeTaken / 1000 / 60} minutes`);
  const newsWithDetailInfo = newsWithHtml.map((item) => {
    if (!item.html || !item.titleSelector || !item.paragraphSelector)
      throw new Error('Link does not exist in news item');
    const detaisFromHtml = extractDetailsFromHTML(
      item.html,
      item.titleSelector,
      item.paragraphSelector
    );
    return { ...item, details: detaisFromHtml };
  });
  return newsWithDetailInfo;

  // const updatedData = await Promise.all(
  //   newsArr.slice(0, 1).map(async (item) => {
  //     if (!item.link || !item.titleSelector || !item.paragraphSelector)
  //       throw new Error('Link does not exist in news item');
  //     // const response = await getRssDetails(item.link);
  //     const response = await getRssDetailsFromProxy({
  //       src: item.link,
  //       textSelector: item.paragraphSelector,
  //     });
  //     const details = extractDetailsFromHTML(
  //       response as string,
  //       item.titleSelector,
  //       item.paragraphSelector
  //     );
  //     return { ...item, details };
  //   })
  // );
  // return updatedData;
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async function (action: IFeedOption, { rejectWithValue }) {
    const { sources, keywords } = action;
    try {
      const requests = await sources.map(
        async ({ url, titleSelector, paragraphSelector }: ISource) => {
          // const rssList = (await getRssFromSrc(url)) as object;
          const rssList = (await getRssFromProxy(url)) as object;
          return { ...rssList, titleSelector, paragraphSelector };
        }
      );

      const responses = await Promise.all(requests)
        .then((response) => response.filter((resp) => isNewsResponse(resp)))
        .catch(console.log);

      if (Array.isArray(responses)) {
        const news = responses.reduce((acc: INewsItem[], next) => {
          acc.push(...addSourceInfoToNewsItem(next as INews));
          return acc;
        }, []);

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
