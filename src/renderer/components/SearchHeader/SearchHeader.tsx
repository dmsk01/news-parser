import React, { useRef } from 'react';
import { Button, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { INewsState, clearNews, fetchNews } from 'renderer/store/newsSlice';
import { ISettingsState } from 'renderer/store/settingsSlice';
import Export2Word from 'renderer/utils/saveHtmlAsDoc';
import NewsList from '../NewsList/NewsList';

function SearchHeader() {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  const currentFeed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );
  const { sources, keywords } = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds[currentFeed]
  );

  const { status, error } = useSelector(
    (state: { news: INewsState }) => state.news
  );

  const handleSearch = async () => {
    dispatch(clearNews());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchNews({ sources, keywords }));
  };

  const handleClear = async () => {
    dispatch(clearNews());
  };

  const handlePrint = () => {
    const list = ref.current;
    if (!list) return;
    list.querySelectorAll('.list-item').forEach((el) => {
      const input = el.querySelector('input');
      if (input) {
        input.remove();
        if (!input?.checked) el.remove();
      }
    });
    Export2Word('news-list');
  };

  return (
    <>
      <Row align="middle" style={{ margin: '0 10px' }}>
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
          style={{ background: '#001529' }}
          onClick={handleClear}
          htmlType="button"
          type="primary"
        >
          Clear digest
        </Button>
      </Row>
      <NewsList ref={ref} />
    </>
  );
}

export default SearchHeader;
