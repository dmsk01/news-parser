import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cheerio from 'cheerio';

import { Button } from 'antd';
import { clearNews, searchNews } from 'renderer/store/newsSlice';
import { INews, INewsItem } from 'renderer/types/news';
import { ISettingsState } from 'renderer/store/settingsSlice';
import NewsList from '../components/NewsList/NewsList';

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
const isNewsResponse = (sourceResponse: unknown): sourceResponse is IRss => {
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

function getTextFromHtmlString(text: string) {
  const $ = cheerio.load(text);
  return $('p').text();
}

const Search = () => {
  const dispatch = useDispatch();
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );

  const handleClick = async () => {
    dispatch(clearNews());

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
        .slice(0, 5);
      // .map(async (item) => {
      //   const details = await getRssDetails(item.link).then((data) =>
      //     getTextFromHtmlString(data as string)
      //   );

      //   return { ...item, details };
      // });

      // const detailsRequests: Promise<any>[] = [];
      // const temp = [...news];

      // temp.map((item) => {
      //   return detailsRequests.push(getRssDetails(item.link));
      // });

      // console.log(temp);
      // const details = await Promise.all(detailsRequests);

      dispatch(searchNews({ news }));
    }
  };

  return (
    <>
      <Button
        style={{ background: '#001529', marginBottom: '24px' }}
        onClick={handleClick}
        htmlType="button"
        type="primary"
        className="search-button"
        block
      >
        Search
      </Button>
      <NewsList />
    </>
  );
};

export default Search;
