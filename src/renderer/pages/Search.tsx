import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearNews, searchNews } from 'renderer/store/newsSlice';
import { INews, INewsItem } from 'renderer/types/news';
import NewsItem from 'renderer/components/NewsItem/NewsItem';
import { ISettingsState } from 'renderer/store/settingsSlice';
import AppLayout from 'renderer/components/AppLayout/AppLayout';
import NewsList from '../components/NewsList/NewsList';

// const rssSources = [
//   'https://tass.ru/rss/v2.xml',
//   'https://ria.ru/export/rss2/archive/index.xml',
//   'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
// ];

const getRssFromSrc = (rssSource: string) => {
  return window.electron.ipcRenderer
    .invoke('get-news', rssSource)
    .catch(console.log);
};

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

const Search = () => {
  const dispatch = useDispatch();
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );

  const handleClick = async () => {
    const requests: Promise<unknown>[] = [];
    sources.forEach((rssSource: string) => {
      requests.push(getRssFromSrc(rssSource));
    });
    const responses = await Promise.all(requests)
      .then((response) => response.filter((resp) => isNewsResponse(resp)))
      .catch(console.log);

    if (Array.isArray(responses)) {
      const news = responses.reduce((acc: INewsItem[], next) => {
        acc.push(...addSourceTitleToNewsItem(next as INews));
        return acc;
      }, []);
      dispatch(searchNews({ news }));
    }
  };

  return (
    <>
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
