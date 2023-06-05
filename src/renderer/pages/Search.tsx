import React from 'react';
import { useSelector } from 'react-redux';

import { INewsState } from 'renderer/store/newsSlice';

const Search = () => {
  const { status, error } = useSelector(
    (state: { news: INewsState }) => state.news
  );

  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured {error}</h2>}

      <div id="news-list-portal" />
    </>
  );
};

export default Search;
