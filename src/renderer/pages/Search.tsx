import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { searchNews } from 'renderer/store/newsSlice';
import NewsList from '../components/NewsList/NewsList';
import { INewsItem } from '../components/NewsItem/NewsItem';

export interface IRss {
  items: INewsItem[];
  title: string;
}

// const keyWords = ['крипта', 'процессор', 'nvidia', 'спектакль'];
const rssSources = [
  'https://tass.ru/rss/v2.xml',
  'https://ria.ru/export/rss2/archive/index.xml',
  'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
];

const getRssFromSrc = (rssSource: string) => {
  return window.electron.ipcRenderer
    .invoke('get-news', rssSource)
    .catch(console.log);
};

const isRssResponse = (sourceResponse: unknown): sourceResponse is IRss => {
  if (!sourceResponse) return false;
  return (
    typeof sourceResponse === 'object' &&
    'items' in sourceResponse &&
    'title' in sourceResponse
  );
};

const Search = () => {
  const [rss, setRss] = useState<IRss[]>([]);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const requests: Promise<unknown>[] = [];
    rssSources.forEach((rssSource) => {
      requests.push(getRssFromSrc(rssSource));
    });
    const news = await Promise.all(requests)
      .then((response) => response.filter((resp) => isRssResponse(resp)))
      .catch(console.log);
    dispatch(searchNews({ news }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // rssSources.forEach(async (rssSource) => {
    //   const result = await getRssFromSrc(rssSource);
    //   if (isRssResponse(result)) {
    //     setRss((prevNews) => [
    //       ...prevNews,
    //       { title: result.title, items: result.items },
    //     ]);
    //   }
    // });
  };
  return (
    <>
      <Link to="/settings" className="settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          version="1.0"
          viewBox="0 0 512 512"
        >
          <path
            fill="#fff"
            d="M199 1.8c-2 1-4.2 3.2-5.2 5.2-1 2.1-3.5 16.6-6.5 37.4l-4.8 33.8-10.7 5.4c-11.3 5.7-18.9 10.2-27.4 16.5l-5.1 3.7-30.9-12.4C91.5 84.6 75.9 78.5 73.9 78c-4.5-1.2-10.5.8-13 4.3-1.8 2.5-49.7 85.3-52.4 90.6-2.2 4.4-1.5 10.4 1.7 13.8 1.3 1.4 14.3 12 29 23.5 25.3 19.9 26.7 21.2 26 23.7-.9 3.4-.9 40.8 0 44.2.7 2.5-.7 3.8-26 23.7-14.7 11.5-27.7 22.1-29 23.4-3 3.3-3.8 8.5-1.9 13 2.3 5.4 51.4 90 53.7 92.5 1.1 1.2 3.8 2.7 5.9 3.4 3.8 1.1 4.8.8 37.7-12.4l33.7-13.5 5.1 3.7c8.2 5.9 17.5 11.5 28.2 16.9l9.9 5 4.8 33.8c3 20.8 5.5 35.3 6.5 37.4 3.5 7.1 2.3 7 62 7 58.4 0 58 0 61.8-5.8 1.3-1.9 3.2-12.9 6.8-37.6l5.1-34.9 12-6.1c11.2-5.7 20.3-11.3 27.8-17l3.2-2.5 31 12.6c17.1 6.9 32.5 12.9 34.3 13.3 4.4 1.1 9.3-.4 12.4-3.7 4.6-5.1 53.9-92 54.5-96 .4-2.9-.1-4.6-1.9-7.3-1.3-1.9-14.5-13-29.3-24.6l-27-21.2.5-6.8c.7-9.7.5-33-.3-38.6l-.7-4.7 26.8-20.9c14.7-11.6 27.7-22.1 29-23.4 3-3.3 3.8-8.5 1.9-13-2.3-5.4-51.4-90-53.7-92.5-1.1-1.2-3.8-2.7-5.9-3.4-3.8-1.1-4.8-.8-37.7 12.4l-33.7 13.5-5.1-3.7c-8.2-5.9-17.5-11.5-28.2-16.9l-9.9-5-4.8-33.8c-3.1-22.1-5.4-35.1-6.6-37.3-.9-1.9-3.2-4.2-5.1-5.3C309.8.1 306.1 0 256 0c-48.9 0-53.8.2-57 1.8zm69 165.7c36.3 3.9 67.9 33.4 75.6 70.4 2 9.7 2 26.5 0 36.2-11.7 56.3-73.2 87.2-125.3 62.9-19.2-8.9-33.1-22.6-42.8-41.9-8.9-17.8-11.3-41.5-6.2-61.2 9.5-36.6 39.9-62.8 77.6-66.8 7.5-.8 10.1-.8 21.1.4z"
          />
        </svg>
      </Link>
      {/* {rss.length &&
        rss.map((rssObj) => {
          return (
            <NewsList
              key={uuidv4()}
              // news={rssObj.items}
              // newsSource={rssObj.title}
            />
          );
        })} */}
      <NewsList />
      <div className="search-block">
        <button onClick={handleClick} type="button" className="search-button">
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
