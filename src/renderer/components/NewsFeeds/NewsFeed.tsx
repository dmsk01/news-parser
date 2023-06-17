import React from 'react';
import { Divider } from 'antd';
import { IFeeds } from 'renderer/store/settingsSlice';
import NewsSourcesList from '../NewsSourcesList/NewsSourcesList';
import AddRssForm from '../AddRssForm/AddRssForm';
import AddKeywordForm from '../AddKeywordForm/AddKeywordForm';
import NewsKeywordList from '../NewsKeywordList/NewsKeywordList';
import AddSourceForm from '../AddSourceForm/AddSourceForm';

function FeedSources() {
  return (
    <>
      <NewsSourcesList />
      <AddSourceForm />
    </>
  );
}

function FeedKeywords() {
  return (
    <>
      <NewsKeywordList />
      <AddKeywordForm />
    </>
  );
}

function NewsFeed({ feeds }: { feeds: IFeeds }) {
  return Object.keys(feeds).length ? (
    <>
      <Divider />
      <div style={{ marginBottom: '20px' }}>
        <FeedSources />
      </div>
      <Divider />
      <div>
        <FeedKeywords />
      </div>
    </>
  ) : (
    <h4>Feeds not found</h4>
  );
}

export default NewsFeed;
