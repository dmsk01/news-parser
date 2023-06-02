import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Row } from 'antd';
import {
  clearNews,
  fetchNews,
  INewsState,
  printNews,
} from 'renderer/store/newsSlice';
import { ISettingsState } from 'renderer/store/settingsSlice';
import { Blob } from 'buffer';
import Export2Word from 'renderer/utils/saveHtmlAsDoc';
import NewsList from '../components/NewsList/NewsList';

const Search = () => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );
  const { status, error } = useSelector(
    (state: { news: INewsState }) => state.news
  );

  const handleSearch = async () => {
    dispatch(clearNews());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchNews(sources));
  };
  const handleClear = async () => {
    dispatch(clearNews());
  };

  const handlePrint = () => {
    const list = ref.current;
    if (!list) return;
    list.querySelectorAll('li').forEach((li) => {
      const input = li.querySelector('input');
      if (input) {
        if (!input?.checked) li.remove();
        input.remove();
      }
    });
    Export2Word('news-list');

    // dispatch(printNews({ str: list.innerText }));
  };

  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Button
          id="search-button"
          style={{ background: '#001529', marginRight: '24px' }}
          onClick={handleSearch}
          htmlType="button"
          type="primary"
        >
          Search
        </Button>
        <Button
          id="print-button"
          style={{ background: '#001529', marginRight: '24px' }}
          onClick={handlePrint}
          htmlType="button"
          type="primary"
        >
          Print digest
        </Button>
        <Button
          id="clear-button"
          style={{ background: '#001529', marginBottom: '24px' }}
          onClick={handleClear}
          htmlType="button"
          type="primary"
        >
          Clear digest
        </Button>
      </Row>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured {error}</h2>}
      <NewsList ref={ref} />
    </>
  );
};

export default Search;
