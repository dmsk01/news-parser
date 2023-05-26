import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';
import { clearNews, fetchNews, INewsState } from 'renderer/store/newsSlice';
import { ISettingsState } from 'renderer/store/settingsSlice';
import NewsList from '../components/NewsList/NewsList';

const Search = () => {
  const dispatch = useDispatch();
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );
  const { status, error } = useSelector(
    (state: { news: INewsState }) => state.news
  );

  const handleClick = async () => {
    dispatch(clearNews());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchNews(sources));
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
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured {error}</h2>}
      <NewsList />
    </>
  );
};

export default Search;
